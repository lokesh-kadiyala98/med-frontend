import React, { Component } from 'react';
import axios from 'axios';

class SymptomsInput extends Component {
    state = { 
        symptoms: []
    }

    async componentDidMount() {
        const {data} = await axios({
            method: 'get',
            url: "http://localhost:5000/get_unique_symptoms",
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
            <div className="input-group mb-3">
                <input className="form-control" type="text" ref="symptom" placeholder="Enter Symptoms..." />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onClick(this.refs.symptom.value)} type="button">Diagnose</button>
                </div>
            </div>
        );
    }
}
 
export default SymptomsInput;