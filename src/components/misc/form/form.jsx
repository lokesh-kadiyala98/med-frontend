import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import TextArea from './textArea';
import Select from './select';
import Radio from './radio';
import CheckBox from './checkbox';

class Form extends Component {
    state = { 
        data: {},
        errors: {},
    };

    //Validates an individual property. Called when a change occurs in input fields.
    handleChange = e => {
        const errors = {...this.state.errors};
        //currentTarget holds the field being changed
        const errorMessages = this.validateProperty(e.currentTarget);

        //currentTarget.name is the name given to input field that is being changed
        if(errorMessages) errors[e.currentTarget.name] = errorMessages;
        else delete errors[e.currentTarget.name];

        const data = {...this.state.data};
        const name = e.currentTarget.name
        if(!e.currentTarget.checked) {
            data[e.currentTarget.name].splice(data[e.currentTarget.name].indexOf(e.currentTarget.value), 1)
        }
        if(e.currentTarget.type === 'checkbox' && e.currentTarget.checked)
            data[e.currentTarget.name].push(e.currentTarget.value)
        if(e.currentTarget.type !== 'checkbox')
            data[e.currentTarget.name] = e.currentTarget.value;
        
        //for every key pressed in input field, call setState to update the state object.
        this.setState({ data, errors }, () => {
            if(name === 'weight' || name === 'height') {
                if(this.state.data.weight && this.state.data.height) {
                    data['bmi'] = this.getBmi(this.state.data.weight, this.state.data.height)
                    this.setState({ data })
                }
            }
        });

    };
    
    //called by handleChange method to validate individual fields
    validateProperty = input => {
        const obj = { [input.name]: input.value };
        const schema = { [input.name]: this.schema[input.name] };
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    //called by handleSubmit method 
    validate = () => {
        //Joi.validate returns an object that has error details
        var results = Joi.validate(this.state.data, this.schema, { abortEarly: false });

        if(!results.error) return null;

        const errors = {}; 
        for (let item of results.error.details)
            errors[item.path[0]] = item.message;

        return errors;
    };

    //called when the form is submitted
    handleSubmit = e => {
        e.preventDefault();

        var errors = this.validate();

        if(this.state.data.diet.length === 0)
            errors = {...errors, diet: "'Diet' must not be empty"}
        
        //if there are errors then set the state with errors. 
        //Else set it with an empty object.
        this.setState({ errors: errors || {} });

        if (errors) return;
    
        this.doSubmit();
    };

    renderInput(name, label, type='text', disabled=false) {
        const { data, errors } = this.state;
        return (
            <Input 
                type={type}
                name={name}
                disabled={disabled}
                value={data[name]}
                onChange={this.handleChange}
                label={label}
                error={errors[name]} 
            />
        )
    };

    renderSelect(name, label, options) {
        const { data, errors } = this.state;
        return (
            <Select 
                name={name}
                value={data[name]}
                onChange={this.handleChange}
                options={options}
                label={label}   
                error={errors[name]} 
            />
        )
    };

    renderTextArea(name, label) {
        const { data , errors } = this.state;
        return (
            <TextArea
                name={name}
                value={data[name]}
                onChange={this.handleChange}
                label={label}
                error={errors[name]}
            />
        )
    }

    renderButton(label) {
        return (
            <button disabled={this.validate()} onClick={(e) => this.handleSubmit(e)} type="submit" className="btn btn-outline-secondary mb-3 float-right">
                {label}
            </button>
        );
    };

    renderRadio(name, label, options) {
        const { data, errors } = this.state
        return (
            <Radio
                name={name}
                value={data[name]}
                onChange={this.handleChange}
                options={options}
                label={label}   
                error={errors[name]}
            />
        )
    }

    renderCheckbox(name, label, options) {
        const { data, errors } = this.state
        return (
            <CheckBox
                name={name}
                value={data[name]}
                onChange={this.handleChange}
                options={options}
                label={label}   
                error={errors[name]}
            />
        )
    }
}
 
export default Form;