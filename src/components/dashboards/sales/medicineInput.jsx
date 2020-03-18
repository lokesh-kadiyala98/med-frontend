import React, { Component } from 'react';
import axios from 'axios';

import AutoSuggestWrapper from '../../misc/autoSuggestWrapper'
import config from '../../../config.json'

class MedicinesInput extends Component {
    state = { 
        //holds all distinct medicines in {name: medicine} format
        medicines: [],
        //
        value: '',
    }

    async componentDidMount() {
        const {data} = await axios({
            method: 'get',
            url: config.apiEndpoint + "/pharma/get_unique_medicines",
        })
                
        var medicines = []
        data.forEach((item) => {
            var obj = { name: item }
            medicines.push(obj)
        })
        this.setState({medicines})
    }

    onChange = (value) => {
        this.setState({ value })
    }

    render() { 
        const { medicines } = this.state;
        return (  
            <div className="input-group mb-3">
                <AutoSuggestWrapper items={medicines} onChange={this.onChange} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onClick(this.state.value)} type="button">Forecast</button>
                </div>
            </div>
        );
    }
}
 
export default MedicinesInput;