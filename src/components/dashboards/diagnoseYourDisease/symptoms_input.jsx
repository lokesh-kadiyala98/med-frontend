import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import AutoSuggestWrapper from '../../misc/autoSuggestWrapper'
import config from '../../../config.json'

class SymptomsInput extends Component {
    state = { 
        symptoms: [],
        value: '',
        errors: {}
    }

    async componentDidMount() {
        try {
            const {data} = await axios({
                method: 'get',
                url: config.apiEndpoint + "/disease_symptoms/get_unique_symptoms",
            })
            var symptoms = []
            data.forEach((item) => {
                var obj = { name: item }
                symptoms.push(obj)
            })
            this.setState({ symptoms })
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
        const {symptoms, value} = this.state
        if(symptoms.some(elem => elem.name === value)) {
            delete errors.message
            this.props.onClick(value)
        } else {
            errors.message = _.startCase(_.toLower(value)) + ' doesn\'t exist in our directory.'
        }
        this.setState({errors})
    }

    render() { 
        const { symptoms, errors } = this.state;
        return (  
            <React.Fragment>
                <div className="input-group mb-3">
                    <AutoSuggestWrapper items={symptoms} placeholder='Enter Symptom...' onChange={this.onChange} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={this.onClick} type="button">Diagnose</button>
                    </div>
                </div>
                {errors.message && <div className="alert alert-warning">{errors.message}</div>}
            </React.Fragment>
        );
    }
}
 
export default SymptomsInput;