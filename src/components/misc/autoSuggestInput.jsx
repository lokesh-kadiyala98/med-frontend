import React, { Component } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import _ from 'lodash'

import config from '../../config.json'
import AutoSuggestWrapper from './autoSuggestWrapper';

class AutoSuggestInput extends Component {
    state = { 
        items: [],
        value: '',
        errors: {}
    }

    async componentDidMount() {
        try {
            const {data} = await axios({
                method: 'get',
                url: config.apiEndpoint + this.props.url,
            })
            var items = []
            data.forEach((item) => {
                var obj = { name: item }
                items.push(obj)
            })
            this.setState({ items })
        } catch(ex) {
            if(!ex.response.status)
                toast.error('Opps!! Network issues')
            else if(ex.response.status === 401 && ex.response.data)
                toast.error(ex.response.data.error)
        }
    }

    onChange = (value) => {
        this.setState({ value })
    }

    onClick = () => {
        var errors = {...this.state.errors}
        const {items, value} = this.state
        if(items.some(elem => elem.name === value)) {
            delete errors.message
            this.props.onClick(value)
        } else {
            errors.message = _.startCase(_.toLower(value)) + ' doesn\'t exist in our directory.'
        }
        this.setState({errors})
    }

    render() { 
        const { items, errors } = this.state;
        return (  
            <React.Fragment>
                <div className="input-group mb-3">
                     
                    <AutoSuggestWrapper items={items} placeholder={this.props.placeholder} onChange={this.onChange} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={this.onClick} type="button">Submit</button>
                    </div>
                </div>
                {errors.message && <div className="alert alert-warning">{errors.message}</div>}
            </React.Fragment>
        );
    }
}
 
export default AutoSuggestInput;