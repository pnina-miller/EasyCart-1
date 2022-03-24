import React from "react";
import { Line } from "react-chartjs-2";

function LineChart(){
    const state = {
        dataLine: {
            labels: ["Paper", "Reviews", "Orders", "Views"],
            borderColor: [
                "#119e95",
                "#36b496",
                "#35c586",
                "#35be67",
            ],
            backgroundColor: [
                "#d39e00",
                "#ffc107",
                "#f5e1a8",
                "#fdf6e3",
            ],
            datasets: [
                {
                    label: "Views",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "#d39e00",
                    borderColor: "#d39e00",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "#d39e00",
                    pointBackgroundColor: "#d39e00",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [10, 48, 20, 19, 86, 100, 90]
                },
                {
                    label: "Paper",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: '#ffc107',
                    borderColor: "#ffc107",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "#ffc107",
                    pointBackgroundColor: "#ffc107",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "Reviews",
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: "#f5e1a8",
                    borderColor: "#f5e1a8",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "#f5e1a8",
                    pointBackgroundColor: "#f5e1a8",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [28, 48, 40, 19, 86, 27, 90]
                },
                {
                    label: "Orders",
                    fill: true,
                    lineTension: 1,
                    backgroundColor: "#fdf6e3",
                    borderColor: "#fdf6e3",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "#fdf6e3",
                    pointBackgroundColor: "#fdf6e3",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [100, 48, 15, 3, 6, 10, 90]
                },
             
            ]
        }
    };


    return (
        <div >
            <Line className="h-w" data={state.dataLine} options={{ responsive: true }} />
        </div>
    );

}

export default LineChart;