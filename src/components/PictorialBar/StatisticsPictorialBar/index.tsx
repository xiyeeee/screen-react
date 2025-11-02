import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useState, useEffect } from "react";
const mockData = [
  {
    name: "织机1",
    value: 38,
  },
  {
    name: "织机2",
    value: 15,
  },
  {
    name: "织机3",
    value: 27,
  },
  {
    name: "织机4",
    value: 49,
  },
  {
    name: "织机5",
    value: 22,
  },
  {
    name: "织机6",
    value: 33,
  },
  {
    name: "织机7",
    value: 11,
  },
  {
    name: "织机8",
    value: 45,
  },
  {
    name: "织机9",
    value: 29,
  },
  {
    name: "织机10",
    value: 17,
  },
  {
    name: "织机11",
    value: 36,
  },
];
interface Props {
  [key: string]: any;
}

const StatisticsPictorialBar: React.FC<Props> = (props) => {
  const {
    data = mockData,
    displayCount = 5,
    showLegend = true,
    colorConfig = ["#1890ff"],
    ...restProps
  } = props;

  // 状态管理 - 添加滚动相关状态
  const [currentIndex, setCurrentIndex] = useState(0);
  const getCurrentPageData = (startIndex) => {
    const currentPageData = [];
    for (let i = 0; i < displayCount; i++) {
      const index = (startIndex + i) % data.length;
      currentPageData.push(data[index]);
    }
    return currentPageData;
  };

  // 初始化数据和自动滚动
  useEffect(() => {
    if (data && data.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % data.length;
          return nextIndex;
        });
      }, 3000); // 3秒切换一次

      return () => {
        clearInterval(interval);
      };
    }
  }, [data]);

  // 获取当前显示的数据
  const chartData = getCurrentPageData(currentIndex);

  // 直接定义option，不使用useState
  const option = {
    // 添加动画配置，优化平滑度
    animation: true,
    animationDuration: 1500, // 增加动画时间，让效果更明显
    animationEasing: "cubicOut", // 平滑缓动
    animationDelay: 0, // 去掉延迟，避免视觉卡顿
    animationDurationUpdate: 1000, // 统一动画时长
    animationEasingUpdate: "cubicOut", // 统一缓动函数

    backgroundColor: "transparent",
    // 添加graphic组件来显示"(米/小时)"标签
    graphic: [
      {
        type: "text",
        left: "0%", // 居中显示
        top: "0%", // 在顶部
        style: {
          text: "(米/小时)",
          textAlign: "center",
          textVerticalAlign: "middle",
          fontSize: 10,
          fill: "#FFF",
          fontWeight: "bold",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        return params[0].name + ": " + params[0].value;
      },
    },
    legend: {
      show: false,
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
      data: chartData.map((item) => item.name),
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#FFF",
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        color: "#fff",
      },
    },
    series: [
      {
        name: "",
        type: "pictorialBar",
        barWidth: "120%",
        symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#159Aff" },
            { offset: 0.5, color: "#159Aff" },
            { offset: 1, color: "#003Aff" },
          ]),
        },
        label: {
          show: true,
          position: "top",
          color: "#fff",
          fontSize: 12,
        },
        emphasis: {
          itemStyle: {
            opacity: 0.8,
          },
        },
        // 关键：调整动画配置，让切换更平滑
        animationDuration: 1000, // 初始动画稍慢
        animationEasing: "cubicOut",
        animationDelay: 0,
        animationDurationUpdate: 1000, // 统一使用1000ms，避免时长差异导致的抖动
        animationEasingUpdate: "cubicOut", // 统一使用平滑缓动，避免elasticOut的弹性效果
        data: chartData.map((item) => item.value),
      },
    ],
    color: colorConfig,
  };

  return <ChartBase option={option} id="chart_statistics_pictorial" {...restProps} />;
};

export default StatisticsPictorialBar;



