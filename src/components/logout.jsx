import { Component } from 'react';
import { toast } from 'react-toastify';

import config from '../config.json'
import authService from '../services/authService'

class Logout extends Component {
    state = {  }

    async componentDidMount() {
        try {
            const data = await authService.get(config.apiEndpoint + '/user/logout')
            
            if (data) {
                localStorage.removeItem('user-token')
                window.location = '/'
            }
        } catch (e) {
            toast.error('Unable to logout')
        }
    }

    render() { 
        return null
    }
}
 
export default Logout;