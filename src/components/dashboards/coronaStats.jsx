import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import { toast } from 'react-toastify';

import config from '../../config.json'

class CoronaStats extends Component {
    state = { 
        lastUpdated: '',
        totalCasesData: {
            labels: [],
            datasets: [
              {
                label: 'Total cases',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                lineTension: 0,
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
              }
            ]
        },
        recoveredCasesData: {
            labels: [],
            datasets: [
              {
                label: 'Recovered on particular Day',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                lineTension: 0.2,
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(75,192,192,0.4)',
                pointHoverBorderWidth: 10,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
              }
            ]
        }, 
        deathCasesData: {
            labels: [],
            datasets: [
              {
                label: 'Total deaths',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                lineTension: 0,
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
              }
            ]
        }
    }

    async componentDidMount() {
        const date = Date() 
        const formattedDate = date.substring(4, 10) + ', ' + date.substring(11, 15) + ', 17:00 IST'
        const months = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "June", "07": "July", "08": "Aug", "09": "Sept", "10": "Oct", "11": "Nov", "12": "Dec"}

        var totalCasesData = {...this.state.totalCasesData}
        var recoveredCasesData = {...this.state.recoveredCasesData}
        var deathCasesData = {...this.state.deathCasesData}

        try {
            const { data } = await axios.get(config.apiEndpoint + '/corona_stats/get_corona_data')
            
            data.items.forEach(item => {
                totalCasesData.labels.push(months[item.date.substr(3, 2)] + '-' + item.date.substr(0, 2))
                totalCasesData.datasets[0].data.push(item.totalCases)

                recoveredCasesData.labels.push(months[item.date.substr(3, 2)] + '-' + item.date.substr(0, 2))
                recoveredCasesData.datasets[0].data.push(item.recoveredOnDay)

                deathCasesData.labels.push(months[item.date.substr(3, 2)] + '-' + item.date.substr(0, 2))
                deathCasesData.datasets[0].data.push(item.totalDeaths)
            })

        } catch(ex) {
            console.log(ex)
            if(ex.response.status === 400 && ex.response.data) {
                toast.error(ex.response.data.error)
            }
        }

        this.setState({ lastUpdated: formattedDate })
    }

    render() { 
        const {lastUpdated, totalCasesData, recoveredCasesData, deathCasesData} = this.state
        // const data = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [
        //       {
        //         label: 'My First dataset',
        //         fill: false,
        //         backgroundColor: 'rgba(75,192,192,0.4)',
        //         borderColor: 'rgba(75,192,192,1)',
        //         pointBorderColor: 'rgba(75,192,192,1)',
        //         pointBackgroundColor: '#fff',
        //         pointBorderWidth: 1,
        //         pointHoverRadius: 5,
        //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        //         pointHoverBorderColor: 'rgba(220,220,220,1)',
        //         pointHoverBorderWidth: 2,
        //         pointRadius: 1,
        //         pointHitRadius: 10,
        //         data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
        //       }
        //     ]
        // };
        const options = {
            tooltips: {
                mode: 'index', 
                intersect: false
            }
        }
        return ( 
            <div className='text-center'>
                <h1 className='mb-0'>Corona Stats India</h1>
                <p className='text-muted'>Last updated: {lastUpdated}</p>
                <Line data={totalCasesData} options={options}/>
                <Line data={recoveredCasesData} options={options}/>
                <Line data={deathCasesData} options={options}/>
            </div>
         );
    }
}
 
export default CoronaStats;