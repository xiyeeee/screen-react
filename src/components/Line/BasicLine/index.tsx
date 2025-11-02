import React, { useState } from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";

interface Props {
  [key: string]: any;
}

const BasicLine: React.FC<Props> = (props) => {
  const {
    chartData = {
      xAxis: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      series: [
        {
          name: "系列1",
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
          smooth: true,
        },
        {
          name: "系列2",
          data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149],
          smooth: false,
        },
      ],
    },
    showLegend = true,
    showArea = true,
    showSymbol = true,
    colorConfig = [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
    title = "基础折线图",
    ...restProps
  } = props;

  // 直接定义option，不使用useState
  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: chartData.series.map((item) => item.name),
      show: showLegend,
      right: 10,
      top: 10,
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chartData.xAxis,
      axisLine: {
        lineStyle: {
          color: "#2867a8",
        },
      },
      axisLabel: {
        color: "#fff",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#fff",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    series: chartData.series.map((item, index) => ({
      name: item.name,
      type: "line",
      stack: item.stack || "",
      smooth: item.smooth !== undefined ? item.smooth : true,
      symbol: showSymbol ? "emptyCircle" : "none",
      symbolSize: 6,
      areaStyle: showArea
        ? {
            opacity: 0.2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorConfig[index % colorConfig.length],
              },
              {
                offset: 1,
                color: "rgba(0, 0, 0, 0)",
              },
            ]),
          }
        : null,
      data: item.data,
      lineStyle: {
        width: 2,
        color: colorConfig[index % colorConfig.length],
      },
      emphasis: {
        focus: "series",
      },
      animationDelay: function (idx) {
        return idx * 100;
      },
    })),
    color: colorConfig,
    animationEasing: "elasticOut",
    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
  };

  return <ChartBase title={title} option={option} id="chart_line" {...restProps} />;
};

export default BasicLine;



