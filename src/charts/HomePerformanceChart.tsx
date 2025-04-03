"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface HomePerformanceChartProps {
  gameType?: "wordle" | "connections"
}

export function HomePerformanceChart({ gameType = "wordle" }: HomePerformanceChartProps) {
  // Last 7 days of performance data
  const performanceData = {
    wordle: [4, 3, 5, 3, 2, 4, 3], // Guesses (lower is better)
    connections: [2, 1, 3, 0, 2, 1, 0], // Mistakes (lower is better)
  }

  const data = performanceData[gameType]
  const yAxisLabel = gameType === "wordle" ? "Guesses" : "Mistakes"
  const chartColor =
    gameType === "wordle"
      ? "rgba(34, 197, 94, 1)" // Green for Wordle
      : "rgba(99, 102, 241, 1)" // Indigo for Connections

  const chartBgColor =
    gameType === "wordle"
      ? "rgba(34, 197, 94, 0.1)" // Light green for Wordle
      : "rgba(99, 102, 241, 0.1)" // Light indigo for Connections

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${yAxisLabel}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: gameType === "wordle" ? 6 : 5,
        ticks: {
          stepSize: 1,
          font: {
            size: 10,
          },
        },
        grid: {
          display: true,
       
        },
        display: true, 
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            size: 10,
            weight: "normal",
          },
          padding: {
            bottom: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.3, 
      },
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  }


  const today = new Date()
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - 6 + i)
    return days[date.getDay()]
  })

  const chartData = {
    labels,
    datasets: [
      {
        label: yAxisLabel,
        data: data,
        borderColor: chartColor,
        backgroundColor: chartBgColor,
        fill: true,
        tension: 0.3,
      },
    ],
  }

  return <Line options={options} data={chartData} />
}

