import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LinkBox from '../misc/linkBox';

class Dashboards extends Component {
    state = {  }
    render() { 
        return ( 
            <section className="row">
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <NavLink to="/dashboards/knowYourHeart" >
                        <LinkBox 
                            body="Know Your Heart" 
                            fntClr='rgb(152, 14, 0)' 
                            bgClr='rgb(255, 73, 54)' 
                            icon={<i className='fas fa-heartbeat'></i>} 
                        />
                    </NavLink>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <NavLink to="/dashboards/diagnoseYourDisease" >
                        <LinkBox 
                            body="Diagnose Your Disease" 
                            fntClr='rgb(18, 96, 51)' 
                            bgClr='rgb(46, 204, 113)' 
                            icon={<i className="fas fa-notes-medical"></i>} 
                        />
                    </NavLink>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <NavLink to="/dashboards/salesForecast" >
                        <LinkBox 
                            body="Sales Dashboard" 
                            fntClr='rgb(60, 28, 74)' 
                            bgClr='rgb(155, 89, 182)' 
                            icon={<i className="fas fa-chart-line"></i>} 
                        />
                    </NavLink>
                </div>
            </section>
        );
    }
}
 
export default Dashboards;