import React, { Component } from 'react';
import axios from 'axios'

import HoltWinters from './holtWinters'

class SalesForecast extends Component {
    state = { 
        medicines: []
    }

    async componentDidMount() {
        const {data} = await axios({
            method: 'get',
            url: "http://localhost:5000/pharma/get_unique_medicines",
        })
                
        var medicinesObj = []
        data.forEach((item) => {
            var obj = { name: item }
            medicinesObj.push(obj)
        })
        this.setState({medicines: medicinesObj})
    }

    render() { 
        return ( 
            <h1>Salesforecast</h1>
        );
    }
}
 
export default SalesForecast;