import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios'

import config from '../../../config.json'

class ForecastGraphs extends Component {
    state = { 
        medicineName: '',
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.medicineName != this.props.medicineName) {
            this.setState({ medicineName: this.props.medicineName })
            
            const { data } = await axios.get(config.apiEndpoint + '/pharma/get_timeseries_data', {
                params: {
                    medicineName: this.props.medicineName
                }
            })
            console.log(data)
        }
    }

    componentDidMount() {
        const { medicineName } = this.props
        this.setState({ medicineName })
    }
    
    render() { 
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
          };
        return ( 
            <React.Fragment>
            {this.state.medicineName && <Line data={data} />}
            </React.Fragment>
        );
    }
}
 
export default ForecastGraphs;