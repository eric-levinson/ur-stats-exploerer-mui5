import React, {getContext} from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '0 of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.9)',
    },
    {
        label: '1 of Votes',
        data: [1, 8, 12, 3, 6, 15],
        fill: false,
        backgroundColor: 'rgb(255, 155, 22)',
        borderColor: 'rgba(255, 155, 22, 0.9)',
      },
  ],
};

const options = {
  scales: {
    xAxes: { grid: {
        color: 'rgba(255, 255, 255, 1)'
      }},
    yAxes: 
      { grid: {
        color: 'rgba(255, 255, 255, 1)'
      },
        ticks: {
          beginAtZero: true,
        },
      },
  },
};

export const LineChart = props => (
  <>
    <div className='header'>
      <h1 className='title'>Line Chart</h1>
    </div>
    <Line width={1500} height={1000} data={data} options={options} />
  </>
);

