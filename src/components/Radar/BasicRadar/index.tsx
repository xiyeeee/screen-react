import React from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";

interface Props {
  [key: string]: any;
}

const BasicRadar: React.FC<Props> = (props) => {
  const {
    chartData = {
      indicator: [
        { name: "指标1", max: 100 },
        { name: "指标2", max: 100 },
        { name: "指标3", max: 100 },
        { name: "指标4", max: 100 },
        { name: "指标5", max: 100 },
        { name: "指标6", max: 100 },
      ],
      series: [
        {
          name: "系列1",
          value: [80, 90, 70, 85, 60, 75],
        },
        {
          name: "系列2",
          value: [70, 65, 85, 75, 90, 65],
        },
      ],
    },
    showLegend = true,
    showArea = true,
    showSymbol = true,
    shape = "polygon", // 'polygon' | 'circle'
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
    title = "基础雷达图",
    ...restProps
  } = props;

  const series = chartData.series.map((item, index) => ({
    name: item.name,
    type: "radar",
    symbol: showSymbol ? "circle" : "none",
    symbolSize: 6,
    areaStyle: showArea
      ? {
          opacity: 0.3,
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
    data: [
      {
        value: item.value,
        name: item.name,
      },
    ],
    lineStyle: {
      width: 2,
      color: colorConfig[index % colorConfig.length],
    },
  }));

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
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
    radar: {
      shape: shape,
      indicator: chartData.indicator,
      splitArea: {
        areaStyle: {
          color: ["rgba(255, 255, 255, 0.1)"],
          shadowColor: "rgba(0, 0, 0, 0.2)",
          shadowBlur: 10,
        },
      },
      axisLine: {
        lineStyle: {
          color: "#2867a8",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      name: {
        textStyle: {
          color: "#fff",
        },
      },
    },
    series: series,
    color: colorConfig,
    animationEasing: "elasticOut",
    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
  };

  return <ChartBase title={title} option={option} id="chart_radar" {...restProps} />;
};

export default BasicRadar;


