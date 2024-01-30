import fetchStockData from "../utils/fetchStockData";
import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const FinancialChart = () =>{
    useEffect(()=>{
        const chart = createChart(document.getElementById('chart-container'), { width: 200, height: 100 });
        const lineSeries = chart.addLineSeries();
        lineSeries.setData([
            { time: '2019-04-11', value: 80.01 },
            { time: '2019-04-12', value: 96.63 },
            { time: '2019-04-13', value: 76.64 },
            { time: '2019-04-14', value: 81.89 },
            { time: '2019-04-15', value: 74.43 },
            { time: '2019-04-16', value: 80.01 },
            { time: '2019-04-17', value: 96.63 },
            { time: '2019-04-18', value: 76.64 },
            { time: '2019-04-19', value: 81.89 },
            { time: '2019-04-20', value: 74.43 },
            // ... (more data points)
          ]);
    },[]);
    return <div id="chart-container"></div>;
}

export default FinancialChart;  