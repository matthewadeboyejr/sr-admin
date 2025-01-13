"use client";
import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useUserContext } from "@/context/UsersContext";

const SignupComparisonChart = () => {
  const [year, setYear] = useState(2023); // Default year
  const { overviewState } = useUserContext();

  const userGraph = overviewState?.getData?.user_graphy;
  const totalUser = userGraph?.total_user || 0;
  const monthlyData = userGraph?.monthly_data || [];
  const monthList = monthlyData.map((item) => item?.month.slice(0, 3));
  const activeArtisan = monthlyData.map((item) => item?.active_artisans);
  const userArtisan = monthlyData.map((item) => item?.active_user);
  const currentYear = userGraph?.year || 0;

  const options = {
    chart: {
      type: "column",
      backgroundColor: null,
    },

    title: {
      text: `Monthly Active Users for ${currentYear}`,
    },
    xAxis: {
      categories: monthList,
      labels: {
        style: {
          color: "#14ABBC",
          fontSize: "12px",
          fontWeight: "Regular",
        },
      },
    },
    yAxis: {
      title: {
        text: "Number of Signups",
      },
      labels: {
        style: {
          color: "#14ABBC",
          fontSize: "12px",
          fontWeight: "Regular",
        },
      },
    },
    series: [
      {
        name: "Service Users",
        data: userArtisan,
        color: "#012332", // Color for Service Users
      },
      {
        name: "Artisans",
        data: activeArtisan,
        color: "#14ABBC", // Color for Artisans
      },
    ],
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      {/*    <select onChange={handleYearChange} value={year}>
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
      </select> */}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SignupComparisonChart;
