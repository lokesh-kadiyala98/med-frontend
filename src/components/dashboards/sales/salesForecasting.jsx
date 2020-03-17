import React, { Component } from 'react';
import HoltWinters from './holtWinters';

class SalesForecast extends Component {
    state = {  }
    render() { 
        HoltWinters()
        return ( 
            <h1>Salesforecast</h1>
        );
    }
}
 
export default SalesForecast;