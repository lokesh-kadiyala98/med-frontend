import React, { Component } from 'react';
import ReactModal from 'react-modal'
import { Pie, Radar } from 'react-chartjs-2'
import { Row, Col } from 'react-bootstrap'

import ComparisionRadar from './comparisionRadar';

class KnowYourHeartClassifier extends Component {
    state = { 
        showModal: true,
        data: {},
        analysisCharts : [],
    }

    componentDidMount() {
        const { data } = this.props

        this.setState({ data }, () => {
            this.analyze()
        })
    }

    analyze = () => {
        const { data } = this.state
         
        console.log(data)

        var data1 = {labels: ['No', 'Yes'], datasets: [{data: [], backgroundColor: ['#2ecc71', '#e67e22']}]}
        var options1 = {title: {display: true, text: 'Prob. subject having Heart Disease'}}
        
        var data2 = {labels: ['No', 'Yes'], datasets: [{data: [61, 39], backgroundColor: ['#1abc9c', '#f1c40f']}]}
        var options2 = {title: {display: true,text: 'Prob. Heart Disease Given Hereditary'}}

        var data3 = { }
        var options3 = { }
        var analysisCharts = []
        
        analysisCharts.push(<ComparisionRadar data={data} />)

        if(data.age < 18) {
            if(data.heartDiseaseHistory === '1') {
                if(data.ldl < 110 && data.hdl <= 60) {  
                    data1.datasets[0].data = [91, 9]
                    
                    analysisCharts.push(
                        <Row className='mb-3'>
                            <Col><Pie data={data1} options={options1}></Pie></Col>
                            <Col className='align-items-center'>
                                <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="tick text-center">Cholestrol levels are in check.</p>
                                <p className="cross text-center">However, <b>Hereditary</b> had shown to be setback.</p>
                            </Col>
                        </Row>
                    )
                } else if ((data.ldl >= 110 && data.ldl <=129) && (data.hdl >= 60 && data.hdl <= 80)) {
                    data1.datasets[0].data = [76, 24]

                    analysisCharts.push(
                        <Row className='align-items-center'>
                            <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                            <Col sm={12} lg={4}>
                                <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="cross text-center"><b>Cholestrol</b> levels are Border-line High.</p>
                                <p className="mb-5 cross text-center"><b>Hereditary</b> had shown to be setback.</p>
                            </Col>
                            <Col sm={12} lg={4}><Pie data={data2} options={options2}></Pie></Col>
                        </Row>
                    )
                } else if (data.ldl > 130 && data.hdl > 70) {
                    data1.datasets[0].data = [62, 38]

                    analysisCharts.push(
                        <Row className='align-items-center'>
                            <Col><Pie data={data1} options={options1}></Pie></Col>
                            <Col>
                                <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="cross text-center"><b>Cholestrol</b> levels are Critically High.</p>
                                {data.diet > 2 ? analysisCharts.push(<p className="cross text-center">Serious changes in <b>Diet</b> are required.</p>) : ''}
                                <p className="mb-5 cross text-center"><b>Hereditary</b> had shown to be setback.</p>
                            </Col>
                            <Col><Pie data={data2} options={options2}></Pie></Col>
                        </Row>
                    )
                }
            } else {
                if(data.ldl < 110 && data.hdl <= 60) {
                    // analysisPieData1.datasets[0].data[0] = '97'
                    // analysisPieData1.datasets[0].data[1] = '3'
                    // analysisPieData1.labels[0] = 'No'
                    // analysisPieData1.labels[1] = 'Yes'
                    // analysisPieData1.datasets[0].backgroundColor[0] = '#2ecc71'
                    // analysisPieData1.datasets[0].backgroundColor[1] = '#e67e22'
                } else if ((data.ldl >= 110 && data.ldl <=129) && (data.hdl >= 60 && data.hdl <= 80)) {
                    // analysisPieData1.datasets[0].data[0] = '83'
                    // analysisPieData1.datasets[0].data[1] = '17'
                    // analysisPieData1.labels[0] = 'No'
                    // analysisPieData1.labels[1] = 'Yes'
                    // analysisPieData1.datasets[0].backgroundColor[0] = '#2ecc71'
                    // analysisPieData1.datasets[0].backgroundColor[1] = '#e67e22'
                } else if (data.ldl > 130 && data.hdl > 70) {
                    // analysisPieData1.datasets[0].data[0] = '60'
                    // analysisPieData1.datasets[0].data[1] = '40'
                    // analysisPieData1.labels[0] = 'No'
                    // analysisPieData1.labels[1] = 'Yes'
                    // analysisPieData1.datasets[0].backgroundColor[0] = '#2ecc71'
                    // analysisPieData1.datasets[0].backgroundColor[1] = '#e67e22'
                }
            }
        } else if(data.age > 19) {

        }
        
        analysisCharts.push(<p className="mt-5 point text-center">Dietery habits can have long term effects on Cardiovascular Health.</p>)
        data3.labels = ['Sugar Loaded', 'High Carb/Low Fiber', 'Processed Food', 'Whole Grain', 'Healthy Fats']
        data3.datasets = []
        data3.datasets[0] = {
            data: [73, 48, 92, 36, 20],
            label: 'Prob. Heart Disease for certain Diet',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)'
        }
        options3.scale = {
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 100
            }
        } 
        analysisCharts.push(<Radar data={data3} options={options3}></Radar>)

        this.setState({ analysisCharts })
    }

    handleCloseModal = () => {
        this.setState({ showModal: false })
    }

    render() {
        return ( 
            <ReactModal 
                ariaHideApp={false}
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example">
                <button className="close" onClick={() => {this.handleCloseModal(); this.props.handleCloseReport();}}><i className="fas fa-times"></i></button>
                {this.state.analysisCharts.map((item, key) => 
                    <li key={key}>{item}</li>
                )}
            </ReactModal>
        );
    }
}
 
export default KnowYourHeartClassifier;