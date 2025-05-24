import React from "react";
import { Chart as ChartJs, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElement 
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/GlobalContext";
import { dateFormat } from "../../utils/dateFormat";
import "./Chart.css";

// Register chart.js components
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    const data = {
        labels: incomes.map((inc) => dateFormat(inc.date)),
        datasets: [
            {
                label: "Income",
                data: incomes.map((income) => income.amount),
                backgroundColor: "rgba(34, 197, 94, 0.3)",
                borderColor: "#22C55E",
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: "#22C55E",
                tension: 0.4,
            },
            {
                label: "Expenses",
                data: expenses.map((expense) => expense.amount),
                backgroundColor: "rgba(239, 68, 68, 0.3)",
                borderColor: "#EF4444",
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: "#EF4444",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#333",
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: {
                    size: 16,
                    weight: "bold",
                },
                bodyFont: {
                    size: 14,
                },
                padding: 12,
                cornerRadius: 6,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#555",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(200, 200, 200, 0.3)",
                },
                ticks: {
                    color: "#555",
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
    );
}

export default Chart;
