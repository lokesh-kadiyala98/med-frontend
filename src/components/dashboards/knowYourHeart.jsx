import React from 'react';
import $ from 'jquery'
import jwtDecode from 'jwt-decode'
import Joi from 'joi-browser'

import Form from './../misc/form/form';

class KnowYourHeart extends Form {

    constructor(props) {
        super(props)

        this.baseState = this.state
    }

    state = { 
        user: {},
        data: {
            gender: '',
            age: '',
            weight: '',
            height: '',
            bmi: '',
            exerciseFreq: '',
            diet: '',
            alcohol: ''
        },
        errors: {}
    }

    schema = {
        gender: Joi.string().label('Gender'),
        age: Joi.number().label('Age'),
        weight: Joi.number().label('Weight'),
        height: Joi.number().min(1).max(7).label('Height'),
        bmi: Joi.string().label('BMI'),
        exerciseFreq: Joi.number().label('Frequency'),
        diet: Joi.number().label('Diet'),
        alcohol: Joi.number().label('Alcohol')
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
            var finalBmi = weight/(height/100*height/100)
            if(finalBmi < 18.5) {
                return "Under Weight."
            }
            if(finalBmi > 18.5 && finalBmi < 25) {
                return "Healthy."
            }
            if(finalBmi > 25) {
                return "Overweight."
            }
        } else {
            alert("Please Fill in everything correctly")
        }
    }

    componentDidMount() {
        this.heartBeat()
        try {
            const token = localStorage.getItem('token')
            const {user} = jwtDecode(token)

            var data = {...this.state.data}
            data.gender = user.gender
            data.age = this.getAge(user.dob)
            data.weight = user.weight
            data.height = user.height
            data.bmi = this.getBmi(user.weight, user.height * 30.48)

            this.setState({ data })
        } catch(ex) { }
        
    }

    render() { 
        const genderOptions = [
            [{_id: 'male', name: 'Male'}],
            [{_id: 'female', name: 'Female'}],
            [{_id: 'others', name: 'Others'}],
        ] 
        const activityOptions = [
            [{_id: 'workout-hero', img: require('../resources/img/workout-hero.png'), cardTitle: 'Workout Hero', cardBody: 'Hits gym 5-7 days a week'}],
            [{_id: 'mediocre-active', img: require('../resources/img/mediocre-active.png'), cardTitle: 'Mediocre Active', cardBody: 'Professionally active'}],
            [{_id: 'lazy-sloth', img: require('../resources/img/lazy-man.jpg'), cardTitle: 'Lazy Sloth', cardBody: 'Less physical activity'}],
        ]
        const alcoholOptions = [
            [{_id: 'frequent', liquid: 90, cardTitle: 'Frequent', cardBody: 'Hits gym 5-7 days a week'}],
            [{_id: 'occasional', liquid: 40, cardTitle: 'Occasional', cardBody: 'Professionally active'}],
            [{_id: 'never', liquid: 0, cardTitle: 'Never', cardBody: 'Less physical activity'}],
        ]
        return ( 
            <React.Fragment>
                <div className='text-center heart-container'>
                    <i style={{fontSize: '60px'}} className='fas fa-heart text-danger'></i>
                </div>

                <div>
                    {this.state.data.gender ?
                        this.renderInput('gender','Gender') :
                        this.renderSelect('gender', 'Gender', genderOptions)
                    }
                    {this.renderInput('age','Age', 'number')}
                    {this.renderInput('weight','Weight (KGs)', 'number')}
                    {this.renderInput('height','Height (feet.inch)', 'number')}
                    {this.renderInput('bmi', 'BMI')}
                    {this.renderRadio('exerciseFreq', 'How active are you?', activityOptions)}
                    {this.renderRadio('alcohol', 'How much alcohol do you consume?', alcoholOptions)}
                    {this.renderButton('Submit')}
                </div>

            </React.Fragment>
         );
    }
}
 
export default KnowYourHeart;