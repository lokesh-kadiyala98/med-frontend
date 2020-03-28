import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SalesForecast extends Component {
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
                <Link to="/dashboards/salesForecast/products" style={{ textDecoration: 'none' }}>
                    <div className='p-4 mb-3 forecast-options' style={{backgroundColor: 'rgba(255, 165, 2, 0.2)', color: 'rgba(255, 165, 2, 1.0)'}}>
                        <h4>Product Sales</h4>
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </Link>
                
                <Link to="/dashboards/salesForecast/brands" style={{ textDecoration: 'none' }}>
                    <div className='p-4 mb-3 forecast-options' style={{backgroundColor: 'rgba(255, 107, 129, 0.2)', color: 'rgba(255, 107, 129, 1.0)'}}>
                        <h4>Brand Sales</h4>
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </Link>
            </React.Fragment>
        );
    }
}
 
export default SalesForecast;