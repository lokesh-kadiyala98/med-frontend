import React from 'react';
import { GoogleCharts } from 'google-charts';
import axios from 'axios'

import config from '../../config.json'

const IndiaMap = () => {

    async function getStateWiseCoronaData() {
        const { data } = await axios.get(config.apiEndpoint + '/corona_stats/get_state_wise_data')
        return data.items
    }

    GoogleCharts.load('visualization', '1', {'packages': ['geochart']});
    GoogleCharts.load(drawVisualization);
    
    async function drawVisualization() {
        const SWCD = await getStateWiseCoronaData()

        var data = GoogleCharts.api.visualization.arrayToDataTable([
            ['State Code', 'State', 'Cases', 'Recovered'],
            ['IN-AN', 'Andaman and Nicobar Islands', SWCD[0].cases + SWCD[26].cases, SWCD[0].cured + SWCD[26].cured],
            ['IN-AP', 'Andhra Pradesh', SWCD[1].cases, SWCD[1].cured],
            ['IN-AR', 'Arunachal Pradesh', SWCD[2].cases, SWCD[2].cured],
            ['IN-AS', 'Assam', SWCD[3].cases, SWCD[3].cured],
            ['IN-BR', 'Bihar', SWCD[4].cases, SWCD[4].cured],
            ['IN-CH', 'Chandigarh', SWCD[5].cases, SWCD[5].cured],
            ['IN-CT', 'Chhattisgarh', SWCD[6].cases, SWCD[6].cured],
            ['IN-DL', 'Delhi', SWCD[7].cases, SWCD[7].cured],
            ['IN-GA', 'Goa', SWCD[8].cases, SWCD[8].cured],
            ['IN-GJ', 'Gujarath', SWCD[9].cases, SWCD[9].cured],
            ['IN-HR', 'Haryana', SWCD[10].cases, SWCD[10].cured],
            ['IN-HP', 'Himachal Pradesh', SWCD[11].cases, SWCD[11].cured],
            ['IN-JK', 'Jammu & Kashmir', SWCD[12].cases, SWCD[12].cured],
            ['IN-JH', 'Jharkhand', SWCD[13].cases, SWCD[13].cured],
            ['IN-KA', 'Karnataka', SWCD[14].cases, SWCD[14].cured],
            ['IN-KL', 'Kerala', SWCD[15].cases, SWCD[15].cured],
            ['IN-LA', 'Ladakh', SWCD[16].cases, SWCD[16].cured],
            ['IN-MP', 'Madhya Pradesh', SWCD[17].cases, SWCD[17].cured],
            ['IN-MH', 'Maharashtra', SWCD[18].cases, SWCD[18].cured],
            ['IN-MN', 'Manipur', SWCD[19].cases, SWCD[19].cured],
            ['IN-MZ', 'Mizoram', SWCD[20].cases, SWCD[20].cured],
            ['IN-OR', 'Odisha', SWCD[21].cases, SWCD[21].cured],
            ['IN-PY', 'Puducherry', SWCD[22].cases, SWCD[22].cured],
            ['IN-PB', 'Punjab', SWCD[23].cases, SWCD[23].cured],
            ['IN-RJ', 'Rajasthan', SWCD[24].cases, SWCD[24].cured],
            ['IN-TN', 'Tamil Nadu', SWCD[25].cases, SWCD[25].cured],
            // ['IN-TG', 'Telangana', SWCD[26].cases, SWCD[26].cured],
            ['IN-TR', 'Tripura', SWCD[27].cases, SWCD[27].cured],
            ['IN-UP', 'Uttar Pradesh',  SWCD[28].cases, SWCD[28].cured],
            ['IN-UT', 'Uttarakhand', SWCD[29].cases, SWCD[29].cured],
            ['IN-WB', 'West Bengal', SWCD[30].cases, SWCD[30].cured], 
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