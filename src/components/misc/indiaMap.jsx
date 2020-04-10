import React from 'react';
import { GoogleCharts } from 'google-charts';
import axios from 'axios'

import config from '../../config.json'

const IndiaMap = () => {

    async function getStateWiseCoronaData() {
        const { data } = await axios.get(config.apiEndpoint + '/corona_stats/get_corona_state_wise_data')
        return data.items
    }

    
    GoogleCharts.load('visualization', '1', {'packages': ['geochart']});
    GoogleCharts.load(drawVisualization);
    
    async function drawVisualization() {
        const SWCD = await getStateWiseCoronaData()

        var data = GoogleCharts.api.visualization.arrayToDataTable([
            ['State Code', 'State', 'Cases', 'Recovered'],
            ['IN-AP', 'Andhra Pradesh', parseInt(SWCD[0].cases) + parseInt(SWCD[26].cases), parseInt(SWCD[0].cured) + parseInt(SWCD[26].cured)],
            ['IN-AN', 'Andaman and Nicobar Islands', parseInt(SWCD[1].cases), parseInt(SWCD[1].cured)],
            ['IN-AR', 'Arunachal Pradesh', parseInt(SWCD[2].cases), parseInt(SWCD[2].cured)],
            ['IN-AS', 'Assam', parseInt(SWCD[3].cases), parseInt(SWCD[3].cured)],
            ['IN-BR', 'Bihar', parseInt(SWCD[4].cases), parseInt(SWCD[4].cured)],
            ['IN-CH', 'Chandigarh', parseInt(SWCD[5].cases), parseInt(SWCD[5].cured)],
            ['IN-CT', 'Chhattisgarh', parseInt(SWCD[6].cases), parseInt(SWCD[6].cured)],
            ['IN-DL', 'Delhi', parseInt(SWCD[7].cases), parseInt(SWCD[7].cured)],
            ['IN-GA', 'Goa', parseInt(SWCD[8].cases), parseInt(SWCD[8].cured)],
            ['IN-GJ', 'Gujarath', parseInt(SWCD[9].cases), parseInt(SWCD[9].cured)],
            ['IN-HR', 'Haryana', parseInt(SWCD[10].cases), parseInt(SWCD[10].cured)],
            ['IN-HP', 'Himachal Pradesh', parseInt(SWCD[11].cases), parseInt(SWCD[11].cured)],
            ['IN-JK', 'Jammu & Kashmir', parseInt(SWCD[12].cases), parseInt(SWCD[12].cured)],
            ['IN-JH', 'Jharkhand', parseInt(SWCD[13].cases), parseInt(SWCD[13].cured)],
            ['IN-KA', 'Karnataka', parseInt(SWCD[14].cases), parseInt(SWCD[14].cured)],
            ['IN-KL', 'Kerala', parseInt(SWCD[15].cases), parseInt(SWCD[15].cured)],
            ['IN-LA', 'Ladakh', parseInt(SWCD[16].cases), parseInt(SWCD[16].cured)],
            ['IN-MP', 'Madhya Pradesh', parseInt(SWCD[17].cases), parseInt(SWCD[17].cured)],
            ['IN-MH', 'Maharashtra', parseInt(SWCD[18].cases), parseInt(SWCD[18].cured)],
            ['IN-MN', 'Manipur', parseInt(SWCD[19].cases), parseInt(SWCD[19].cured)],
            ['IN-MZ', 'Mizoram', parseInt(SWCD[20].cases), parseInt(SWCD[20].cured)],
            ['IN-OR', 'Odisha', parseInt(SWCD[21].cases), parseInt(SWCD[21].cured)],
            ['IN-PY', 'Puducherry', parseInt(SWCD[22].cases), parseInt(SWCD[22].cured)],
            ['IN-PB', 'Punjab', parseInt(SWCD[23].cases), parseInt(SWCD[23].cured)],
            ['IN-RJ', 'Rajasthan', parseInt(SWCD[24].cases), parseInt(SWCD[24].cured)],
            ['IN-TN', 'Tamil Nadu', parseInt(SWCD[25].cases), parseInt(SWCD[25].cured)],
            // ['IN-TG', 'Telangana', parseInt(SWCD[26].cases), parseInt(SWCD[26].cured)],
            ['IN-TR', 'Tripura', parseInt(SWCD[27].cases), parseInt(SWCD[27].cured)],
            ['IN-UT', 'Uttarakhand', parseInt(SWCD[28].cases), parseInt(SWCD[28].cured)],
            ['IN-UP', 'Uttar Pradesh', parseInt(SWCD[29].cases), parseInt(SWCD[29].cured)],
            ['IN-WB', 'West Bengal', parseInt(SWCD[30].cases), parseInt(SWCD[30].cured)]
        ]);
        
        var opts = {
            region: 'IN',
            displayMode: 'regions',
            resolution: 'provinces',
            colorAxis: {colors: ['#e74c3c']}
        };
        
        var geochart = new GoogleCharts.api.visualization.GeoChart(document.getElementById('visualization'));
        
        geochart.draw(data, opts);
    };

    return ( 
        <div id="visualization"></div>
    );
}
 
export default IndiaMap;