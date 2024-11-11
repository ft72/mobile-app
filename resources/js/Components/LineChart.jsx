import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Filler,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler);

export default function LineChart({ title, subtitle, data, labels, totalCount }) {
    // Gradient setup function
    const chartGradient = (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) return;

        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(54, 162, 235, 0.5)");
        gradient.addColorStop(1, "rgba(54, 162, 235, 0)");
        return gradient;
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: title,
                data,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: chartGradient,
                borderWidth: 2,
                tension: 0.4, // Smooth curve
                pointRadius: 0,
                pointHitRadius: 15,
                pointHoverRadius: 8,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: (tooltipItems) => {
                        const index = tooltipItems[0].dataIndex;
                        const date = labels[index];
                        return date;
                    },
                    label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
                },
                backgroundColor: "rgba(30, 30, 30, 0.8)",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                padding: 10,
                cornerRadius: 4,
            },
        },
        scales: { x: { display: false }, y: { display: false } },
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden lg:w-96 ">
            <div className="flex justify-between items-center p-4">
                <div>
                    <p className="text-lg font-bold text-gray-700 leading-[16px]">{title}</p>
                    <span className="text-sm text-gray-500">{subtitle}</span>
                </div>
                <p className="text-2xl font-bold text-gray-700">{totalCount}</p>
            </div>
            <div className="h-32 pb-4">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}
