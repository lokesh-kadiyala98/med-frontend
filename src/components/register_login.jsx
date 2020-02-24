import React, { Component } from 'react';
import Register from './misc/register';
import Login from './misc/login';

class RegisterLogin extends Component {
    state = {
    
    }

    render() { 
        return ( 
            <section className="container">
                <div className="row">
                    <Register history={this.props.history} />
                    <Login history={this.props.history} />
                </div>
            </section>
        );
    }
}
 
export default RegisterLogin;