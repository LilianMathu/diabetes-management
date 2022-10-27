import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';
import { Paper } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [30, 40, 50, 60, 70, 80, 90],
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ],
};

const Dashboard = () => {
  const [chartData, setChartData] = useState({});

  //   get day of the week from date
  const getFormattedData = datas => {
    // filter  data from this week Monday to Sunday and return an array of total readings for each day
    const arr = [];
    const mondayThisWeek = new Date(
      new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
    );

    const sundayThisWeek = new Date(
      new Date().setDate(new Date().getDate() - new Date().getDay() + 7)
    );

    const thisWeek = datas.filter(
      data =>
        new Date(data.createdAt) >= mondayThisWeek &&
        new Date(data.createdAt) <= sundayThisWeek
    );

    for (let i = 0; i < 7; i++) {
      // add i days to mondayThisWeek to get the date for each day of the week
      const day = new Date(moment(mondayThisWeek).add(i, 'days'));

      const dayData = thisWeek.filter(
        data => new Date(data.createdAt).getDate() === day.getDate()
      );
      const total = dayData.reduce(
        (acc, data) => acc + Number(data.reading),
        0
      );
      arr.push(total);
    }
    return arr;
  };

  const chart = async () => {
    try {
      let glucose = [];
      let time = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const { data } = await axios.get('http://localhost:8080/glucose');
      glucose = getFormattedData(data.readings);

      setChartData({
        labels: time,
        datasets: [
          {
            label: 'Glucose Readings',
            data: glucose,
            borderColor: 'rgba(64, 24, 157, 1)',
            borderWidth: '0',
            backgroundColor: 'rgba(64, 24, 157, 0.5)',
            hoverBackgroundColor: 'rgba(64, 24, 157, 0.5)',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className='ml-2' style={{ marginLeft: '1rem' }}>
      {Object.keys(chartData).length !== 0 && (
        <Bar
          data={chartData}
          height={150}
          options={{
            legend: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  barPercentage: 0.5,
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
