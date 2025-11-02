import React from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";
import styles from "./index.less";

const CircleNesting = () => {
  const option = {
    color: ["#5d8ef8", "#638bfd", "#1dd1c1"],
    series: [
      {
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["68%", "70%"],
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
            value: 10,
            name: "100%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1,
                    color: "#628cfd",
                  },
                  {
                    offset: 0,
                    color: "#20cdc4",
                  },
                ]),
              },
            },
          },
        ],
      },
      {
        type: "pie",
        clockWise: false,
        startAngle: 90,
        hoverAnimation: false,
        radius: ["53%", "56%"],
        center: ["50%", "50%"],
        label: {
          normal: {
            show: true,
            fontSize: 16,
            lineHeight: 22,
            formatter: (param) => {
              return param.name + "\n" + param.value + "%";
            },
          },
        },
        labelLine: {
          smooth: true,
          normal: {
            show: true,
            length: 20,
            length2: 20,
            lineStyle: {
              type: "dotted",
            },
          },
        },
        data: [
          {
            value: 64,
            name: "交易比",
            itemStyle: {
              normal: {
                color: "#638bfd",
              },
            },
          },
          {
            value: 36,
            name: "",
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          },
        ],
      },
      {
        type: "pie",
        clockWise: false,
        startAngle: 0,
        hoverAnimation: false,
        radius: ["43%", "46%"],
        center: ["50%", "50%"],
        label: {
          normal: {
            show: true,
            fontSize: 16,
            lineHeight: 22,
            formatter: (param) => {
              return param.name + "\n" + param.value + "%";
            },
          },
        },
        labelLine: {
          smooth: true,
          normal: {
            show: true,
            length: 20,
            length2: 50,
            lineStyle: {
              type: "dotted",
            },
          },
        },
        data: [
          {
            value: 36,
            name: "通道比",
            itemStyle: {
              normal: {
                color: "#1dd1c1",
              },
            },
          },
          {
            value: 64,
            name: "",
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.circleNestingContainer}>
      <ChartBase
        title="圆环套圆环"
        option={option}
        id="chart_circle"
        className={styles.chartContent}
      />
      <div className={styles.svgDom}>
        <svg
          width="100%"
          height="100%"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            id="svg_2"
            d="m117,210c0,-51.65746 41.61878,-93.5 93,-93.5c51.38122,0 93,41.84254 93,93.5c0,51.65746 -41.61878,93.5 -93,93.5c-51.38122,0 -93,-41.84254 -93,-93.5z"
            stroke="#bfbfbf"
            fill="none"
            strokeDasharray="3,3"
            xmlns="http://www.w3.org/2000/svg"
          />
          <path
            id="svg_3"
            d="m134,210c0,-41.71271 34.01105,-75.5 76,-75.5c41.98895,0 76,33.78729 76,75.5c0,41.71271 -34.01105,75.5 -76,75.5c-41.98895,0 -76,-33.78729 -76,-75.5z"
            stroke="#bfbfbf"
            fill="none"
            strokeDasharray="3,3"
            xmlns="http://www.w3.org/2000/svg"
          />
        </svg>
      </div>
      <div className={`${styles.cirArrow} ${styles.cirArrow1}`} />
      <div className={`${styles.cirArrow} ${styles.cirArrow2}`} />
    </div>
  );
};

export default CircleNesting;

