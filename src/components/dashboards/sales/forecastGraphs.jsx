import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios'

import config from '../../../config.json'
import HoltWinters from './holtWinters';

class ForecastGraphs extends Component {
    state = { 
        medicineNames: [],
        showGraph: false,
        lineData: {
            labels: [],
            datasets: []
        }
    }

    async componentDidUpdate(prevProps) {
        if(prevProps.medicineName !== this.props.medicineName) {
            var medicineNames = [...this.state.medicineNames]
            medicineNames.push(this.props.medicineName)
            this.setState({ medicineNames })
            
            const { data } = await axios.get(config.apiEndpoint + '/pharma/get_timeseries_data', {
                params: {
                    medicineName: this.props.medicineName
                }
            })
            var dataset = []
            var predictionLength = 4
            var months = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "June", "07": "July", "08": "Aug", "09": "Sept", "10": "Oct", "11": "Nov", "12": "Dec"}
            var lineData = {...this.state.lineData}
            lineData.labels = []
            data.forEach((item, key) => {
                lineData.labels.push(months[item.month] + '-' + item.year.substr(2, 4))
                dataset[key] = item.count
            })

            lineData.labels.push("Jan-18")
            lineData.labels.push("Feb-18")
            lineData.labels.push("Mar-18")
            lineData.labels.push("Apr-18")
            
            const holtWintersResult = HoltWinters(dataset, predictionLength)
            var temp = {
                label: this.props.medicineName,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
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
                data: holtWintersResult.augumentedDataset
            }
            lineData.datasets.push(temp)
            
            this.setState({ lineData, showGraph: true })
        }
    }
    
    render() { 
        // const data = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [
        //       {
        //         label: 'My First dataset',
        //         fill: false,
        //         lineTension: 0.1,
        //         borderColor: 'rgba(75,192,192,1)',
        //         borderCapStyle: 'butt',
        //         borderDash: [],
        //         borderDashOffset: 0.0,
        //         borderJoinStyle: 'miter',
        //         pointBorderColor: 'rgba(75,192,192,1)',
        //         pointBackgroundColor: '#fff',
        //         pointBorderWidth: 1,
        //         pointHoverRadius: 5,
        //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        //         pointHoverBorderColor: 'rgba(220,220,220,1)',
        //         pointHoverBorderWidth: 2,
        //         pointRadius: 1,
        //         pointHitRadius: 100,
        //         data: [65, 59, 80, 81, 56, 55, 40]
        //       }
        //     ]
        // }
        const { showGraph, lineData } = this.state
        return ( 
            <React.Fragment>
                {showGraph && <Line data={lineData} />}
            </React.Fragment>
        );
    }
}
 
export default ForecastGraphs;