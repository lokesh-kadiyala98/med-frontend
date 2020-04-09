import React, { Component } from 'react';
import SimpleLinearRegression from 'ml-regression-simple-linear';
import { toast, ToastContainer } from 'react-toastify'
import { Line, Bar } from 'react-chartjs-2'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

import config from '../../config.json'

class CoronaStats extends Component {
    state = { 
        lastUpdated: '',
        totalCasesData: {
            labels: [],
            datasets: [
              {
                label: 'Total cases',
                backgroundColor: 'rgba(253, 121, 168, 0.2)',
                borderColor: 'rgba(253, 121, 168, 1)',
                fill: false,
                lineTension: 0,
                pointBorderColor: 'rgba(253, 121, 168, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHitRadius: 10,
                pointHoverBackgroundColor: 'rgba(253, 121, 168, 0.2)',
                pointHoverBorderColor: 'rgba(253, 121, 168, 0.2)',
                pointHoverBorderWidth: 10,
                pointRadius: 1,
                data: []
              }
            ]
        },
        dailyNewCasesData: {
            labels: [],
            datasets: [
              {
                label: 'Daily New Cases',
                backgroundColor: 'rgba(253, 121, 168, 0.4)',
                borderColor: 'rgba(253, 121, 168, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(253, 121, 168, 0.7)',
                hoverBorderColor: 'rgba(253, 121, 168, 1)',
                data: []
              }
            ]
        }, 
        recoveredCasesData: {
            labels: [],
            datasets: [
              {
                label: 'Daily Recovered',
                backgroundColor: 'rgba(9, 132, 227, 0.2)',
                borderColor: 'rgba(9, 132, 227, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(9, 132, 227, 0.2)',
                hoverBorderColor: 'rgba(9, 132, 227, 1)',
                data: []
              }
            ]
        }, 
        totalRecovered: 0,
        deathCasesData: {
            labels: [],
            datasets: [
              {
                label: 'Total deaths',
                backgroundColor: 'rgba(253, 203, 110, 0.2)',
                borderColor: 'rgba(253, 203, 110, 1)',
                fill: false,
                lineTension: 0,
                pointBorderColor: 'rgba(253, 203, 110, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHitRadius: 10,
                pointHoverBackgroundColor: 'rgba(253, 203, 110, 0.2)',
                pointHoverBorderColor: 'rgba(253, 203, 110, 0.2)',
                pointHoverBorderWidth: 10,
                pointRadius: 1,
                data: []
              }
            ]
        },
        dailyNewDeathsData: {
            labels: [],
            datasets: [
              {
                label: 'Daily New Deaths',
                backgroundColor: 'rgba(253, 203, 110, 0.4)',
                borderColor: 'rgba(253, 203, 110, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(253, 203, 110, 0.7)',
                hoverBorderColor: 'rgba(253, 203, 110, 1)',
                data: []
              }
            ]
        },
    }

    async componentDidMount() {
        const date = Date() 
        const formattedDate = date.substring(4, 10) + ', ' + date.substring(11, 15) + ', 17:00 IST'
        const months = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "June", "07": "July", "08": "Aug", "09": "Sept", "10": "Oct", "11": "Nov", "12": "Dec"}

        var totalCasesData = {...this.state.totalCasesData}
        var dailyNewCasesData = {...this.state.dailyNewCasesData}
        var recoveredCasesData = {...this.state.recoveredCasesData}
        var deathCasesData = {...this.state.deathCasesData}
        var dailyNewDeathsData = {...this.state.dailyNewDeathsData}
        var totalRecovered = 0

