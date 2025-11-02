import React, { useState } from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";
import styles from "./index.less";

const CircleRunway = () => {
  const [arrData] = useState([
    {
      name: "联盟链",
      number: 725,
      percentage: 41.5,
    },
    {
      name: "私有链",
      number: 460,
      percentage: 30.95,
    },
    {
      name: "公有链",
      number: 382,
      percentage: 22.48,
    },
  ]);

  const itemStyle = {
    normal: {
      color: "#091f45",
    },
  };

  const option = {
    color: ["#0772bb", "#00ffff", "#f48b3b"],
    series: [
      {
        name: "联盟链",
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["86%", "90%"],
        center: ["50%", "50%"],
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 5,
            name: "50%",
            itemStyle: {
              normal: {
                color: "#0772bb",
              },
            },
          },
          {
            value: 5,
            name: "50%",
            itemStyle: itemStyle,
          },
        ],
      },
      {
        name: "私有链",
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["66%", "70%"],
        center: ["50%", "50%"],
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 3,
            name: "50%",
            itemStyle: {
              normal: {
                color: "#00ffff",
              },
            },
          },
          {
            value: 7,
            name: "50%",
            itemStyle: itemStyle,
          },
        ],
      },
      {
        name: "公有链",
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["46%", "50%"],
        center: ["50%", "50%"],
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 2,
            name: "50%",
            itemStyle: {
              normal: {
                color: "#f48b3b",
              },
            },
          },
          {
            value: 8,
            name: "50%",
            itemStyle: itemStyle,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.circleRunwayContainer}>
      <ChartBase
        title="环形跑道图"
        option={option}
        id="chart_run"
        className={styles.chartContent}
      />
      {arrData.map((item, index) => (
        <div key={index} className={`${styles.pdtInfo} ${styles[`info${index}`]}`}>
          <span />
          <span>{item.name}：</span>
          <span>{item.number}</span>
          <span>（{item.percentage}%）</span>
        </div>
      ))}
    </div>
  );
};

export default CircleRunway;


