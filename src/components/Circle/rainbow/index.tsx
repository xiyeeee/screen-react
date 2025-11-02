import React, { useState } from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";
import styles from "./index.less";

const Rainbow = () => {
  const [arrData] = useState([
    {
      name: "食品类",
      percent: 73,
    },
    {
      name: "工业类",
      percent: 20,
    },
    {
      name: "医疗类",
      percent: 32,
    },
    {
      name: "政务类",
      percent: 60,
    },
    {
      name: "金融类",
      percent: 14,
    },
  ]);

  const itemStyle = {
    normal: {
      color: "rgba(0, 0, 0, 0)",
    },
  };

  const option = {
    color: ["#125ec1", "#3fa5c0", "#d68639", "#ad5b68", "#6082a5"],
    series: [
      {
        name: "金融类",
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["85%", "90%"],
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
        itemStyle: {
          shadowColor: "#125ec1",
          shadowBlur: 15,
        },
        data: [
          {
            value: 15,
            name: "15%",
            itemStyle: {
              normal: {
                color: "#125ec1",
              },
            },
          },
          {
            value: 85,
            name: "50%",
            itemStyle: itemStyle,
          },
        ],
      },
      {
        name: "政务类",
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["72%", "77%"],
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
        itemStyle: {
          shadowColor: "#3fa5c0",
          shadowBlur: 15,
        },
        data: [
          {
            value: 60,
            name: "60%",
            itemStyle: {
              normal: {
                color: "#3fa5c0",
              },
            },
          },
          {
            value: 40,
            name: "40%",
            itemStyle: itemStyle,
          },
        ],
      },
      {
        name: "医疗类",
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["59%", "64%"],
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
        itemStyle: {
          shadowColor: "#d68639",
          shadowBlur: 15,
        },
        data: [
          {
            value: 32,
            name: "32%",
            itemStyle: {
              normal: {
                color: "#d68639",
              },
            },
          },
          {
            value: 68,
            name: "68%",
            itemStyle: itemStyle,
          },
        ],
      },
      {
        name: "工业类",
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["46%", "51%"],
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
        itemStyle: {
          shadowColor: "#ad5b68",
          shadowBlur: 15,
        },
        data: [
          {
            value: 20,
            name: "20%",
            itemStyle: {
              normal: {
                color: "#ad5b68",
              },
            },
          },
          {
            value: 80,
            name: "80%",
            itemStyle: itemStyle,
          },
        ],
      },
      {
        name: "食品类",
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["33%", "38%"],
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
        itemStyle: {
          shadowColor: "#6082a5",
          shadowBlur: 15,
        },
        data: [
          {
            value: 73,
            name: "73%",
            itemStyle: {
              normal: {
                color: "#6082a5",
              },
            },
          },
          {
            value: 27,
            name: "27%",
            itemStyle: itemStyle,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.rainbowContainer}>
      <ChartBase title="彩虹轨道" option={option} id="chart_rbt" className={styles.chartContent} />

      {arrData.map((item, index) => (
        <div key={index} className={`${styles.preinfo} ${styles[`preinfo${index}`]}`}>
          <span>{item.percent}%</span>
          <span>{item.name}</span>
        </div>
      ))}

      {arrData.map((v, i) => (
        <div key={`pre${i}`} className={`${styles.preinfos} ${styles[`pre${i}`]}`}>
          <span />
          <span />
        </div>
      ))}
    </div>
  );
};

export default Rainbow;


