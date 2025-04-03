"use client"

import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface PerformanceChartProps {
  gameType: "wordle" | "connections"
  timeFrame: "daily" | "monthly" | "yearly"
}

export function PerformanceChart({ gameType, timeFrame }: PerformanceChartProps) {
 
  let labels: string[] = []
  if (timeFrame === "daily") {
    labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
  } else if (timeFrame === "monthly") {
    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  } else if (timeFrame === "yearly") {
    labels = ["2020", "2021", "2022", "2023", "2024"]
  }

  let chartData = []
  let yAxisLabel = ""
  let chartColor = ""
  
  if (gameType === "wordle") {
    yAxisLabel = "Guesses"
    chartColor = "rgba(34, 197, 94, 0.8)" 
    
    if (timeFrame === "daily") {
      chartData = [4, 3, 5, 3, 4, 2, 3, 4, 5, 3, 4, 3, 2, 4, 3, 4, 5, 3, 4, 3, 2, 4, 3, 4, 5, 3, 4, 3, 2, 4]
    } else if (timeFrame === "monthly") {
      chartData = [3.8, 3.5, 3.7, 3.2, 3.4, 3.6, 3.3, 3.1, 3.0, 3.2, 3.4, 3.3]
    } else {
      chartData = [4.2, 3.9, 3.7, 3.5, 3.3]
    }
  } else {
    yAxisLabel = "Mistakes"
    chartColor = "rgba(99, 102, 241, 0.8)" 
    
    if (timeFrame === "daily") {
      chartData = [3, 2, 4, 1, 2, 0, 3, 2, 1, 2, 3, 1, 0, 2, 1, 3, 2, 1, 0, 2, 3, 1, 2, 0, 1, 2, 3, 1, 2, 0]
    } else if (timeFrame === "monthly") {
      chartData = [2.8, 2.5, 2.3, 2.1, 1.9, 2.0, 1.8, 1.7, 1.5, 1.6, 1.4, 1.3]
    } else {
      chartData = [3.2, 2.8, 2.4, 2.0, 1.7]
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${yAxisLabel}: ${context.parsed.y}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            size: 12,
          }
        },
        ticks: {
          stepSize: 1,
        },
        suggestedMax: gameType === "wordle" ? 6 : 5,
      },
      x: {
        title: {
          display: true,
          text: timeFrame === "daily" ? "Day" : timeFrame === "monthly" ? "Month" : "Year",
          font: {
            size: 12,
          }
        }
      }
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: yAxisLabel,
        data: chartData,
        backgroundColor: chartColor,
        borderColor: chartColor,
        borderWidth: 2,
      },
    ],
  }

  return timeFrame === "daily" ? (
    <Bar options={options} data={data} />
  ) : (
    <Line options={options} data={data} />
  )
}
