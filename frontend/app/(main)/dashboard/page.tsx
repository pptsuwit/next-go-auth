"use client";
import { useGlobalContext } from "@/contexts/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

import { faker } from "@faker-js/faker";
import { useEffect } from "react";
ChartJS.register(
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Example Chart with Chart.js",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Dataset 3",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 255, 135, 0.5)",
      borderColor: "rgba(53, 255, 135, 0.5)",
    },
  ],
};
export const dataPie = {
  labels: ["Dataset 1", "Dataset 2", "Dataset 3"],
  datasets: [
    {
      label: "# of Votes",
      data: [
        faker.number.int({ min: 0, max: 1000 }),
        faker.number.int({ min: 0, max: 1000 }),
        faker.number.int({ min: 0, max: 1000 }),
      ],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(53, 162, 235, 0.5)",
        "rgba(53, 255, 135, 0.5)",
        // "rgba(255, 99, 132, 0.2)",
        // "rgba(54, 162, 235, 0.2)",
        // "rgba(255, 206, 86, 0.2)",
        // "rgba(75, 192, 192, 0.2)",
        // "rgba(153, 102, 255, 0.2)",
        // "rgba(255, 159, 64, 0.2)",
      ],
      // borderColor: [
      //   "rgba(255, 99, 132, 1)",
      //   "rgba(54, 162, 235, 1)",
      //   "rgba(255, 206, 86, 1)",
      //   "rgba(75, 192, 192, 1)",
      //   "rgba(153, 102, 255, 1)",
      //   "rgba(255, 159, 64, 1)",
      // ],
      borderWidth: 1,
    },
  ],
};
export default function page() {
  const { setTitle } = useGlobalContext();
  useEffect(() => {
    setTitle("Dashboard");
  }, []);

  return (
    <>
      <div className="bg-white border rounded-md shadow-md">
        <div className="p-4 xs:w-full md:w-11/12 grid grid-cols-7 grid-rows-1 gap-5 mx-auto">
          <div className="xs:col-span-full md:col-span-5">
            <Bar options={options} data={data} />
          </div>
          <div className="xs:col-span-full md:col-span-2 md:col-start-6">
            <Pie options={options} data={dataPie} />
          </div>
        </div>
        <div className="p-4 xs:w-full md:w-11/12 mx-auto">
          <Line options={options} data={data} />
        </div>
      </div>
    </>
  );
}
