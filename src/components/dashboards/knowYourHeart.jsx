import React from 'react';
import $ from 'jquery'
import jwtDecode from 'jwt-decode'
import Joi from 'joi-browser'
import _ from 'lodash'

import Form from './../misc/form/form';
import KnowYourHeartClassifier from './knowYourHeartClassifer';

class KnowYourHeart extends Form {

    constructor(props) {
        super(props)

        this.baseState = this.state
    }

    state = { 
        user: {},
        data: {
            gender: '1',
            age: '17',
            weight: '62',
            height: '5.7',
            bmi: 'Healthy.',
            ldl: '90',
            hdl: '50',
            heartDiseaseHistory: '1',
            exerciseFreq: '3',
            diabetic: '1',
            diabeticDuration: '',
            alcohol: '1',
            diet: [],
        },
        errors: {}, 
        viewReport: false,
    }

    schema = {
        gender: Joi.string().label('Gender'),
        age: Joi.number().label('Age'),
        weight: Joi.number().label('Weight'),
        height: Joi.number().min(1).max(7).label('Height'),
        bmi: Joi.string().label('BMI'),
        ldl: Joi.number().label('Low Density Lipo-protein Cholestrol'),
        hdl: Joi.number().label('High Density Lipo-protein Cholestrol'),
        heartDiseaseHistory: Joi.number().label('Disease History'),
        exerciseFreq: Joi.number().label('Frequency'),
        diabetic: Joi.number().label('Diabetic'),
        diabeticDuration: Joi.when('diabetic', {is: '1', then: Joi.required()}),
        alcohol: Joi.number().label('Alcohol'),
        diet: Joi.allow('').label('Diet'),
    }

    heartBeat() {
        var hr = '65px'
        $('.fa-heart').ready(function animateHeart() {
            hr = (hr === '65px' ? '60px' : '65px')
            $('.fa-heart').animate({
                fontSize: hr
            }, 500, animateHeart);
    
        });
    }

    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    getBmi(weight, height) {
        if(weight > 0 && height > 0) {	
            var finalBmi = weight/((height*0.3048)*(height*0.3048))
            if(finalBmi < 18.5) {
                return "Under Weight."
            }
            if(finalBmi > 18.5 && finalBmi < 25) {
                return "Healthy."
            }
            if(finalBmi > 25) {
                return "Overweight."
            }
        }
    }

    componentDidMount() {
        this.heartBeat()
        try {
            const token = localStorage.getItem('token')
            const {user} = jwtDecode(token)
            this.setState({ user })
            var data = {...this.state.data}
            data.gender = user.gender
            data.age = this.getAge(user.dob)
            data.weight = user.weight
            data.height = user.height
            data.bmi = this.getBmi(user.weight, user.height * 30.48)

            this.setState({ data })
        } catch(ex) { }
        
    }

    handleCloseReport = () => {
        this.setState({ viewReport: false })
    }

    doSubmit = () => {
        this.setState({ viewReport: true })
    }

