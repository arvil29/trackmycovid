import React, {useState, useEffect} from "react";
import {fetchDailyData} from "../../API/index";
import {Line, Bar} from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
    //this is class based representation of dailyData state
    // state = {
    //     dailyData: {[]}
    // }

    //dailyData is array of data
    const [dailyData, setDailyData] = useState([]);

    //fetch data from API called in index.js
    //data of global cases are stored here in array format
    //acts like componentDidMount, which only calls API once
    useEffect(() => {
        const fetchAPI = async() => {
            setDailyData(await fetchDailyData());
        }
        console.log(dailyData);
        fetchAPI();
    }, []); 

    //forms lineChart
    //only for global cases aka all cases
    const lineChart = (
        dailyData.length != 0 ? ( //if there is data --> output Line graph
            <Line
            //Line has 2 axis - x & y
                data={{
                    //get map of all dates & set to date
                    //this is x axis
                    labels: dailyData.map(({date}) => date),
                    
                    //get map of all infected & deaths
                    //this is y axis
                    datasets: [{
                        data: dailyData.map(({infected}) => infected),
                        label: "Infected",
                        borderColor: "#3333ff",
                        fill: true, 
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: "Deaths",
                        borderColor: "red",
                        backgroundColor: "rgba(255,0,0,0.5)",
                        fill: true, 
                    }],
                }}
            />) : null
    )

    //forms barChart
    //only for specific country's case
    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ["Infected", "Recovered", "Deaths"],
                    datasets: [{
                        lsbel: "People",
                        backgroundColor: [
                            "rgba(0,0,255,0.5)",
                            "rgba(0,255,0,0.5)",
                            "rgba(255,0,0,0.5)"
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `            Current state in ${country}`}
                }}/>
        ) : null
    )

    return (
        //if country is chosen --> show barChart
        //else show lineChart
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;