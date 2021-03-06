import React, { Component } from 'react';
import axios from 'axios';

import SymptomClassifier from './symptom_classifier';
import config from '../../../config.json'
import AutoSuggestInput from '../../misc/autoSuggestInput';

class DiagnoseYourDisease extends Component {
    state = {
        data: {
            inputSymptoms: '',
            recommendedSymptoms: []
        }
    }

    getRelatedSymptoms = async () => {
        return axios({
            method: 'post',
            url: config.apiEndpoint + "/disease_symptoms/get_related_symptoms",
            data: {symptoms: this.state.data.inputSymptoms}
        })
    }

    //removes an item from input-list 
    handleRemoveInputSymptom = (targetIndex) => {
        const { inputSymptoms } = this.state.data

        var filteredInputSymptoms = inputSymptoms.split(', ').filter((ele, index) => 
            index !== targetIndex
        )
        filteredInputSymptoms = filteredInputSymptoms.join(', ')
        this.setState({ data: {inputSymptoms: filteredInputSymptoms} })
    } 

    handleAddInputSymptoms = (symptom) => {
        var { inputSymptoms } = this.state.data

        if(inputSymptoms.length > 1)
            inputSymptoms = inputSymptoms + ', ' + symptom
        else
            inputSymptoms = symptom

        this.setState({ data: {inputSymptoms: inputSymptoms} })
    }

    displayInputSymptoms = (symptoms) => {
        const symptomsArray = symptoms.split(', ')

        if(symptomsArray[0] !== '' && symptomsArray.length >= 1) {
            return symptomsArray.map((item, index) => 
                <li className="delete" key={index} onClick={() => this.handleRemoveInputSymptom(index)}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
            )
        }
    }

    handleSubmit = (value) => {
        var { inputSymptoms } = this.state.data
        
        if(inputSymptoms.length > 1)
            inputSymptoms = inputSymptoms + ', ' + value
        else
            inputSymptoms = value

        this.setState({ data: {inputSymptoms: inputSymptoms} })
    }

    render() { 
        return ( 
            <section>
                <AutoSuggestInput onClick={this.handleSubmit} url="/disease_symptoms/get_unique_symptoms" placeholder='Enter Symptom...' />
                <div className="mt-5 capsules">
                    {this.displayInputSymptoms(this.state.data.inputSymptoms)}
                </div>
                <div>
                    <SymptomClassifier 
                        symptoms={this.state.data.inputSymptoms} 
                        onClick={this.handleAddInputSymptoms}
                        getRelatedSymptoms={this.getRelatedSymptoms}
                    />
                </div>
            </section>    
        );
    }
}
 
export default DiagnoseYourDisease;