// src/components/PredictionChart.js
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register all necessary components from Chart.js
ChartJS.register(...registerables);

const PredictionChart = ({ predictions }) => {
  const chartRef = useRef(null);

  // Prepare the data for the chart
  const data = {
    labels: predictions.length > 0 ? predictions.map(pred => pred.courseCode || `Course ${pred.index + 1}`) : [],
    datasets: [
      {
        label: 'Predicted Enrollment',
        data: predictions.length > 0 ? predictions.map(pred => pred.predictedEnrollment || 0) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Predicted Sections',
        data: predictions.length > 0 ? predictions.map(pred => pred.predictedSections || 0) : [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Cleanup function to destroy the chart instance if necessary
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Ensure the chart instance is destroyed
        chartRef.current = null; // Reset the ref to avoid referencing a destroyed instance
      }
    };
  }, []);

  return (
    <div>
      <h3>Predictions</h3>
      {predictions.length > 0 ? (
        <Bar ref={chartRef} data={data} options={options} />
      ) : (
        <p>No predictions available to display.</p>
      )}
    </div>
  );
};

export default PredictionChart;