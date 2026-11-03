import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';

// Register only what a line chart needs (keeps the bundle small).
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

// Colours come from the Tailwind theme tokens in index.css, with fallbacks.
const token = (name, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

const dataset = (label, data, color) => ({
  label,
  data,
  borderColor: color,
  backgroundColor: color,
  borderWidth: 2,
  tension: 0.4,
  pointRadius: 5,
  pointHoverRadius: 6,
  pointBorderWidth: 0,
});

/** @param {{series: {labels: string[], systolic: number[], diastolic: number[]}}} props */
export default function BloodPressureChart({ series }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const text = token('--color-navy', '#072635');
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: series.labels,
        datasets: [
          dataset('Systolic', series.systolic, token('--color-systolic', '#e66fd2')),
          dataset('Diastolic', series.diastolic, token('--color-diastolic', '#8c6fe6')),
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 8, right: 4 } },
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: text, font: { size: 12 }, padding: 8 },
          },
          y: {
            suggestedMin: 60,
            suggestedMax: 180,
            ticks: { stepSize: 20, color: text, font: { size: 12 }, padding: 12 },
            grid: { color: token('--color-divider', '#e0ddea'), drawTicks: false },
            border: { display: false },
          },
        },
        font: { family: "'Manrope Variable', Manrope, sans-serif" },
      },
    });
    return () => chart.destroy(); // runs when the patient changes and on unmount
  }, [series]);

  const description =
    `Blood pressure, last ${series.labels.length} months: ` +
    series.labels.map((l, i) => `${l} ${series.systolic[i]} over ${series.diastolic[i]}`).join('; ');

  return <canvas ref={canvasRef} role="img" aria-label={description} />;
}
