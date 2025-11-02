import React, { useState } from "react";
import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";

interface Props {
  [key: string]: any;
}

const TrendLeftLine: React.FC<Props> = (props) => {
  const { data } = props;
  const {
    chartData = data,
    showLegend = true,
    showArea = true,
    showSymbol = true,
    colorConfig = [
      "#5470c6",
      "#3ba272",
      "#9a60b4",
      "#ee6666",
      "#73c0de",
      "#fc8452",
      "#ea7ccc",
      "#fac858",
      "#91cc75",
    ],
    title = "基础折线图",
    ...restProps
  } = props;

  // 计算横坐标显示策略的函数
  const calculateXAxisDisplay = (dataLength) => {
    if (dataLength <= 4) {
      return {
        interval: 0, // 显示全部
        formatter: null,
        splitLineFormatter: null,
      };
    }

    // 获取要显示的索引数组
    const getShowIndexes = (dataLength) => {
      if (dataLength === 5) {
        return [0, 2, 4];
      } else if (dataLength === 6) {
        return [1, 3, 5];
      } else if (dataLength === 7) {
        return [0, 2, 4, 6];
      } else if (dataLength === 8) {
        return [1, 3, 5, 7];
      } else if (dataLength === 9) {
        return [2, 5, 8];
      } else if (dataLength >= 10) {
        return [2, 5, 8, 11];
      } else {
        return [1, 3, 5];
      }
    };

    const showIndexes = getShowIndexes(dataLength);

    // 自定义显示逻辑，最多显示4个标签
    return {
      interval: 0,
      formatter: function (value, index) {
        return showIndexes.includes(index) ? value : "";
      },
      splitLineFormatter: function (value, index) {
        return showIndexes.includes(index);
      },
    };
  };

  // 计算实际显示的横坐标数据长度
  const actualDataLength: React.FC = () => {
    const arr = chartData.series.map((item) => item.data.length);
    if (Math.max(...arr) >= 10) {
      return 12;
    }
    return Math.max(...arr);
  };

  // 根据数据长度截取横坐标
  const actualXAxisData = chartData.xAxis.slice(0, actualDataLength());
  const xAxisDisplayConfig = calculateXAxisDisplay(actualDataLength());

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
      right: 35,
      top: 10,
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: "2%",
      right: "8%",
      bottom: "0%",
      top: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: actualXAxisData,
      axisLine: {
        lineStyle: {
          color: "#2867a8",
        },
      },
      axisLabel: {
        color: "#fff",
        interval: xAxisDisplayConfig.interval,
        formatter: xAxisDisplayConfig.formatter,
        margin: 12,
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        length: 6,
        lineStyle: {
          color: "#2867a8",
        },
      },
      splitLine: {
        show: false,
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
    series: [
      // 添加专门用于显示分割线的隐藏series
      {
        name: "splitLines",
        type: "line",
        data: new Array(actualXAxisData.length).fill(null),
        lineStyle: { opacity: 0 },
        symbol: "none",
        markLine: {
          silent: true,
          symbol: "none",
          label: { show: false },
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, 0.2)",
            width: 1,
          },
          data: (() => {
            // 获取要显示虚线的索引
            const getShowIndexes = (dataLength) => {
              if (dataLength === 5) {
                return [0, 2, 4];
              } else if (dataLength === 6) {
                return [1, 3, 5];
              } else if (dataLength === 7) {
                return [0, 2, 4, 6];
              } else if (dataLength === 8) {
                return [1, 3, 5, 7];
              } else if (dataLength === 9) {
                return [2, 5, 8];
              } else if (dataLength >= 10) {
                return [2, 5, 8, 11];
              } else {
                return [1, 3, 5];
              }
            };

            const showIndexes = getShowIndexes(actualDataLength());
            return showIndexes
              .filter((index) => index < actualXAxisData.length)
              .map((index) => ({ xAxis: index }));
          })(),
        },
      },
      // 原有的数据series
      ...chartData.series.map((item, index) => ({
        name: item.name,
        type: "line",
        stack: item.stack || "",
        smooth: item.smooth !== undefined ? item.smooth : true,
        symbol: showSymbol ? "emptyCircle" : "none",
        symbolSize: 6,
        // 🎯 设置点的颜色与线条颜色保持一致
        itemStyle: {
          color: colorConfig[index % colorConfig.length],
          borderColor: colorConfig[index % colorConfig.length],
          borderWidth: 2,
        },
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
          // 🎯 悬浮时的点样式
          itemStyle: {
            color: colorConfig[index % colorConfig.length],
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: colorConfig[index % colorConfig.length],
            shadowBlur: 10,
          },
        },
        animationDelay: function (idx) {
          return idx * 100;
        },
      })),
    ],
    color: colorConfig,
    animationEasing: "elasticOut",
    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
  };

  return (
    <ChartBase
      title={title}
      option={option}
      id="chart_trend_line"
      {...restProps}
    />
  );
};

export default TrendLeftLine;



