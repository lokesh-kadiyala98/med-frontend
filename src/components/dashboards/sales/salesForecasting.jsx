import React, { Component } from 'react';

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
            </React.Fragment>
        );
    }
}
 
export default SalesForecast;