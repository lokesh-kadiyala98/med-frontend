import React, { Component } from 'react';
import ReactModal from 'react-modal'
import { Pie, Radar } from 'react-chartjs-2'
import { Row, Col } from 'react-bootstrap'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash'

import ComparisionRadar from './comparisionRadar';

class KnowYourHeartClassifier extends Component {
    state = { 
        showModal: true,
        user: {},
        data: {},
        score: '',
        analysisCharts : [],
    }

    componentDidMount() {
        const { data, user } = this.props

        this.setState({ data, user }, () => {
            this.analyze()
        })
    }

    calculateScore = (data) => {
        var prob = 1

        if(data.gender === '1' && data.age > 45)
            prob *= 8
        else if((data.gender === '2' || data.gender === '0') && data.age > 55)
            prob *= 6

        if((data.bmi === 'Overweight' && data.exerciseFreq === '1') || (data.exerciseFreq === '1' && (parseInt(data.hdl) + parseInt(data.ldl)) > 200))
            prob += 4 + 4 * (prob / 10)
        else if(data.exerciseFreq === '1')
            prob += 2 + 2 * (prob / 10)
        
        if((parseInt(data.hdl) + parseInt(data.ldl) > 200 && data.age < 18))
            prob += 4 + 4 * (prob / 10)

        if(parseInt(data.hdl) + parseInt(data.ldl) > 240 && data.age > 18) {
            prob += 0.4 + 0.4 * (prob / 10)
            if(data.diet.charAt(1) === '1' && parseInt(data.ldl) > 100)
                prob += 0.8 + 0.8 * (prob / 10)
        }

        if(data.exerciseFreq === '2')
            prob += 1 + 1 * (prob / 10)
            
        if(data.heartDiseaseHistory === '2') 
            prob += 2.1 + 2.1 * (prob / 10)

        if(data.diabetic === '2') {
            prob += 2 + 2 * (prob / 10)
        
            if(data.diet.charAt(1) === '1')
                prob += 1 + 1 * (prob / 10)
            
            if(data.diabeticDuration === '3')
                prob += 2 + 2 * (prob / 10)
            if(data.diabeticDuration === '4') 
                prob += 3 + 3 * (prob / 10)   
        }

        if(data.alcohol === '2')
            prob += 0.6 + 0.6 * (prob / 10)
        else if (data.alcohol === '3')
            prob += 1.2 + 1.2 * (prob / 10)

        if(data.smoke === '2')
            prob += 0.9 + 0.9 * (prob / 10)

        if(data.diet.charAt(1) === '1') {
            prob += 1.2 + 1.2 * (prob / 10)
        }    
        
        if(data.diet.charAt(0) === '1') {
            prob += 2 + 2 * (prob / 10)
            if(prob < 10) {
                prob += 4 + 4 * (prob / 10)
            }
        }

        return prob
    }

