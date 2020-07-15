import React from 'react';
import Joi from 'joi-browser';
import axios from 'axios';
import { toast } from 'react-toastify';

import Form from './form/form';
import config from '../../config.json'

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
            var { data } = await axios({
                method: 'post',
                url: config.apiEndpoint + this.props.apiRoute,
                data: this.state.data
            })

            if (this.props.apiRoute === '/user/login') {
                localStorage.setItem('user-token', data.token)
                window.location = '/'
            } else {
                localStorage.setItem('admin-token', data.token)
                this.props.closeModal()
            }
        } catch (ex) {
            if (!ex.response) {
                toast.error('Unkown Error: Reported to developer')
            } else if (ex.response.status && ex.response.data) {
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