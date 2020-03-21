import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import _ from 'lodash'

import config from '../../../config.json'
import HoltWinters from './holtWinters'
import Loading from '../../misc/loading'

class ForecastGraphs extends Component {
    state = { 
        items: [],
        loading: true,
        lineData: {
            labels: [],
            datasets: []
        },
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
    
                        lineData.labels.push("Jan-18")
                        lineData.labels.push("Feb-18")
                        lineData.labels.push("Mar-18")
                        lineData.labels.push("Apr-18")
                        
                        const holtWintersResult = HoltWinters(dataset, this.state.predictionLength)
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
                            data: holtWintersResult.augumentedDataset
                        }
                        lineData.datasets.push(temp)
                        
                        this.setState({ lineData, loading: false })
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

    handleRemoveMedicine = (index) => {
        var items = [...this.state.items]
        var lineData = {...this.state.lineData}
        var errors = {...this.state.errors}
        var loading = false
        items.splice(index, 1)
        lineData.datasets.splice(index, 1)
        delete errors.message
        if(items.length === 0)
            loading = true
        this.setState({ lineData, items, errors, loading })
    }
    
    render() {
        const { lineData, items, loading, errors } = this.state

        if(loading)
            return <Loading />
        
        return ( 
            <React.Fragment>
                {errors.message && <div className="alert alert-warning">{errors.message}</div>}
                <Line data={lineData} />
                <div className="mt-5 capsules">
                    {items.map((item, index) => 
                        <li className="delete" key={index} onClick={() => this.handleRemoveMedicine(index)}>
                            {_.startCase(_.toLower(item))}
                        </li>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
 
export default ForecastGraphs;