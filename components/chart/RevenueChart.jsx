"use client";

import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useUserContext } from "@/context/UsersContext";

const RevenueChart = () => {
  const { overviewState } = useUserContext();

  const revenueGraph = overviewState?.getData?.revenue_graph;
  const total = revenueGraph?.total || 0;
  const currentYear = revenueGraph?.year || 0;
  const monthlyPayment = revenueGraph?.monthly_payments || [];
  const yearlySummary = revenueGraph?.yearly_summary || 0;
  const totalPayments = yearlySummary?.total_payments || 0;
  const totalTransactions = yearlySummary?.total_transactions || 0;
  const months = revenueGraph?.monthly_payments?.month;
  const transactionCount = revenueGraph?.monthly_payments?.transaction_count;

  const monthList = monthlyPayment.map((item) => item?.month.slice(0, 3));
  const monthlyRev = monthlyPayment.map((item) => item?.total_amount);

  const options = {
    title: {
      text: `Monthly Revenue for ${currentYear}`,
    },
    chart: {
      backgroundColor: null,
    },

    xAxis: {
      categories: monthList,
      labels: {
        style: {
          color: "#14ABBC", // Change the color of the category labels
          fontSize: "12px", // Change the font size
          fontWeight: "Regular", // Change the font weight
        },
      },
    },
    yAxis: {
      title: {
        text: "Revenue (£)",
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
        name: "Revenue",
        data: monthlyRev || [],
        color: "#14ABBC",
      },
    ],
  };

  return (
    <div>
      {/*   <select onChange={handleYearChange} value={year}>
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
      </select> */}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default RevenueChart;