    render() { 
        const genderOptions = [
            [{_id: 'male', name: 'Male', value: 1}],
            [{_id: 'female', name: 'Female', value: 0}],
            [{_id: 'others', name: 'Others', value: 2}],
        ]
        const diabeticOptions = [
            [{_id: 'yes', name: 'Yes', value: 2}],
            [{_id: 'no', name: 'No', value: 1}],
        ]
        const diabeticDurationOptions = [
            [{_id: '0', name: '< 1 Year', value: 1}],
            [{_id: '1', name: '1 Year - 4 Years', value: 2}],
            [{_id: '2', name: '5 Years - 7 Years', value: 3}],
            [{_id: '3', name: '> 7 Years', value: 4}],
        ]
        const heartDiseaseHistoryOptions = [
            [{_id: 'yes', name: 'Yes', value: 2}],
            [{_id: 'no', name: 'No', value: 1}],
        ] 
        const activityOptions = [
            [{_id: 'lazy-sloth', img: require('../resources/img/lazy-man.jpg'), cardTitle: 'Lazy Sloth', cardBody: 'Less physical activity'}],
            [{_id: 'mediocre-active', img: require('../resources/img/mediocre-active.png'), cardTitle: 'Mediocre Active', cardBody: 'Professionally active'}],
            [{_id: 'workout-hero', img: require('../resources/img/workout-hero.png'), cardTitle: 'Workout Hero', cardBody: 'Hits gym 5-7 days a week'}],
        ]
        const alcoholOptions = [
            [{_id: 'never', liquid: 5, cardTitle: 'Never', cardBody: 'Non-Alcoholic'}],
            [{_id: 'occasional', liquid: 60, cardTitle: 'Occasional', cardBody: 'Not more than 40 fl. oz. per week'}],
            [{_id: 'frequent', liquid: 90, cardTitle: 'Frequent', cardBody: 'More than 60 fl. oz. per week'}],
        ]
        const dietOptions = [
            [{_id: 'healthy', cardTitle: 'Heart Healthy', cardBody: 'Low-fat dairy products, Legumes & Nuts, Omega-3 foods', value: 1}],
            [{_id: 'calorie-restricted', cardTitle: 'Calorie Restricted', cardBody: 'Green Salads, Whole grains, High fiber foods', value: 10}],
            [{_id: 'binging', cardTitle: 'Cholestrol Foods', cardBody: 'Deep Fried, High in Fat, Low in Fiber', value: 100}],
            [{_id: 'processed', cardTitle: 'Processed Foods', cardBody: 'Packed Food, Chips, Canned Soda', value: 1000}],
            [{_id: 'sweet-tooth', cardTitle: 'Sweet Loaded', cardBody: 'Sweets, Sugar Beverages, chocolates', value: 10000}],
        ]
        return ( 
            <React.Fragment>
                <div className='text-center heart-container'>
                    <i style={{fontSize: '60px'}} className='fas fa-heart text-danger'></i>
                </div>

                <div>
                    {_.isEmpty(this.state.user) ?
                        this.renderSelect('gender', 'Gender', genderOptions) :
                        this.renderInput('gender','Gender', 'text', true) 
                    }
                    {_.isEmpty(this.state.user) ?
                        this.renderInput('age','Age', 'number') :
                        this.renderInput('age','Age', 'number', true) 
                    }
                    {_.isEmpty(this.state.user) ?
                        this.renderInput('weight','Weight (KGs)', 'number') :
                        this.renderInput('weight','Weight (KGs)', 'number', true) 
                    }
                    {_.isEmpty(this.state.user) ?
                        this.renderInput('height','Height (feet.inch)', 'number') :
                        this.renderInput('height','Height (feet.inch)', 'number', true)
                    }
                    {this.renderInput('bmi', 'BMI', 'text', true)}
                    <div className="group-form-elements mb-2 p-3">
                        <p>
                            Cholestrol
                        </p>
                        {this.renderInput('ldl', 'LDL', 'number')}
                        {this.renderInput('hdl', 'HDL', 'number')}
                    </div>
                    {this.renderSelect('heartDiseaseHistory', 'Heart Disease History in Family?', heartDiseaseHistoryOptions)}
                    {this.renderSelect('diabetic', 'Diabetic', diabeticOptions)}
                    {this.state.data.diabetic === '2' ? 
                        this.renderSelect('diabeticDuration', 'How long have you been Diabetic?', diabeticDurationOptions) :
                        ''
                    }
                    {this.renderRadio('exerciseFreq', 'How active are you?', activityOptions)}
                    {this.renderRadio('alcohol', 'How much alcohol do you consume?', alcoholOptions)}
                    {/* {this.renderRadio('diet', 'Which matches your diet?', dietOptions)} */}
                    {this.renderCheckbox('diet', 'Which food habits matches your daily diet?', dietOptions)}
                     
                    {this.renderButton('Submit')}
                </div>
                
                {this.state.viewReport ? <KnowYourHeartClassifier data={this.state.data} handleCloseReport={this.handleCloseReport} /> : ''}
            </React.Fragment>
         );
    }
}
 
export default KnowYourHeart;