"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateDates = () => {
  const dates = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(`${i}`);
  }
  return dates;
};

const generateRandomData = (max) => {
  return generateDates().map(() => Math.floor(Math.random() * max));
};

export default function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("customers");
  const chartRef = useRef(null);
  const dates = generateDates();

  const createGradient = (context, color1, color2) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) return null;

    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const customersData = {
    labels: dates,
    datasets: [
      {
        label: "Daily Customers",
        data: generateRandomData(300),
        backgroundColor: function(context) {
          return createGradient(
            context,
            'hsla(221, 83%, 53%, 0.2)',
            'hsla(221, 83%, 53%, 0.8)'
          );
        },
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const revenueData = {
    labels: dates,
    datasets: [
      {
        label: "Daily Revenue",
        data: generateRandomData(40000),
        backgroundColor: function(context) {
          return createGradient(
            context,
            'hsla(334, 86%, 48%, 0.2)',
            'hsla(334, 86%, 48%, 0.8)'
          );
        },
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#666',
        bodyFont: {
          size: 12,
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          color: "#666",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          color: "#666",
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Monthly Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-4">
            <TabsTrigger value="customers">Customer Visits</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          <div className="h-[400px] mt-4">
            <TabsContent value="customers" className="h-full">
              <Bar ref={chartRef} data={customersData} options={options} />
            </TabsContent>
            <TabsContent value="revenue" className="h-full">
              <Bar ref={chartRef} data={revenueData} options={options} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}