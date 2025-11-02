import React from "react";
import * as echarts from "echarts";
import "echarts-liquidfill";
import ChartBase from "@/components/ChartBase";

const WaterPolo = () => {
  const option = {
    backgroundColor: "transparent",
    series: [
      {
        type: "liquidFill",
        data: [0.45, 0.4, 0.35],
        radius: "70%",
        color: ["rgba(0, 185, 245, 0.8)", "rgba(0, 185, 245, 0.5)", "rgba(0, 185, 245, 0.3)"],
        backgroundStyle: {
          color: "rgba(0, 0, 0, 0.5)",
          borderColor: "#007bff",
          borderWidth: 3,
          shadowColor: "rgba(0, 123, 225, 0.4)",
          shadowBlur: 20,
        },
        outline: {
          show: false,
        },
        label: {
          color: "#fff",
          insideColor: "#fff",
          fontSize: 30,
          fontWeight: "bold",
          formatter: function (param) {
            return Math.floor(param.value * 100) + "%";
          },
        },
        itemStyle: {
          opacity: 0.95,
          shadowBlur: 50,
          shadowColor: "rgba(0, 0, 0, 0.4)",
        },
        emphasis: {
          itemStyle: {
            opacity: 0.8,
          },
        },
        amplitude: 20,
        waveAnimation: true,
        animationDuration: 2000,
        animationDurationUpdate: 1000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      },
    ],
  };

  return <ChartBase title="水球图" option={option} id="chart_polo" />;
};

export default WaterPolo;

