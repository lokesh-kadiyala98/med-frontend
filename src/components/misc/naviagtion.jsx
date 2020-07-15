import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import authService from '../../services/authService'
import config from '../../config.json'

class NavBar extends Component {

    state = {}

    async componentDidUpdate(prevProps) {
        if (this.props.userToken && this.props.userToken !== prevProps.userToken) {
            try {
                const { data } = await authService.get(config.apiEndpoint + '/user/profile')

                this.setState({ user: data })
            } catch (e) {
                
            }
        }
    }

    render() { 
        const { user } = this.state

        return ( 
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
                <div className="container">
                    <Link className="navbar-brand" style={{fontFamily: 'Krona One'}} to="/">
                        MED
                        <img src={require('../resources/img/med-logo.png')} style={{width: '50px', height: '50px'}} alt='med logo' />
                    </Link>
                    <button className="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink exact className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboards">Dashboards</NavLink>
                            </li>
                            {
                                !user && 
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            }
                            {
                                user &&
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/profile">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                    </li>
                                </React.Fragment>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
         );
    }
}
 
export default NavBar;