import React, { Component } from 'react';
import ReactModal from 'react-modal'
import { Pie, Radar } from 'react-chartjs-2'
import { Row, Col } from 'react-bootstrap'

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

    convertToRange = (oldVal, oldMin, oldMax) => {
        var newMax = 100, newMin = 10
        return (((oldVal - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin
    }

    analyze = () => {
        const { data } = this.state
         
        console.log(data)

        var data1 = { }
        var data2 = { }
        var data3 = { }
        var options1 = { }
        var options2 = { }
        var options3 = { }
        var analysisCharts = []

        var riskyLdl, riskyHdl, riskyCholestrol, ldl, hdl, cholestrol, healthyLdl, healthyHdl, healthyCholestrol

        if(data.age < 18) {
            ldl = this.convertToRange(data.ldl, 1, 200)
            hdl = this.convertToRange(data.hdl, 1, 100)
            cholestrol = this.convertToRange(parseInt(data.ldl) + parseInt(data.hdl), 100, 300)
            healthyLdl = this.convertToRange(50, 1, 200)
            healthyHdl = this.convertToRange(70, 1, 100)
            healthyCholestrol = this.convertToRange(120, 1, 300)
            riskyLdl = this.convertToRange(140, 1, 200)
            riskyHdl = this.convertToRange(40, 1, 100)
            riskyCholestrol = this.convertToRange(180, 100, 300)
        } else {
            ldl = this.convertToRange(data.ldl, 1, 300)
            hdl = this.convertToRange(data.hdl, 1, 100)
            cholestrol = this.convertToRange(parseInt(data.ldl) + parseInt(data.hdl), 100, 400)
            healthyLdl = this.convertToRange(40, 1, 300)
            healthyHdl = this.convertToRange(80, 1, 100)
            healthyCholestrol = this.convertToRange(120, 1, 400)
            riskyLdl = this.convertToRange(160, 1, 300)
            riskyHdl = this.convertToRange(40, 1, 100)
            riskyCholestrol = this.convertToRange(220, 100, 400)
        } 
        var patientData = { 
            labels: ['Age', 'LDL', 'HDL', 'Cholestrol', 'Diet', 'Alcohol', 'Diabetic', 'Diabetic Duration', 'Exercise Freq', 'Disease History - Hereditary',],
            datasets: [
                {
                    label: 'Average Heart Patient',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                    data: [
                        this.convertToRange(57, 1, 100),
                        riskyLdl,
                        riskyHdl, 
                        riskyCholestrol, 
                        this.convertToRange(5, 1, 5) - 11,
                        this.convertToRange(3, 1, 3) - 13,
                        this.convertToRange(2, 1, 2) - 9, 
                        this.convertToRange(4, 1, 4) + 4,
                        this.convertToRange(1, 1, 3) + 3,
                        this.convertToRange(2, 1, 2) - 16
                    ]
                },
                {
                    label: 'Average Healthy Sapien',
                    backgroundColor: 'rgba(155, 89, 182, 0.2)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    pointBackgroundColor: 'rgba(155, 89, 182, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(155, 89, 182, 1)',
                    data: [
                        this.convertToRange(35, 1, 100),
                        healthyLdl,
                        healthyHdl, 
                        healthyCholestrol, 
                        this.convertToRange(1.5, 1, 5),
                        this.convertToRange(1.5, 1, 3),
                        this.convertToRange(1, 1, 2), 
                        this.convertToRange(1, 1, 4),
                        this.convertToRange(2, 1, 3),
                        this.convertToRange(2, 1, 2)
                    ]
                },
                {
                    label: 'Your Performance',
                    backgroundColor: 'rgba(114, 224, 248, 0.2)',
                    borderColor: 'rgba(114, 224, 248, 1)',
                    pointBackgroundColor: 'rgba(114, 224, 248, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(114, 224, 248, 1)',
                    data: [
                        this.convertToRange(data.age, 1, 100),
                        ldl,
                        hdl, 
                        cholestrol, 
                        this.convertToRange(data.diet, 1, 5) + 10,
                        this.convertToRange(data.alcohol, 1, 3) + 15,
                        this.convertToRange(data.diabetic, 1, 2) + 5,
                        this.convertToRange(data.diabeticDuration === '' ? 1: data.diabeticDuration, 1, 4),
                        this.convertToRange(data.exerciseFreq, 1, 3) + 17,
                        this.convertToRange(data.heartDiseaseHistory, 1, 2) + 11
                    ]
                }
            ]
        }
        var patientDataOptions = { 
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 120,
                    stepSize: 10
                }
            }
        }
        analysisCharts.push(<Radar data={patientData} options={patientDataOptions}></Radar>)
        
        if(data.age < 18) {
            if(data.heartDiseaseHistory === '1') {
                if(data.ldl < 110 && data.hdl <= 60) {  
                    data1.datasets = []
                    data1.datasets[0] = {
                        data: [91, 9],
                        backgroundColor: ['#2ecc71', '#e67e22']
                    }
                    data1.labels = ['No', 'Yes']
                    options1.title = {
                        display: true,
                        text: 'Probability of subject having Heart Disease'
                    }
                    analysisCharts.push(
                        <Row className='mb-3'>
                            <Col><Pie data={data1} options={options1}></Pie></Col>
                            <Col>
                                <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="tick text-center">Cholestrol levels are in check.</p>
                                <p className="cross text-center">However, <b>Hereditary</b> had shown to be setback.</p>
                            </Col>
                        </Row>
                    )
                } else if ((data.ldl >= 110 && data.ldl <=129) && (data.hdl >= 60 && data.hdl <= 80)) {
                    data1.datasets = []
                    data1.datasets[0] = {
                        data: [76, 24],
                        backgroundColor: ['#2ecc71', '#e67e22']
                    }
                    data1.labels= ['No', 'Yes']
                    options1.title = {
                        display: true,
                        text: 'Probability of subject having Heart Disease'
                    }
                    analysisCharts.push(
                        <Row>
                            <Col><Pie data={data1} options={options1}></Pie></Col>
                            <Col>
                                <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="cross text-center"><b>Cholestrol</b> levels are Border-line High.</p>
                                <p className="mb-5 cross text-center"><b>Hereditary</b> had shown to be setback.</p>
                            </Col>
                        </Row>
                    )
                } else if (data.ldl > 130 && data.hdl > 70) {
                    data1.datasets = []
                    data1.datasets[0] = {
                        data: [62, 38],
                        backgroundColor: ['#2ecc71', '#e67e22']
                    }
                    data1.labels= ['No', 'Yes']
                    options1.title = {
                        display: true,
                        text: 'Probability of subject having Heart Disease'
                    }
                    analysisCharts.push(
                        <Row>
                            <Col><Pie data={data1} options={options1}></Pie></Col>
                            <Col>
                                <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                                <p className="cross text-center"><b>Cholestrol</b> levels are Critically High.</p>
                                {data.diet < 3 ? analysisCharts.push(<p className="cross text-center">Serious changes in <b>Diet</b> are required.</p>) : ''}
                                <p className="mb-5 cross text-center"><b>Hereditary</b> had shown to be setback.</p>
                            </Col>
                        </Row>
                    )
                }
                data2.datasets = []
                data2.datasets[0] = {
                    data: [61, 39],
                    backgroundColor: ['#1abc9c', '#f1c40f']
                }
                data2.labels = ['No', 'Yes']
                options2.title = {
                    display: true,
                    text: 'Probability of Heart Disease Given Hereditary (Global)'
                }
                analysisCharts.push(<Pie data={data2} options={options2}></Pie>)
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
            label: 'Probability of Heart Disease for certain Diet',
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