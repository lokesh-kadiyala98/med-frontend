import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render() { 
        const { user } = this.props
        return ( 
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboards">Dashboards</Link>
                            </li>
                            {
                                !user && 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            }
                            {
                                user &&
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">{user.name}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">Logout</Link>
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