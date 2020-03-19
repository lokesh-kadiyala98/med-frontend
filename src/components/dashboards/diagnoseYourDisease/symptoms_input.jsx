import React, { Component } from 'react';
import axios from 'axios';

import AutoSuggestWrapper from '../../misc/autoSuggestWrapper'
import config from '../../../config.json'

class SymptomsInput extends Component {
    state = { 
        symptoms: [],
        value: '',
    }

    async componentDidMount() {
        const {data} = await axios({
            method: 'get',
            url: config.apiEndpoint + "/disease_symptoms/get_unique_symptoms",
        })
                
        var symptomsObj = []
        data.forEach((item) => {
            var obj = { name: item }
            symptomsObj.push(obj)
        })
        this.setState({symptoms: symptomsObj})
    }

    onChange = (value) => {
        this.setState({ value })
    }

    render() { 
        const { symptoms } = this.state;
        return (  
            <div className="input-group mb-3">
                <AutoSuggestWrapper items={symptoms} placeholder='Enter Symptom...' onChange={this.onChange} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onClick(this.state.value)} type="button">Diagnose</button>
                </div>
            </div>
        );
    }
}
 
export default SymptomsInput;