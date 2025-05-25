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
    // FIXED: Safe destructuring with fallbacks
    const { incomes = [], expenses = [] } = useGlobalContext();
    
    // FIXED: Ensure arrays are safe to use
    const safeIncomes = Array.isArray(incomes) ? incomes : [];
    const safeExpenses = Array.isArray(expenses) ? expenses : [];
    
    // FIXED: Better data handling for empty arrays
    const hasData = safeIncomes.length > 0 || safeExpenses.length > 0;
    
    const data = {
        labels: hasData 
            ? safeIncomes.map((inc) => dateFormat(inc.date))
            : ['No Data'],
        datasets: [
            {
                label: "Income",
                data: hasData 
                    ? safeIncomes.map((income) => Number(income.amount) || 0)
                    : [0],
                backgroundColor: "rgba(34, 197, 94, 0.3)",
                borderColor: "#22C55E",
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: "#22C55E",
                tension: 0.4,
            },
            {
                label: "Expenses",
                data: hasData 
                    ? safeExpenses.map((expense) => Number(expense.amount) || 0)
                    : [0],
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
        maintainAspectRatio: false,
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
                    callback: function(value) {
                        return '₹' + value;
                    }
                },
            },
        },
    };

    return (
        <div className="chart-container" style={{ height: '400px' }}>
            {hasData ? (
                <Line data={data} options={options} />
            ) : (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%',
                    color: '#666',
                    fontSize: '18px'
                }}>
                    No data to display
                </div>
            )}
        </div>
    );
}

export default Chart;
