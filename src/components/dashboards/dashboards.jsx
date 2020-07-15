import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify';

import LinkBox from '../misc/linkBox'
import Login from './../misc/login'

class Dashboards extends Component {
    state = {
        showModal: false
    }

    componentDidMount() {
        try {
            const adminToken = localStorage.getItem('admin-token')
            this.setState({ adminToken })
        } catch(ex) { }
    }

    componentDidUpdate(prevProps, prevState) {
        try {
            const adminToken = localStorage.getItem('admin-token')
            this.setState({ adminToken })
        } catch(ex) { }
    }

    closeModal = () => {
        this.setState({ showModal: false })
        toast.success('Logged in as Admin')
    }

    render() { 
        const { adminToken } = this.state

        return ( 
            <section className="row">
                <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <NavLink to="/dashboards/knowYourHeart" >
                        <LinkBox 
                            body="Know Your Heart" 
                            fntClr='rgb(152, 14, 0)' 
                            bgClr='rgb(255, 73, 54)' 
                            icon={<i className='fas fa-heartbeat'></i>} 
                        />
                    </NavLink>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <NavLink to="/dashboards/diagnoseYourDisease" >
                        <LinkBox 
                            body="Diagnose Disease" 
                            fntClr='rgb(18, 96, 51)' 
                            bgClr='rgb(46, 204, 113)' 
                            icon={<i className="fas fa-notes-medical"></i>} 
                        />
                    </NavLink>
                </div>
                {adminToken ?
                    <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                        <NavLink to="/dashboards/salesForecast" >
                            <LinkBox 
                                body="Sales Dashboard" 
                                fntClr='rgb(60, 28, 74)' 
                                bgClr='rgb(155, 89, 182)' 
                                icon={<i className="fas fa-chart-line"></i>} 
                                topIcon={<i className="fas fa-unlock"></i>} 
                            />
                        </NavLink>
                    </div> 
                    :
                    <div className="col-sm-6 col-md-4 col-lg-3 mt-3" onClick={() => {this.setState({ showModal:true })}}>
                        <LinkBox 
                            body="Sales Dashboard" 
                            fntClr='rgb(60, 28, 74)' 
                            bgClr='rgb(155, 89, 182)' 
                            icon={<i className="fas fa-chart-line"></i>} 
                            topIcon={<i className="fas fa-lock"></i>} 
                        />
                    </div>
                }
                <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <NavLink to="/dashboards/corona/india" >
                        <LinkBox 
                            body="Corona Statistics" 
                            fntClr='rgba(12, 36, 97, 1.0)' 
                            bgClr='rgba(74, 105, 189, 1.0)' 
                            icon={<i className="fas fa-virus"></i>}
                        />
                    </NavLink>
                </div>
                <ReactModal id="user-report"
                    ariaHideApp={false}
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example">
                    <button className="close" onClick={() => {this.setState({ showModal:false })}}><i className="fas fa-times"></i></button>
                    <div className="center"><Login apiRoute='/admin/login' closeModal={this.closeModal} /></div>
                </ReactModal>
            </section>
        );
    }
}
 
export default Dashboards;