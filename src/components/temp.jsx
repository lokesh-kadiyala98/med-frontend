import React, { Component } from 'react';

import { Line } from 'react-chartjs-2'
import HoltWinters from './dashboards/sales/holtWinters';

class Temp extends Component {
    state = { 
        dataset: [638, 415, 312, 385, 220, 210, 326, 391, 364, 427, 634, 743, 684, 380, 367, 348, 186, 311, 350, 370, 375, 450, 650, 700, 610, 478, 318, 418, 260, 370, 374, 372, 400, 560, 690, 720],
        nullArray: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        data: {
            labels: ['Jan 14', 'Feb 14', 'Mar 14', 'Apr 14', 'May 14', 'June 14', 'July 14', 'Aug 14', 'Sep 14', 'Oct 14', 'Nov 14', 'Dec 14', 'Jan 15', 'Feb 15', 'Mar 15', 'Apr 15', 'May 15', 'June 15', 'July 15', 'Aug 15', 'Sep 15', 'Oct 15', 'Nov 15', 'Dec 15', 'Jan 16', 'Feb 16', 'Mar 16', 'Apr 16', 'May 16', 'June 16', 'July 16', 'Aug 16', 'Sep 16', 'Oct 16', 'Nov 16', 'Dec 16', 'Jan 17', 'Feb 17', 'Mar 17', 'Apr 17', 'May 17'],
            datasets: [
                {
                    label: 'Dataset',
                    borderColor: 'rgba(253, 121, 168, 1)',
                    fill: false,
                    lineTension: 0,
                    pointBorderColor: 'rgba(253, 121, 168, 1)',
                    pointBackgroundColor: 'rgba(253, 121, 168, 1)',
                    pointRadius: 2,
                    data: []
                }, {
                    label: 'Simple Average',
                    borderColor: '#2ecc71',
                    fill: false,
                    lineTension: 0,
                    pointBorderColor: '#2ecc71',
                    pointBackgroundColor: '#2ecc71',
                    pointRadius: 2,
                    data: []
                }, {
                    label: 'Moving Average',
                    borderColor: '#2980b9',
                    fill: false,
                    lineTension: 0,
                    pointBorderColor: '#2980b9',
                    pointBackgroundColor: '#2980b9',
                    pointRadius: 2,
                    data: []
                }, {
                    label: 'Weighted Average',
                    borderColor: '#8e44ad',
                    fill: false,
                    lineTension: 0,
                    pointBorderColor: '#8e44ad',
                    pointBackgroundColor: '#8e44ad',
                    pointRadius: 2,
                    data: []
                }, {
                    label: 'Pegels',
                    borderColor: '#f1c40f',
                    fill: false,
                    lineTension: 0,
                    pointBorderColor: '#f1c40f',
                    pointBackgroundColor: '#f1c40f',
                    pointRadius: 2,
                    data: []
                }
            ]
        }
    }

    componentDidMount() {
        var data = {...this.state.data}
        var dataset = [...this.state.dataset]

        var pegelsResults = HoltWinters(this.state.dataset, 5).augumentedDataset.splice(36, 5)
        
        for (let index = 0; index < pegelsResults.length; index++)
            pegelsResults[index] = parseFloat(pegelsResults[index].toFixed(3))

        data.datasets[0].data = [...this.state.dataset, 570, 365, 296, 343, 196]
        data.datasets[1].data = [...this.state.nullArray, 720, ...this.simpleAverage(dataset)]
        data.datasets[2].data = [...this.state.nullArray, 720, ...this.simpleAverage(dataset.splice(24, 12))]
        data.datasets[3].data = [...this.state.nullArray, 720, 597.893, 393.976, 571.455, 580.865, 586.845]
        data.datasets[4].data = [...this.state.nullArray, 720, ...pegelsResults]

        this.setState({ data })
    }

    simpleAverage = (dataset) => {
        var sum = 0
        for (let index = 0; index < dataset.length; index++)
            sum += dataset[index]
            
        const np1th = sum / dataset.length
        const np2th = (sum + np1th) / dataset.length + 1
        const np3th = (sum + np1th + np2th) / dataset.length + 2
        const np4th = (sum + np1th + np2th + np3th) / dataset.length + 3
        const np5th = (sum + np1th + np2th + np3th + np4th) / dataset.length + 4
        return [parseFloat(np1th.toFixed(3)), parseFloat(np2th.toFixed(3)), parseFloat(np3th.toFixed(3)), parseFloat(np4th.toFixed(3)), parseFloat(np5th.toFixed(3))]
    }

    render() { 
    
        const options = {
            tooltips: {
                mode: 'index', 
                intersect: false,
                yAlign: 'bottom'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    gridLines: {
                        drawBorder: false,
                    }
                }]
            }
        }
        return ( 
            <React.Fragment>
                <Line data={this.state.data} options={options}/>

            </React.Fragment>
         );
    }
}
 
export default Temp;