import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios'

import config from '../../../config.json'
import HoltWinters from './holtWinters';
import Loading from '../../misc/loading';

class ForecastGraphs extends Component {
    state = { 
        medicineNames: [],
        loading: true,
        lineData: {
            labels: [],
            datasets: []
        },
        predictionLength: 4,
        errors: {}
    }

    async componentDidUpdate(prevProps) {
        const { medicineName } = this.props
        
        if(prevProps.medicineName !== medicineName) {
            var medicineNames = [...this.state.medicineNames]
            medicineNames.push(medicineName)
            this.setState({ medicineNames, loading: true })
            
            const { data } = await axios.get(config.apiEndpoint + '/pharma/get_timeseries_data', {
                params: {
                    medicineName: medicineName
                }
            })

            var dataset = []
            const months = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "June", "07": "July", "08": "Aug", "09": "Sept", "10": "Oct", "11": "Nov", "12": "Dec"}
            const colors = [{faded: 'rgba(253, 121, 168, 0.2)', unfaded: 'rgba(253, 121, 168, 1.0)'},{faded: 'rgba(253, 203, 110, 0.2)', unfaded: 'rgba(253, 203, 110, 1.0)'},{faded: 'rgba(9, 132, 227, 0.2)', unfaded: 'rgba(9, 132, 227, 1.0)'},{faded: 'rgba(108, 92, 231, 0.2)', unfaded: 'rgba(108, 92, 231, 1.0)'}]
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
            
            const holtWintersResult = HoltWinters(dataset, this.state.predictionLength)
            var temp = {
                label: medicineName,
                fill: false,
                lineTension: 0.1,
                backgroundColor: colors[this.state.medicineNames.length - 1].faded,
                borderColor: colors[this.state.medicineNames.length - 1].unfaded,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                pointBorderColor: colors[this.state.medicineNames.length - 1].unfaded,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: colors[this.state.medicineNames.length - 1].unfaded,
                pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: holtWintersResult.augumentedDataset
            }
            lineData.datasets.push(temp)
            
            this.setState({ lineData, loading: false })
        }
    }

    handleRemoveMedicine = (index) => {
        var medicineNames = [...this.state.medicineNames]
        var lineData = {...this.state.lineData}
        medicineNames.splice(index, 1)
        lineData.datasets.splice(index, 1)
        this.setState({ lineData, medicineNames })
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
        const { lineData, medicineNames, loading } = this.state

        if(loading)
            return <Loading />

        return ( 
            <React.Fragment>
                <Line data={lineData} />
                <div className="mt-5 capsules">
                    {medicineNames.map((item, index) => 
                        <li className="delete" key={index} onClick={() => this.handleRemoveMedicine(index)}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </li>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
 
export default ForecastGraphs;