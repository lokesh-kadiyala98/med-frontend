import React from 'react';
import { Radar } from 'react-chartjs-2';

const ComparisionRadar = ({ data }) => {
    
    function convertToRange(oldVal, oldMin, oldMax) {
        const newMax = 100, newMin = 10
        return parseFloat((((oldVal - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin).toFixed(1)
    }
    
    var riskyLdl, riskyHdl, riskyCholestrol, ldl, hdl, cholestrol, healthyLdl, healthyHdl, healthyCholestrol

    if(data.age < 18) {
        ldl = convertToRange(data.ldl, 1, 200)
        hdl = convertToRange(data.hdl, 1, 100)
        cholestrol = convertToRange(parseInt(data.ldl) + parseInt(data.hdl), 100, 300)
        healthyLdl = convertToRange(50, 1, 200)
        healthyHdl = convertToRange(70, 1, 100)
        healthyCholestrol = convertToRange(120, 1, 300)
        riskyLdl = convertToRange(140, 1, 200)
        riskyHdl = convertToRange(40, 1, 100)
        riskyCholestrol = convertToRange(180, 100, 300)
    } else {
        ldl = convertToRange(data.ldl, 1, 300)
        hdl = convertToRange(data.hdl, 1, 100)
        cholestrol = convertToRange(parseInt(data.ldl) + parseInt(data.hdl), 100, 400)
        healthyLdl = convertToRange(40, 1, 300)
        healthyHdl = convertToRange(80, 1, 100)
        healthyCholestrol = convertToRange(120, 1, 400)
        riskyLdl = convertToRange(160, 1, 300)
        riskyHdl = convertToRange(40, 1, 100)
        riskyCholestrol = convertToRange(220, 100, 400)
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
                    convertToRange(57, 1, 100),
                    riskyLdl,
                    riskyHdl, 
                    riskyCholestrol, 
                    convertToRange(11100, 1, 11111),
                    convertToRange(2.5, 1, 3),
                    convertToRange(2, 1, 2), 
                    convertToRange(3.5, 1, 4),
                    convertToRange(1.2, 1, 3),
                    convertToRange(1.8, 1, 2)
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
                    convertToRange(35, 1, 100),
                    healthyLdl,
                    healthyHdl, 
                    healthyCholestrol, 
                    convertToRange(11, 1, 11111),
                    convertToRange(1.5, 1, 3),
                    convertToRange(1, 1, 2), 
                    convertToRange(1, 1, 4),
                    convertToRange(2, 1, 3),
                    convertToRange(1.4, 1, 2)
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
                    convertToRange(data.age, 1, 100),
                    ldl,
                    hdl, 
                    cholestrol, 
                    convertToRange(data.diet, 1, 11111),
                    convertToRange(data.alcohol, 1, 3),
                    convertToRange(data.diabetic, 1, 2),
                    convertToRange(data.diabeticDuration === '' ? 1: data.diabeticDuration, 1, 4),
                    convertToRange(data.exerciseFreq, 1, 3),
                    convertToRange(data.heartDiseaseHistory, 1, 2)
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
    return ( 
        <Radar data={patientData} options={patientDataOptions} />
    );
}
 
export default ComparisionRadar;