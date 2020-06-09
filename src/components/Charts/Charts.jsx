import React,{useEffect,useState} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Charts.module.css';
import { StylesProvider } from '@material-ui/core';

export default function Charts({ data:{ confirmed, recovered, deaths} , country }) {
const [dailyData, setDailyData] = useState([]);

useEffect(() => {
    fetchDailyData()
    .then((res)=>  { setDailyData(res.data); })
    .catch((err) => console.log("Error, api isn't working.....", err))
    }, []);

const lineChart = (
    dailyData && dailyData.length != 0
    ? (
    <Line 
    data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets:[{
            data: dailyData.map(({confirmed}) => confirmed.total),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
        },{
            data: dailyData.map(({ deaths }) => deaths.total),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
        }]
    }}    
    />) : null
);

console.log("sabhii hai yahan +++++++++>",confirmed,recovered,deaths);

const barChart = (
    confirmed
    ? (
        <Bar
            data={{
                labels: ['Infected','Recovered','Deaths'],
                datasets:[{
                    labels: "People",
                    backgroundColor: [
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'
                    ],
                    data:[confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend:{display: false},
                title: {display: true, text: `curent state in ${country}`},
            }}
        />
        ): null
);

    return (
        <div className={styles.container}>
          {country ? barChart : lineChart}
        </div>
      );
}
