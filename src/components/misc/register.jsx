import React from 'react';
import Joi from 'joi-browser';
import axios from 'axios';

import Form from './form/form';

class Register extends Form {

    constructor(props) {
        super(props)
    
        this.baseState = this.state
    }

    state = { 
        data: {
            username: '',
            password: '',
            name: '',
            gender: '',
            dob: '',
            weight: '',
            height: '',

        },
        errors: {}
    }

    schema = {
        username: Joi.string().min(5).max(30).required().label('Username'),
        password: Joi.string().min(4).max(15).label('Password'),
        name: Joi.string().label('Name'),
        gender: Joi.string().label('Gender'),
        dob: Joi.date().label('Date of Birth'),
        weight: Joi.number().label('Weight'),
        height: Joi.number().min(1).max(7).label('Height')
    }

    doSubmit = async () => {

        try {
            var res = await axios({
                method: 'post',
                url: 'http://localhost:5000/users/user_register',
                data: this.state.data
            })
            localStorage.setItem('token', res.data.token)
            window.location = '/'
        } catch (ex) {
            if(ex.response.status === 400 && ex.response.data) {
                const errors = {...this.state.errors}
                errors.username = ex.response.data.error
                this.setState({ errors })
            }
        }
    }

    render() {
        const genderOptions = [
            [{_id: 'male', name: 'Male'}],
            [{_id: 'female', name: 'Female'}],
            [{_id: 'others', name: 'Others'}],
        ] 
        return ( 
            <div className="col-xs-12 col-sm-12 col-md-6 mb-3">
                <p className="lead">Register</p>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name', 'Name')}
                {this.renderSelect('gender', 'Gender', genderOptions)}    
                {this.renderInput('dob', 'Date of Birth', 'date')}
                {this.renderInput('weight', 'Weight (KGs)', 'number')}
                {this.renderInput('height', 'Height (feet.inch)', 'number')}              
                {this.renderButton('Register')}
            </div>
        );
    }
}
 
export default Register;