    analyze = () => {
        const data = {...this.state.data}  
        var score = 0
        
        data.diabeticDuration = data.diabetic === '1' ? 0 : data.diabeticDuration
        
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
            labels: ['Cholestrol Foods', 'Sugar Loaded', 'Processed Foods', 'Calorie Restricted', 'Heart Healthy'],
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

        if(data.score)
            score = data.score
        else {
            score = 100 - this.calculateScore(data).toFixed(2)
            score = score.toFixed(2)
        }

        this.setState({ score })

        if(score < 0)
            score = 6.7

        if(score > 90)
            data1.datasets[0].data = [96, 4]
        else if(score > 80)
            data1.datasets[0].data = [82, 18]
        else if(score > 70)
            data1.datasets[0].data = [61, 39]    
        else if(score > 60)
            data1.datasets[0].data = [57, 43]
        else if(score > 40)
            data1.datasets[0].data = [31, 69]
        else if(score > 25)
            data1.datasets[0].data = [17, 83]
        else
            data1.datasets[0].data = [0, 100]

        var analysisCharts = []
        
        analysisCharts.push(
            <Row className='align-items-center mt-5'>
                <Col sm={12} lg={8}><ComparisionRadar data={data} /></Col>
                <Col sm={12} lg={4} className="text-center mt-3">
                    <h4>Your Heart Score</h4>
                    <p>{score}</p>    
                </Col>
            </Row>
        )

        var diseaseHistoryParagraph, diseaseHistoryGraph
        if(data.heartDiseaseHistory === '2') {
            diseaseHistoryParagraph = <p className="cross text-center"><b>Hereditary</b> had shown to be setback.</p>
            diseaseHistoryGraph = <Pie data={data2} options={options2}></Pie>
        }

        if(data.age < 18) {
            if(parseInt(data.ldl) + parseInt(data.hdl) <= 170) {                  
                analysisCharts.push(
                    <Row className='align-items-center mt-5'>
                        <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                        <Col sm={12} lg={4} className='align-items-center'>
                            <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                            <p className="tick text-center">Cholestrol levels are in check.</p>
                            {diseaseHistoryParagraph}
                        </Col>
                        <Col sm={12} lg={4}>{diseaseHistoryGraph}</Col>
                    </Row>
                )
            } else if (parseInt(data.ldl) + parseInt(data.hdl) > 170 && parseInt(data.ldl) + parseInt(data.hdl) <= 199) {
                analysisCharts.push(
                    <Row className='align-items-center mt-5'>
                        <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                        <Col sm={12} lg={4}>
                            <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                            <p className="cross text-center"><b>Cholestrol</b> levels are Border-line High.</p>
                            {diseaseHistoryParagraph}
                        </Col>
                        <Col sm={12} lg={4}>{diseaseHistoryGraph}</Col>
                    </Row>
                )
            } else if (parseInt(data.ldl) + parseInt(data.hdl) > 200) {
                analysisCharts.push(
                    <Row className='align-items-center mt-5'>
                        <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                        <Col sm={12} lg={4}>
                            <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                            <p className="cross text-center"><b>Cholestrol</b> levels are Critically High.</p>
                            {data.diet.charAt(0) === '1' ? <p className="cross text-center">Serious changes in <b>Diet</b> are required.</p> : ''}
                            {diseaseHistoryParagraph}
                        </Col>
                        <Col sm={12} lg={4}>{diseaseHistoryGraph}</Col>
                    </Row>
                )
            }
        } else if(data.age > 19) {
            if(parseInt(data.ldl) + parseInt(data.hdl) <= 200) {                  
                analysisCharts.push(
                    <Row className='align-items-center mt-5'>
                        <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                        <Col sm={12} lg={4} className='align-items-center'>
                            <p className="tick text-center">Cholestrol levels are in check.</p>
                            {diseaseHistoryParagraph}
                        </Col>
                        <Col sm={12} lg={4}>{diseaseHistoryGraph}</Col>
                    </Row>
                )
            } else if (parseInt(data.ldl) + parseInt(data.hdl) > 200 && parseInt(data.ldl) + parseInt(data.hdl) <= 239) {
                analysisCharts.push(
                    <Row className='align-items-center mt-5'>
                        <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                        <Col sm={12} lg={4}>
                            <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                            <p className="cross text-center"><b>Cholestrol</b> levels are Border-line High.</p>
                            {diseaseHistoryParagraph}
                        </Col>
                        <Col sm={12} lg={4}>{diseaseHistoryGraph}</Col>
                    </Row>
                )
            } else if (parseInt(data.ldl) + parseInt(data.hdl) > 240) {
                analysisCharts.push(
                    <Row className='align-items-center mt-5'>
                        <Col sm={12} lg={4}><Pie data={data1} options={options1}></Pie></Col>
                        <Col sm={12} lg={4}>
                            <p className="mt-5 tick text-center">Age being under 18 can be a huge boost.</p>
                            <p className="cross text-center"><b>Cholestrol</b> levels are Critically High.</p>
                            {data.diet.charAt(0) === '1' ? <p className="cross text-center">Serious changes in <b>Diet</b> are required.</p> : ''}
                            {diseaseHistoryParagraph}
                        </Col>
                        <Col sm={12} lg={4}>{diseaseHistoryGraph}</Col>
                    </Row>
                )
            }
        }

        const p = data.diet.charAt(0) === '1' ? <p className="cross text-center">Your <b>Diet</b> has high risk factor.</p> : <p className="tick text-center">Your Diet has less risk factor.</p>
        
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

    handleSave = async () => {
        try {
            var res = await axios({
                method: 'post',
                url: 'http://localhost:5000/users/kyh_save_data',
                data: {...this.state.data, userID: this.state.user._id, score: this.state.score}
            })
            if(res.status === 200)
                toast.success(res.data.message)
        } catch (ex) {
            if(ex.response.status && ex.response.data) {
                toast.error(ex.response.data.error)
            }
        }
    }

    handleDownload = () => {
        html2canvas(document.querySelector('.ReactModal__Content--after-open'))
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0, 200, 114);
                pdf.save("download.pdf");  
            })
    }

    render() {
        return ( 
            <ReactModal id="user-report"
                ariaHideApp={false}
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example">
                <ToastContainer autoClose={5000}/>
                <button className="close" onClick={() => {this.handleCloseModal(); this.props.handleCloseReport();}}><i className="fas fa-times"></i></button>
                {_.isEmpty(this.state.user) ? null:
                    <React.Fragment>
                        <button className="download" onClick={this.handleDownload}><i className="fas fa-download"></i></button>
                        <button className="save" onClick={this.handleSave}><i className="fas fa-cloud-download-alt"></i></button>
                    </React.Fragment>
                }
                {this.state.analysisCharts.map((item, key) => 
                    <li key={key}>{item}</li>
                )}
            </ReactModal>
        );
    }
}
 
export default KnowYourHeartClassifier;