import React from 'react';
import { Bar } from 'react-chartjs-2'

const ComparisionBox = ({ label, avgScore, userScore, count }) => {
  const options = {
    maintainAspectRatio: false, 
  }
  const data = {
      labels: ['5%', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '100%'],
      datasets: [
        {
          categoryPercentage: 1.0,
          barPercentage: 1.0,
          label: label,
          backgroundColor: ['rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)', 'rgba(46, 204, 113, 0.2)',], 
          data: [100, 94, 89, 84, 79, 74, 69, 64, 59, 54, 49, 44, 39, 34, 29, 24, 19, 14, 9, 4, 0]
        }
      ]
  }
  data.datasets[0].backgroundColor[20 - parseInt(userScore/5)] = 'rgba(46, 204, 113, 0.8)'
  data.labels[20 - parseInt(userScore/5)] = 'Me'
  data.datasets[0].backgroundColor[20 - parseInt(avgScore/5)] = 'rgba(46, 204, 113, 0.4)'
  data.labels[20 - parseInt(avgScore/5)] = 'Average'
  return ( 
    <Bar data={data} height={300} options={options} />
  );
}

export default ComparisionBox;