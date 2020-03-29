import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import ReactModal from 'react-modal'

import LinkBox from '../misc/linkBox'
import Login from './../misc/login'

class Dashboards extends Component {
    state = {
        showModal: false
    }

    componentDidMount() {
        try {
            const adminToken = localStorage.getItem('admin-token')
            const { admin } = jwtDecode(adminToken)
            this.setState({ admin })
        } catch(ex) { }
    }

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
                {this.state.admin ?
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <NavLink to="/dashboards/salesForecast" >
                            <LinkBox 
                                body="Sales Dashboard" 
                                fntClr='rgb(60, 28, 74)' 
                                bgClr='rgb(155, 89, 182)' 
                                icon={<i className="fas fa-chart-line"></i>} 
                                topIcon={<i className="fas fa-unlock"></i>} 
                            />
                        </NavLink>
                    </div> :
                    <div className="col-sm-6 col-md-4 col-lg-3" onClick={() => {this.setState({ showModal:true })}}>
                        <LinkBox 
                            body="Sales Dashboard" 
                            fntClr='rgb(60, 28, 74)' 
                            bgClr='rgb(155, 89, 182)' 
                            icon={<i className="fas fa-chart-line"></i>} 
                            topIcon={<i className="fas fa-lock"></i>} 
                        />
                    </div>
                }
                <ReactModal id="user-report"
                    ariaHideApp={false}
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example">
                    <button className="close" onClick={() => {this.setState({ showModal:false })}}><i className="fas fa-times"></i></button>
                    <div className="center"><Login apiRoute='/users/admin_login' /></div>
                </ReactModal>
            </section>
        );
    }
}
 
export default Dashboards;