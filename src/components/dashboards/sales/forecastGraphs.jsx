import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios'
import _ from 'lodash'

import config from '../../../config.json'
import HoltWinters from './holtWinters'
import Loading from '../../misc/loading'

class ForecastGraphs extends Component {
    state = { 
        items: [],
        holtWintersResults: [],
        loading: true,
        lineData: {
            labels: [],
            datasets: []
        },
        insightBoards: [],
        predictionLength: 4,
        errors: {}
    }

    async componentDidUpdate(prevProps) {
        const { toForecast, url } = this.props
        if(prevProps.toForecast !== toForecast) {
            var items = [...this.state.items]
            if(items.indexOf(toForecast) === -1) {
                if(items.length < 4) {
                    items.push(toForecast)
                    this.setState({ items, loading: true })
                    
                    var holtWintersResults = [...this.state.holtWintersResults]
                    let errors = {...this.state.errors}
                    delete errors.message

                    try {
                        const { data } = await axios.get(config.apiEndpoint + url, {
                            params: {
                                toForecast: toForecast
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

                        for (let index = 1; index <= this.state.predictionLength; index++) {
                            if(index < 10)
                                lineData.labels.push(months['0'+index] + '-18')
                        }
                        
                        const holtWintersResult = HoltWinters(dataset, 12)
                        this.getInsights(toForecast, _.cloneDeep(holtWintersResult.augumentedDataset).splice(36, 12), _.cloneDeep(holtWintersResult.augumentedDataset).splice(48, 12), colors[this.state.items.length - 1])

                        holtWintersResults.push(holtWintersResult.augumentedDataset)
                        var temp = {
                            label: toForecast,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: colors[this.state.items.length - 1].faded,
                            borderColor: colors[this.state.items.length - 1].unfaded,
                            borderCapStyle: 'butt',
                            borderJoinStyle: 'miter',
                            pointBorderColor: colors[this.state.items.length - 1].unfaded,
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: colors[this.state.items.length - 1].unfaded,
                            pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: _.cloneDeep(holtWintersResult.augumentedDataset).splice(0, 48 + this.state.predictionLength + 1)
                        }
                        lineData.datasets.push(temp)
                        
                        this.setState({ holtWintersResults, lineData, errors, loading: false })
                    } catch(ex) {
                        console.log(ex)
                    }

                } else {
                    var errors = {...this.state.errors}
                    errors.message = 'Cannot compare more than 4 items'
                    this.setState({ errors, loading: false })
                }
            } else {
                errors = {...this.state.errors}
                errors.message = toForecast + ' already given'
                this.setState({ errors, loading: false })
            }
        }
    }

    getInsights = (medicineName, prevSales, predSales, color) => {
        var insightBoards = [...this.state.insightBoards]
        const prevSalesSum = prevSales.reduce((a, b) => a + b)
        const predSalesSum = predSales.reduce((a, b) => a + b)
        var nextFiscalYearProfit = 100 - (prevSalesSum / predSalesSum) * 100
        nextFiscalYearProfit = Math.round(nextFiscalYearProfit * 100) / 100

        var largestElem = predSales[0]
        var largestIndex = 0
        for (let index = 1; index < predSales.length; index++) {
            if (predSales[index] > largestElem) {
                largestIndex = index
                largestElem = predSales[index]
            }
        }

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        const data = {
            labels: months,
            datasets: [
                {
                    label: '2018 - ' + medicineName + ' sales',
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
                    data: predSales
                }
            ]
        };
        
        if (this.props.url === '/pharma/get_medicine_timeseries_data') {
            const doughnutData = {
                labels: ['Dec - Feb', 'Mar - May', 'Jun - Sep', 'Oct - Nov'],
                datasets: [
                    {
                        data: [predSales[11] + predSales[0] + predSales[1], predSales[2] + predSales[3] + predSales[4], predSales[5] + predSales[6] + predSales[6], predSales[8] + predSales[9] + predSales[10]],
                        backgroundColor: [
                            'rgba(112, 161, 255, 0.6)',
                            'rgba(255, 99, 72, 0.6)',
                            'rgba(255, 165, 2, 0.6)',
                            'rgba(46, 213, 115, 0.6)'
                        ],
                        hoverBackgroundColor: [
                            'rgba(112, 161, 255, 1.0)',
                            'rgba(255, 99, 72, 1.0)',
                            'rgba(255, 165, 2, 1.0)',
                            'rgba(46, 213, 115, 1.0)'
                        ]
                    }
                ]
            };
            insightBoards.push(<div className="jumbotron jumbotron-fluid mt-2" style={{backgroundColor: color.faded, color: color.unfaded}}>
                <div className="container">
                    <h1 className="display-4">{medicineName}</h1>
                    <p className="lead">Next Fiscal Year Profit: <b>{nextFiscalYearProfit + '% '}</b>{ nextFiscalYearProfit > 0 ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>}</p>
                    <p className="lead">Highest Sales Period: <b>{months[largestIndex]}</b></p>
                    <Line data={data} options={{scales:{yAxes:[{display:true,ticks:{beginAtZero:true}}]}}}/>
                    <br />
                    <Doughnut data={doughnutData} />
                </div>
            </div>)
        } else {
            const doughnutData = {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        data: [predSales[0] + predSales[1] + predSales[2], predSales[3] + predSales[4] + predSales[5], predSales[6] + predSales[7] + predSales[8], predSales[9] + predSales[10] + predSales[11]],
                        backgroundColor: [
                            'rgba(112, 161, 255, 0.6)',
                            'rgba(255, 99, 72, 0.6)',
                            'rgba(255, 165, 2, 0.6)',
                            'rgba(46, 213, 115, 0.6)'
                        ],
                        hoverBackgroundColor: [
                            'rgba(112, 161, 255, 1.0)',
                            'rgba(255, 99, 72, 1.0)',
                            'rgba(255, 165, 2, 1.0)',
                            'rgba(46, 213, 115, 1.0)'
                        ]
                    }
                ]
            };
            insightBoards.push(<div className="jumbotron jumbotron-fluid mt-2" style={{backgroundColor: color.faded, color: color.unfaded}}>
                <div className="container">
                    <h1 className="display-4">{medicineName}</h1>
                    <p className="lead">Next Fiscal Year Profit: <b>{nextFiscalYearProfit + '% '}</b>{ nextFiscalYearProfit > 0 ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>}</p>
                    <Line data={data} options={{scales:{yAxes:[{display:true,ticks:{beginAtZero:true}}]}}}/>
                    <br />
                    <Doughnut data={doughnutData} />
                </div>
            </div>)
        }

        this.setState({ insightBoards })
    }

    handleRemoveMedicine = (index) => {
        var items = [...this.state.items]
        var holtWintersResults = [...this.state.holtWintersResults]
        var insightBoards = [...this.state.insightBoards]
        var lineData = {...this.state.lineData}
        var errors = {...this.state.errors}
        var loading = false
        items.splice(index, 1)
        holtWintersResults.splice(index, 1)
        lineData.datasets.splice(index, 1)
        insightBoards.splice(index, 1)
        delete errors.message
        if(items.length === 0)
            loading = true
        this.setState({ items, holtWintersResults, insightBoards, lineData, errors, loading })
    }
    
    render() {
        const { lineData, items, loading, errors, insightBoards } = this.state

        if(loading)
            return <Loading />
        
        return ( 
            <React.Fragment>
                {errors.message && <div className="alert alert-warning">{errors.message}</div>}
                <Line data={lineData} />
                <div className="mt-1 capsules">
                    {items.map((item, index) => 
                        <li className="delete" key={index} onClick={() => this.handleRemoveMedicine(index)}>
                            {_.startCase(_.toLower(item))}
                        </li>
                    )}
                </div>
                <div className="row">
                    {insightBoards.map((item, index) => 
                        <li key={index} className="col-sm-12 col-lg-6">
                            {item}
                        </li>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
 
export default ForecastGraphs;