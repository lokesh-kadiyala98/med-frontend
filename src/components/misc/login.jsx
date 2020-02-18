import React from 'react';
import Form from './form/form';
import Joi from 'joi-browser';

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
        username: Joi.string().label('Username').min(3).max(15),
        password: Joi.string().label('Password').min(3).max(15)
    }

    doSubmit = async () => {
        console.log('Login Submitted')
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