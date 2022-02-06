import React, { getContext } from 'react';
import * as Color from 'color';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';


const data = {
  labels: ['game 1', 'game 2', 'game 3', 'game 4', 'game 5', 'game 6'],
  datasets: [
    {
      label: 'sully',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.9)',
    },
    {
      label: 'slums',
      data: [1, 8, 12, 3, 6, 15],
      fill: false,
      backgroundColor: 'rgb(255, 155, 22)',
      borderColor: 'rgba(255, 155, 22, 0.9)',
    },
  ],
};

const options = {
  scales: {
    xAxes: {
      grid: {
        color: 'rgba(255, 255, 255, 0.8)'
      }
    },
    yAxes:
    {
      grid: {
        color: 'rgba(255, 255, 255, 0.8)'
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

export const LineChart = props => {
  //console.log(props.data)

  const color = (e, ind)  => {
    
    //console.log(c)

    if( e === 'blue') {
      let c = Color.rgb(79, 160, 247)
      let shade = _.round((((ind + 1) / 10) * 2), 3)
      //console.log(c)
      return c.darken(shade).rgb().string()
    } else if (e === 'orange') {
      let c = Color.rgb(247, 177, 79)
      let shade = _.round((((ind - 2) / 10) * 2), 3)
      //console.log(c)
      return c.darken(shade).rgb().string()
    }
  }

  
  const range = e => {
    let text = []
      for(let i = 0; i < e; i++) {
          text.push('game ' + (i + 1))
      }
      return text
  }

  //console.log(range(props.data.length))
  

  let currentData = {
    labels: range(props.data.series_length),
    datasets: props.data.dataset.map((e, i) => {
      let sug = {
        label: e.name,
        data: e.stats,
        fill: false,
        cubicInterpolationMode: 'monotone',
        backgroundColor: color(e.team, i),
        borderColor: color(e.team, i),
      }

      return sug
    }),
  }

  return (
    <>
      <div className='header'>
        <h2 className='title'>{props.data.label}</h2>
      </div>
      <Line data={currentData} options={options} />
    </>
  )
}

