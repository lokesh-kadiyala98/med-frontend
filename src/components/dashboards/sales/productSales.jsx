import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import ForecastGraphs from './forecastGraphs'
import AutoSuggestInput from '../../misc/autoSuggestInput'

class ProductSales extends Component {
    state = { 
        data: {
            medicineName: '',
        }
    }

    handleSubmit = (value) => {
        var data = {...this.state.data}
        data.medicineName = value

        this.setState({ data })
    }

    render() { 
        return ( 
            <React.Fragment>
                <Link onClick={() => this.props.history.push('/dashboards/salesForecast')} className="btn--action mb-3">
                    <span><i className="fas fa-arrow-left"></i></span>
                </Link>
                <AutoSuggestInput onClick={this.handleSubmit} url='/pharma/get_unique_medicines' placeholder='Enter Product...' />
                <ForecastGraphs toForecast={this.state.data.medicineName} url='/pharma/get_medicine_timeseries_data' />
            </React.Fragment>
        );
    }
}
 
export default ProductSales;