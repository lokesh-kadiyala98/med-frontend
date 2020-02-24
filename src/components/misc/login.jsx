import React from 'react';
import Form from './form/form';
import Joi from 'joi-browser';
import axios from 'axios';

class Login extends Form {

    constructor(props) {
        super(props)
    
        this.baseState = this.state
    }

    state = { 
        data: {
            username: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string().label('Username').min(3).max(30).required(),
        password: Joi.string().label('Password').min(4).max(15).required()
    }

    doSubmit = async () => {

        try {
            var res = await axios({
                method: 'post',
                url: 'http://localhost:5000/users/user_login',
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
        return ( 
            <div className="col-xs-12 col-sm-12 col-md-6 border rounded">
                <p className="lead">Login</p>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}                
                {this.renderButton('Login')}
            </div>
        );
    }
}
 
export default Login;