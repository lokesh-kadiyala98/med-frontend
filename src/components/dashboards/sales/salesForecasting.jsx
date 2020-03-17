import React, { Component } from 'react';
import HoltWinters from './holtWinters';

class SalesForecast extends Component {
    state = {  }

    async componentDidMount() {
        const {data} = await axios({
            method: 'get',
            url: "http://localhost:5000/medicines/get_unique_medicines",
        })
                
        var symptomsObj = []
        data.forEach((item) => {
            var obj = { name: item }
            symptomsObj.push(obj)
        })
        this.setState({symptoms: symptomsObj})
    }

    render() { 
        return ( 
            <h1>Salesforecast</h1>
        );
    }
}
 
export default SalesForecast;