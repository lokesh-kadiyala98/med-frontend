import React, { Component } from 'react';
import SymptomClassifier from './symptom_classifier';

class DiseasePredictorDashboard extends Component {
    state = {
        data: {
            inputSymptoms: ''
        }
    }

    handleDeleteInputSymptom = (targetIndex) => {
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
                <li className="delete" key={index} onClick={() => this.handleDeleteInputSymptom(index)}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
            )
        }
    }

    handleSubmit = () => {
        var { inputSymptoms } = this.state.data
        
        if(inputSymptoms.length > 1)
            inputSymptoms = inputSymptoms + ', ' + this.refs.symptom.value
        else
            inputSymptoms = this.refs.symptom.value

        this.setState({ data: {inputSymptoms: inputSymptoms} })
        this.refs.symptom.value = ''
    }

    render() { 
        return ( 
            <section className='container'>
                <div className="input-group mb-3">
                    <input className="form-control" type="text" ref="symptom" placeholder="Enter Symptoms..." />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={() => this.handleSubmit()} type="button">Diagnose</button>
                    </div>
                </div>
                <div className="mt-5 symptomsContainer">
                    {this.displayInputSymptoms(this.state.data.inputSymptoms)}
                </div>
                <div>
                    <SymptomClassifier 
                        symptoms={this.state.data.inputSymptoms} 
                        onClick={this.handleAddInputSymptoms}
                    />
                </div>
            </section>    
        );
    }
}
 
export default DiseasePredictorDashboard;