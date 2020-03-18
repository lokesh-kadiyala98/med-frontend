import React, { Component } from 'react';
import axios from 'axios'

import config from '../../../config.json'
import MedicinesInput from './medicineInput'
import ForecastGraphs from './forecastGraphs'

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
                <MedicinesInput onClick={this.handleSubmit} />
                <ForecastGraphs medicineName={this.state.data.medicineName} />
            </React.Fragment>
        );
    }
}
 
export default SalesForecast;