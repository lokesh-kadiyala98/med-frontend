import React, { Component } from 'react';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import _ from 'lodash'

import AutoSuggestWrapper from '../../misc/autoSuggestWrapper'
import config from '../../../config.json'

class MedicinesInput extends Component {
    state = { 
        //holds all distinct medicines in {name: medicine} format
        medicineNames: [],
        //holds current input form value
        value: '',
        //holds errors if value is not present in medicines
        errors: {}
    }

    async componentDidMount() {
        try {
            const {data} = await axios({
                method: 'get',
                url: config.apiEndpoint + "/pharma/get_unique_medicines",
            })
            var medicineNames = []
            data.forEach((item) => {
                var obj = { name: item }
                medicineNames.push(obj)
            })
            this.setState({ medicineNames })
        } catch(ex) {
            if(!ex.status)
                toast.error('Opps!! Network issues')
            else if(ex.response.status === 400 && ex.response.text)
                toast.error(ex.response.text)
        }
    }

    onChange = (value) => {
        this.setState({ value })
    }

    onClick = () => {
        var errors = {...this.state.errors}
        const {medicineNames, value} = this.state
        if(medicineNames.some(elem => elem.name === value)) {
            delete errors.message
            this.props.onClick(value)
        } else {
            errors.message = _.startCase(_.toLower(value)) + ' doesn\'t exist in our directory.'
        }
        this.setState({errors})
    }

    render() { 
        const { medicineNames, errors } = this.state;
        return (  
            <React.Fragment>
                <div className="input-group mb-3">
                    <ToastContainer autoClose={5000} />
                    <AutoSuggestWrapper items={medicineNames} placeholder='Enter Medicine...' onChange={this.onChange} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={this.onClick} type="button">Forecast</button>
                    </div>
                </div>
                {errors.message && <div className="alert alert-warning">{errors.message}</div>}
            </React.Fragment>
        );
    }
}
 
export default MedicinesInput;