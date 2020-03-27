import React, { Component } from 'react';

import ForecastGraphs from './forecastGraphs'
import AutoSuggestInput from '../../misc/autoSuggestInput';

class BrandSales extends Component {
    state = { 
        data: {
            brandName: '',
        }
    }

    handleSubmit = (value) => {
        var data = {...this.state.data}
        data.brandName = value

        this.setState({ data })
    }

    render() { 
        return ( 
            <React.Fragment>
                <div onClick={() => this.props.history.push('/dashboards/salesForecast')} className="btn--action mb-3">
                    <span><i className="fas fa-arrow-left"></i></span>
                </div>
                <AutoSuggestInput onClick={this.handleSubmit} url='/pharma/get_unique_brands' placeholder='Enter Brand...' />
                <ForecastGraphs toForecast={this.state.data.brandName} url='/pharma/get_brand_timeseries_data' />
            </React.Fragment>
        );
    }
}

export default BrandSales;