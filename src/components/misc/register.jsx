import React from 'react';
import Form from './form/form';
import Joi from 'joi-browser';

class Register extends Form {

    constructor(props) {
        super(props)
    
        this.baseState = this.state
    }

    state = { 
        data: {
            regUsername: '',
            regPassword: '',
            age: '',
            weight: '',
            height: '',

        },
        errors: {}
    }

    schema = {
        regUsername: Joi.string().alphanum().min(5).max(15).required().label('Username'),
        regPassword: Joi.string().label('Password'),
        age: Joi.number().min(5).max(99).label('Age'),
        weight: Joi.number().label('Weight'),
        height: Joi.number().min(1).max(7).label('Height')
    }

    doSubmit = async () => {
        console.log('Register Submitted')
    }

    render() { 
        return ( 
            <div className="col-xs-12 col-sm-12 col-md-6 mb-3">
                <p className="lead">Register</p>
                {this.renderInput('regUsername', 'Username')}
                {this.renderInput('regPassword', 'Password', 'password')}  
                {this.renderInput('age', 'Age', 'number')}
                {this.renderInput('weight', 'Weight (KGs)', 'number')}
                {this.renderInput('height', 'Height (feet.inch)', 'number')}              
                {this.renderButton('Register')}
            </div>
        );
    }
}
 
export default Register;