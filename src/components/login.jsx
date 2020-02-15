import React, { Component } from 'react';

class Login extends Component {
    state = {  }
    render() { 
        return ( 
            <section className="container">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">@</span>
                        </div>
                        <input className="form-control" type="text" placeholder="Username" />
                    </div>
            </section>
        );
    }
}
 
export default Login;