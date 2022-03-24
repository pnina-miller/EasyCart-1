import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart(){
  let state = {
    dataBar: {
      labels: ["Paper", "Reviews", "Orders", "Views"],
      datasets: [
        {
          label: "% of Votes",
          data: [12, 19, 3, 5],
          backgroundColor: [
            "#d39e00",
            "#ffc107",
            "#f5e1a8",
            "#fdf6e3",
          ],
          borderWidth: 2,
          borderColor: [
            "#d39e00",
            "#ffc107",
            "#f5e1a8",
            "#fdf6e3",
          ],
          hoverBackgroundColor: [
            "#d39e00",
            "#ffc107",
            "#f5e1a8",
            "#fdf6e3",
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    }
  }
  return (
    <div className="w-100 h-100">
      <Bar data={state.dataBar} options={state.barChartOptions} />
    </div>
  );

}

export default BarChart;