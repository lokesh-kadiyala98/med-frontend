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
        const data = {...this.state.data}         
        console.log(data)

        var dietBits = data.diet.reduce((x, y) => parseInt(x) + parseInt(y))

        if(dietBits.toString().length < 5)
            for(let i=dietBits.toString().length; i<5; i++)
                dietBits = '0' + dietBits
        
        data.diet = dietBits.toString()

        var data1 = {
            labels: ['No', 'Yes'], 
            datasets: [
                {
                    data: [], 
                    backgroundColor: ['#2ecc71', '#e67e22']
                }
            ]
        }
        var options1 = {
            title: {
                display: true, 
                text: 'Prob. subject having Heart Disease'
            }
        }
        
        var data2 = {
            labels: ['No', 'Yes'], 
            datasets: [
                {
                    data: [61, 39], 
                    backgroundColor: ['#1abc9c', '#f1c40f']
                }
            ]
        }
        var options2 = {
            title: {
                display: true,
                text: 'Prob. Heart Disease Given Hereditary'
            }
        }

        var data3 = {
            labels: ['Sugar Loaded', 'High Carb/Low Fiber', 'Processed Food', 'Whole Grain', 'Healthy Fats'],
            datasets: [
                {
                    data: [73, 48, 92, 36, 20],
                    label: 'Prob. Heart Disease for certain Diet',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                }
            ]
        }
        var options3 = {
            scale: { 
                ticks: {
                    beginAtZero: true, 
                    min: 0, 
                    max: 100
                }
            }
        }

        var prob = 1
        if(data.gender === '1' && data.age > 45)
            prob *= 8
        else if((data.gender === '2' || data.gender === '0') && data.age > 55)
            prob *= 6

        if((data.bmi === 'Overweight' && data.exerciseFreq === '1') || (data.exerciseFreq === '1' && (data.hdl + data.ldl) > 240))
            prob += 7 + 7 * (prob / 10)
        
        if(data.exerciseFreq === '2')
            prob += 2.4 + 2.4 * (prob / 10)
            
        if(data.heartDiseaseHistory === '2') 
            prob += 3 + 3 * (prob / 10)

        if(data.diabetic === '2') {
            prob += 2 + 2 * (prob / 10)
        
            if(data.diet.charAt(1) === '1')
                prob += 1 + 1 * (prob / 10)
            
            if(data.diabeticDuration === '3')
                prob += 2 + 2 * (prob / 10)
            if(data.diabeticDuration === '4') {
                prob += 3 + 3 * (prob / 10)   
            }
        }

        if(data.alcohol === '2')
            prob += 0.6 + 0.6 * (prob / 10)
        else if (data.alcohol === '3')
            prob += 1.6 + 1.6 * (prob / 10)

        if(data.diet.charAt(0) === '1')
           prob += 2 + 2 * (prob / 10)
        
        var analysisCharts = []
        
        analysisCharts.push(
            <Row className='align-items-center mt-5'>
                <Col sm={12} lg={8} ><ComparisionRadar data={data} /></Col>
                <Col sm={12} lg={4} className="text-center mt-3">
                    <h4>Your Heart Score</h4>
                    <p>{100 - prob.toFixed(1)}</p>    
                </Col>
            </Row>
        )

        if(data.age < 18) {
            if(data.heartDiseaseHistory === '2') {
                if(data.ldl < 110 && data.hdl <= 60) {  
                    data1.datasets[0].data = [91, 9]
                    
                    analysisCharts.push(
                        <Row className='align-items-center mt-5'>
                            <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                            <Col sm={12} lg={4} className='align-items-center'>
                                <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="tick text-center">Cholestrol levels are in check.</p>
                                <p className="cross text-center">However, <b>Hereditary</b> had shown to be setback.</p>
                            </Col>
                        </Row>
                    )
                } else if ((data.ldl >= 110 && data.ldl <=129) && (data.hdl >= 60 && data.hdl <= 80)) {
                    data1.datasets[0].data = [76, 24]

                    analysisCharts.push(
                        <Row className='align-items-center mt-5'>
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
                        <Row className='align-items-center mt-5'>
                            <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                            <Col sm={12} lg={4}>
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
                    data1.datasets[0].data = [100, 0]
                    
                    analysisCharts.push(
                        <Row className='align-items-center mt-5'>
                            <Col sm={12} lg={6}><Pie data={data1} options={options1}></Pie></Col>
                            <Col sm={12} lg={6} className='align-items-center'>
                                <p className="tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="tick text-center">Cholestrol levels are in check.</p>
                            </Col>
                        </Row>
                    )
                } else if ((data.ldl >= 110 && data.ldl <=129) && (data.hdl >= 60 && data.hdl <= 80)) {
                    data1.datasets[0].data = [89, 11]
                    
                    analysisCharts.push(
                        <Row className='align-items-center mt-5'>
                            <Col sm={12} lg={6}><Pie data={data1} options={options1}></Pie></Col>
                            <Col sm={12} lg={6} className='align-items-center'>
                                <p className="tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="cross text-center"><b>Cholestrol</b> levels are Border-line High.</p>
                            </Col>
                        </Row>
                    )
                } else if (data.ldl > 130 && data.hdl > 70) {
                    data1.datasets[0].data = [67, 33]
                    
                    analysisCharts.push(
                        <Row className='align-items-center mt-5'>
                            <Col sm={12} lg={6}><Pie data={data1} options={options1}></Pie></Col>
                            <Col sm={12} lg={6} className='align-items-center'>
                                <p className="tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="cross text-center"><b>Cholestrol</b> levels are Critically High.</p>
                            </Col>
                        </Row>
                    )
                }
            }
        } else if(data.age > 19) {

        }

        const p = data.diet < 2 ? <p className="tick text-center">Your Diet has less risk factor.</p> : <p className="cross text-center">Your <b>Diet</b> has high risk factor.</p>
        
        analysisCharts.push(
            <Row className="align-items-center mt-5">
                <Col sm={12} lg={6}><p className="point text-center">Dietery habits can have long term effects on Cardiovascular Health.</p>{p}</Col>
                <Col sm={12} lg={6}><Radar data={data3} options={options3}></Radar></Col>
            </Row>
        )

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