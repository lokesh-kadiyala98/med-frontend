import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import KnowYourHeartClassifier from './knowYourHeartClassifer';
import config from '../../config.json'

class KYHArchieves extends Component {
    state = { 
        kyh_archieves: [], 
        userID: '',
        data: {},
        viewReport: false
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.userID !== this.props.userID) {
            this.setState({userID: this.props.userID});
            try {
                var res = await axios({
                    method: 'post',
                    url:  config.apiEndpoint + '/kyh/get_user_kyh_data',
                    data: {userID: this.props.userID}
                })
                this.setState({ kyh_archieves: res.data.items })
            } catch(ex) {
                if(ex.response.status === 400 && ex.response.data) {
                    toast.error(ex.response.data.error)
                }
            }
        }
    }

    handleCloseReport = () => {
        this.setState({ viewReport: false })
    }

    setCurrentKYH = (data) => {
        this.setState({ data, viewReport: true })
    }

    objectIDToTimestamp(_id) {
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const timestamp = _id.toString().substring(0,8)
        const date = new Date( parseInt( timestamp, 16 ) * 1000 )
        return weekday[date.getDay()] + ' ' + month[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear()
    }

    render() { 
        return (
            this.state.kyh_archieves.length > 0 ? 
                <div className="dropdown float-left">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Archieves
                    </button>
                    <div className="dropdown-menu" x-placement="bottom-start" style={{position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(0px, 38px, 0px)'}}>
                        {this.state.kyh_archieves.map((item, index) => 
                            <Link onClick={() => this.setCurrentKYH(item)} key={index} className="dropdown-item" to="#">{this.objectIDToTimestamp(item._id)} <br/><b>Score: {item.score}</b></Link>
                        )}
                    </div>
                    {this.state.viewReport ? <KnowYourHeartClassifier data={this.state.data} user={null} handleCloseReport={this.handleCloseReport} /> : null}
                </div> 
                : null
        );
    }
}
 
export default KYHArchieves;