import React from 'react';
import { GoogleCharts } from 'google-charts';
import axios from 'axios'

import config from '../../config.json'

const IndiaMap = () => {

    async function getCovidINData() {
        const { data } = await axios.get(config.apiEndpoint + '/corona_stats/IN')
        return data
    }

    GoogleCharts.load('visualization', '1', {'packages': ['geochart']});
    GoogleCharts.load(drawVisualization);
    
    async function drawVisualization() {
        const covidINData = await getCovidINData()
        
        var data = GoogleCharts.api.visualization.arrayToDataTable([
            ['State Code', 'State', 'Current', 'Recovered'],
            ['IN-AN', 'Andaman and Nicobar Islands', covidINData[0].cases, covidINData[0].cured],
            ['IN-AP', 'Andhra Pradesh', covidINData[1].cases + covidINData[26].cases, covidINData[1].cured + covidINData[26].cured],
            ['IN-AR', 'Arunachal Pradesh', covidINData[2].cases, covidINData[2].cured],
            ['IN-AS', 'Assam', covidINData[3].cases, covidINData[3].cured],
            ['IN-BR', 'Bihar', covidINData[4].cases, covidINData[4].cured],
            ['IN-CH', 'Chandigarh', covidINData[5].cases, covidINData[5].cured],
            ['IN-CT', 'Chhattisgarh', covidINData[6].cases, covidINData[6].cured],
            ['IN-DN', 'Dadra and Nagar Haveli', covidINData[7].cases, covidINData[7].cured],
            ['IN-DL', 'Delhi', covidINData[8].cases, covidINData[8].cured],
            ['IN-GA', 'Goa', covidINData[9].cases, covidINData[9].cured],
            ['IN-GJ', 'Gujarath', covidINData[10].cases, covidINData[10].cured],
            ['IN-HR', 'Haryana', covidINData[11].cases, covidINData[11].cured],
            ['IN-HP', 'Himachal Pradesh', covidINData[12].cases, covidINData[12].cured],
            ['IN-JK', 'Jammu & Kashmir', covidINData[13].cases, covidINData[13].cured],
            ['IN-JH', 'Jharkhand', covidINData[14].cases, covidINData[14].cured],
            ['IN-KA', 'Karnataka', covidINData[15].cases, covidINData[15].cured],
            ['IN-KL', 'Kerala', covidINData[16].cases, covidINData[16].cured],
            ['IN-LA', 'Ladakh', covidINData[17].cases, covidINData[17].cured],
            ['IN-MP', 'Madhya Pradesh', covidINData[18].cases, covidINData[18].cured],
            ['IN-MH', 'Maharashtra', covidINData[19].cases, covidINData[19].cured],
            ['IN-MN', 'Manipur', covidINData[20].cases, covidINData[20].cured],
            ['IN-ML', 'Meghalaya', covidINData[21].cases, covidINData[21].cured],
            ['IN-MZ', 'Mizoram', covidINData[22].cases, covidINData[22].cured],
            ['IN-NL', 'Nagaland', covidINData[23].cases, covidINData[23].cured],
            ['IN-OR', 'Odisha', covidINData[24].cases, covidINData[24].cured],
            ['IN-PY', 'Puducherry', covidINData[25].cases, covidINData[25].cured],
            ['IN-PB', 'Punjab', covidINData[26].cases, covidINData[26].cured],
            ['IN-RJ', 'Rajasthan', covidINData[27].cases, covidINData[27].cured],
            ['IN-SK', 'Sikkim', covidINData[28].cases, covidINData[28].cured],
            ['IN-TN', 'Tamil Nadu', covidINData[29].cases, covidINData[29].cured],
            // ['IN-TG', 'Telangana', covidINData[30].cases, covidINData[30].cured],
            ['IN-TR', 'Tripura', covidINData[31].cases, covidINData[31].cured],
            ['IN-UP', 'Uttar Pradesh',  covidINData[32].cases, covidINData[32].cured],
            ['IN-UT', 'Uttarakhand', covidINData[33].cases, covidINData[33].cured],
            ['IN-WB', 'West Bengal', covidINData[34].cases, covidINData[34].cured], 
        ]);
        
        var opts = {
            region: 'IN',
            domain: 'IN',
            displayMode: 'regions',
            resolution: 'provinces',
            colorAxis: {
                colors: ['#e74c3c']
            },
            datalessRegionColor: '#fff',
        };
        
        var geochart = new GoogleCharts.api.visualization.GeoChart(document.getElementById('visualization'));
        
        geochart.draw(data, opts);
    };
    
    const date = Date() 
    const formattedDate = date.substring(4, 10) + ', ' + date.substring(11, 15) + ', 17:00 IST'
    return ( 
        <React.Fragment>
            <div id="visualization"></div>
            <div className="text-center text-secondary text-monospace">
                <p className='mb-0'>Last updated: {formattedDate}</p>
                <p className='mb-0'>Source: <a href="https://www.mohfw.gov.in/" target="_blank" rel="noopener noreferrer">https://www.mohfw.gov.in</a></p>
            </div>
        </React.Fragment>
    );
}
 
export default IndiaMap;