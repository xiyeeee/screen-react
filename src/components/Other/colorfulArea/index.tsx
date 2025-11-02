import React from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";
import styles from "./index.less";

const ColorfulArea = () => {
  const dataFormatter = (obj) => {
    const pList = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    ];
    let temp;
    for (let x = 1; x <= 5; x++) {
      let max = 0;
      let sum = 0;
      temp = obj[x];
      for (let i = 0, l = temp.length; i < l; i++) {
        max = Math.max(max, temp[i]);
        sum += temp[i];
        obj[x][i] = {
          name: pList[i],
          value: temp[i],
        };
      }
      obj[x + "max"] = Math.floor(max / 100) * 100;
      obj[x + "sum"] = sum;
    }
    return obj;
  };

  const dataMap = dataFormatter({
    5: [
      96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 85, 85, 85, 85, 85, 85, 98, 54, 50, 54, 54,
      54, 54,
    ],
    4: [
      86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 85, 95, 85, 85, 85, 85, 64, 64, 60, 64, 64,
      64, 64,
    ],
    3: [
      90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 95, 90, 91, 91, 91, 91, 91, 91, 54, 54, 50, 54, 54,
      54, 54,
    ],
    2: [
      76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 95, 95, 95, 95, 95, 95, 54, 54, 50, 54, 54,
      54, 54,
    ],
    1: [
      66, 66, 66, 66, 66, 66, 66, 66, 66, 96, 66, 66, 85, 85, 85, 85, 85, 85, 55, 55, 50, 55, 55,
      55, 55,
    ],
  });

  const itemStyle = {
    barBorderRadius: [15, 0],
    color: "#0084ff",
  };

  const option = {
    baseOption: {
      timeline: {
        axisType: "category",
        autoPlay: true,
        playInterval: 1000,
        data: ["5.1", "5.2", "5.3", "5.4", "5.5"],
        left: 50,
        right: 50,
        top: 5,
        lineStyle: {
          color: "#122e96",
        },
        label: {
          color: "#fff",
        },
        checkpointStyle: {
          color: "#ef8c2f",
          symbolSize: 10,
          borderColor: "rgba(239, 140, 47, 0.5)",
          borderWidth: 5,
        },
        controlStyle: {
          showPlayBtn: false,
          borderColor: "#122e96",
          itemGap: 20,
        },
        itemStyle: {
          borderColor: "#122e96",
          borderWidth: 5,
        },
        emphasis: {
          label: {
            color: "#ef8c2f",
            show: false,
          },
          checkpointStyle: {
            color: "#ef8c2f",
            borderColor: "rgba(239, 140, 47, 0.5)",
            borderWidth: 5,
          },
          controlStyle: {
            borderColor: "#122e96",
          },
          itemStyle: {
            color: "#ef8c2f",
            borderColor: "rgba(239, 140, 47, 0.5)",
            borderWidth: 5,
          },
        },
      },
      calculable: true,
      grid: {
        top: "25%",
        bottom: "12%",
      },
      xAxis: [
        {
          type: "category",
          axisLabel: {
            interval: 5,
          },
          data: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
            24,
          ],
          splitLine: {
            show: false,
          },
          offset: 10,
          axisTick: {
            show: true,
            alignWithLabel: true,
            interval: 5,
            length: 10,
            lineStyle: {
              color: "#59aec8",
              width: 3,
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#2867a8",
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#2867a8",
            },
          },
        },
      ],
      series: [
        {
          name: "多彩轮播面积",
          type: "line",
          markPoint: {
            symbol: "pin",
            symbolSize: 40,
            itemStyle: {
              normal: {
                color: "#ef8c2f",
                shadowColor: "#ef8c2f",
                shadowBlur: 15,
              },
            },
            data: [{ type: "max", name: "最大值" }],
          },
          itemStyle: {
            borderColor: "#1374e7",
            borderWidth: 10,
            shadowBlur: 10,
            shadowColor: "#1374e7",
            opacity: 0,
          },
          label: {
            show: false,
          },
          lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#17418d",
              },
              {
                offset: 1,
                color: "#a56d42",
              },
            ]),
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#1e4b4b",
                },
                {
                  offset: 1,
                  color: "rgba(0, 0, 0, 0)",
                },
              ]),
            },
          },
          smooth: true,
        },
      ],
    },
    options: [
      {
        series: [
          {
            data: dataMap["1"],
            itemStyle: itemStyle,
          },
        ],
      },
      {
        series: [
          {
            data: dataMap["2"],
            itemStyle: itemStyle,
          },
        ],
      },
      {
        series: [
          {
            data: dataMap["3"],
            itemStyle: itemStyle,
          },
        ],
      },
      {
        series: [
          {
            data: dataMap["4"],
            itemStyle: itemStyle,
          },
        ],
      },
      {
        series: [
          {
            data: dataMap["5"],
            itemStyle: itemStyle,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.colorfulAreaContainer}>
      <ChartBase
        title="多彩轮播面积"
        option={option}
        id="chart_cra"
        className={styles.chartContent}
      />
    </div>
  );
};

export default ColorfulArea;