        try {
            const { data } = await axios.get(config.apiEndpoint + '/corona_stats/get_corona_data')
            const { items } = data

            for (let index = 0; index < items.length; index++) {

                totalCasesData.labels.push(months[items[index].date.substr(3, 2)] + '-' + items[index].date.substr(0, 2))
                totalCasesData.datasets[0].data.push(items[index].totalCases)

                dailyNewCasesData.labels.push(months[items[index].date.substr(3, 2)] + '-' + items[index].date.substr(0, 2))
                if(index === 0) {
                    dailyNewCasesData.datasets[0].data.push(items[index].totalCases)
                    dailyNewDeathsData.datasets[0].data.push(items[index].totalDeaths)
                } else {
                    dailyNewCasesData.datasets[0].data.push(items[index].totalCases - items[index - 1].totalCases)
                    dailyNewDeathsData.datasets[0].data.push(items[index].totalDeaths - items[index - 1].totalDeaths)
                }

                recoveredCasesData.labels.push(months[items[index].date.substr(3, 2)] + '-' + items[index].date.substr(0, 2))
                recoveredCasesData.datasets[0].data.push(items[index].recoveredOnDay)
                totalRecovered += items[index].recoveredOnDay

                deathCasesData.labels.push(months[items[index].date.substr(3, 2)] + '-' + items[index].date.substr(0, 2))
                deathCasesData.datasets[0].data.push(items[index].totalDeaths)

                dailyNewDeathsData.labels.push(months[items[index].date.substr(3, 2)] + '-' + items[index].date.substr(0, 2))
            }

        } catch(ex) {
            if(ex.message) {
                toast.error(ex.message + ': Reported to developer')
            } else if(ex.response.status === 400 && ex.response.data) {
                toast.error(ex.response.data.error)
            }
        }

        this.setState({ lastUpdated: formattedDate, totalCasesData, dailyNewCasesData, recoveredCasesData, totalRecovered, deathCasesData, dailyNewDeathsData})
    }

    render() { 
        const {lastUpdated, totalCasesData, dailyNewCasesData, recoveredCasesData, totalRecovered, deathCasesData, dailyNewDeathsData} = this.state

        const totalDeathCases = deathCasesData.datasets[0].data[deathCasesData.datasets[0].data.length - 1]
        const casesWithOutcome = totalDeathCases + totalRecovered

        const totalDeathCasesPercentage = Math.floor(totalDeathCases / casesWithOutcome * 100)
        const totalRecoveredCasesPercentage = Math.ceil(totalRecovered / casesWithOutcome * 100)

        const options = {
            tooltips: {
                mode: 'index', 
                intersect: false,
                yAlign: 'bottom'
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        drawBorder: false,
                    }
                }]
            }
        }
        return (
            <div className='text-center'>
                <ToastContainer autoClose={5000}/>
                <h1 className='mb-0 text-secondary'>Corona Statistics India <img src={require('../resources/img/ind-flag.gif')} alt='INDIA flag' width="60" border="1 px solid #aaa"></img></h1>
                <p className='text-muted'>Last updated: {lastUpdated}</p>
                
                <div className='bg-light p-5'>
                    <h2 className="mb-0" style={{color: '#555'}}>COVID-19 Cases:</h2>
                    <h1 className='font-weight-bold mb-3' style={{color: '#aaa',}}>{totalCasesData.datasets[0].data[totalCasesData.datasets[0].data.length - 1]}</h1>
                    
                    <h2 className="mb-0" style={{color: '#555'}}>Recovered:</h2>
                    <div className='mb-3'>
                        <span className='font-weight-bold h1' style={{color: '#8ACA2B',}}>{totalRecovered}
                            <span className="h5"> ({totalRecoveredCasesPercentage}%)</span>
                        </span>
                    </div>
                    
                    <h2 className="mb-0" style={{color: '#555'}}>Deaths:</h2>
                    <div className='mb-3'>
                        <span className='font-weight-bold h1' style={{color: '#696969',}}>{totalDeathCases}
                            <span className="h5"> ({totalDeathCasesPercentage}%)</span>
                        </span>
                    </div>
                </div>

                <Row>
                    <Col className="p-5" lg={12}><Line data={totalCasesData} options={options}/></Col>
                    <Col className="p-5" lg={12}><Bar data={dailyNewCasesData}/></Col>
                </Row>
                
                <Row>
                    <Col className="p-5"><Bar data={recoveredCasesData}/></Col>
                </Row>
                
                <Row>
                    <Col className="p-5" lg={12}><Line data={deathCasesData} options={options}/></Col>
                    <Col className="p-5" lg={12}><Bar data={dailyNewDeathsData}/></Col>
                </Row>
            </div>
         );
    }
}
 
export default CoronaStats;