import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import AutoSuggestWrapper from '../../misc/autoSuggestWrapper'
import config from '../../../config.json'

class MedicinesInput extends Component {
    state = { 
        //holds all distinct medicines in {name: medicine} format
        medicines: [],
        //holds current input form value
        value: '',
    }

    async componentDidMount() {
        try {
            const {data} = await axios({
                method: 'get',
                url: config.apiEndpoint + "/pharma/get_unique_medicines",
            })
            var medicines = []
            data.forEach((item) => {
                var obj = { name: item }
                medicines.push(obj)
            })
            this.setState({ medicines })
        } catch(ex) {
            if(ex.response.status === 400 && ex.response.text)
                toast.error(ex.response.text)
            else if(!ex.status)
                toast.error('Opps!! Network issues')
        }
    }

    onChange = (value) => {
        this.setState({ value })
    }

    render() { 
        const { medicines } = this.state;
        return (  
            <div className="input-group mb-3">
                <ToastContainer autoClose={5000}/>
                <AutoSuggestWrapper items={medicines} placeholder='Enter Medicine...' onChange={this.onChange} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onClick(this.state.value)} type="button">Forecast</button>
                </div>
            </div>
        );
    }
}
 
export default MedicinesInput;