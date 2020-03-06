import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class KYHArchieves extends Component {
    state = { 
        kyh_archieves: [], 
        userID : ''
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.userID !== this.props.userID) {
            this.setState({userID: this.props.userID});
            try {
                var res = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/users/get_user_kyh_data',
                    data: {userID: this.props.userID}
                })
                this.setState({ kyh_archieves: res.data.items })
            } catch(ex) {
                console.log(ex)
                if(ex.response.status === 400 && ex.response.data) {
                    toast.error(ex.response.data.error)
                }
            }
        }
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
            <div className="dropdown float-left">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    Archieves
                </button>
                <div className="dropdown-menu" x-placement="bottom-start" style={{position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(0px, 38px, 0px)'}}>
                    {this.state.kyh_archieves.map((item, index) => 
                        <Link key={index} className="dropdown-item" to="#">{this.objectIDToTimestamp(item._id)} <br/><b>Score: {item.score}</b></Link>
                    )}
                </div>
            </div>
        );
    }
}
 
export default KYHArchieves;