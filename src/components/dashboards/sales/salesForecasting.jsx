import React, { Component } from 'react';
import LinkBar from '../../misc/linkBar';

class SalesForecast extends Component {
    state = { 
        data: {
            medicineName: '',
        }
    }

    handleSubmit = (value) => {
        var data = {...this.state.data}
        data.medicineName = value

        this.setState({ data })
    }

    render() { 
        return ( 
            <React.Fragment>
                <LinkBar to='/dashboards/salesForecast/products' backgroundColor='rgba(255, 165, 2, 0.2)' color='rgba(255, 165, 2, 1.0)' header='Product Sales' />
                <LinkBar to='/dashboards/salesForecast/brands' backgroundColor='rgba(255, 107, 129, 0.2)' color='rgba(255, 107, 129, 1.0)' header='Brand Sales' />
            </React.Fragment>
        );
    }
}
 
export default SalesForecast;