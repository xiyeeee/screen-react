/*
 * @Author: luomingxi
 * @Date: 2025-06-24 16:02:17
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-06-28 15:20:46
 */
import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useState, useEffect } from "react";

// 🎨 颜色配置 - 提取到外部便于维护和复用
const COLOR_SCHEMES = [
  // 深蓝色渐变
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: "rgba(22, 61, 119, 0.6)" },
    { offset: 1, color: "#163D77" },
  ]),
  // 深红色渐变
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: "rgba(93, 26, 35, 0.6)" },
    { offset: 1, color: "#5D1A23" },
  ]),
  // 绿色渐变
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: "rgba(62, 225, 119, 0.6)" },
    { offset: 1, color: "#3EE177" },
  ]),
  // 棕色渐变
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: "rgba(99, 52, 29, 0.6)" },
    { offset: 1, color: "#63341D" },
  ]),
  // 深青色渐变
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: "rgba(12, 101, 117, 0.6)" },
    { offset: 1, color: "#0C6575" },
  ]),
  // 紫色渐变
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: "rgba(107, 70, 193, 0.6)" },
    { offset: 1, color: "#6B46C1" },
  ]),
  // 橙色渐变
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: "rgba(234, 88, 12, 0.6)" },
    { offset: 1, color: "#EA580C" },
  ]),
];

interface Props {
  [key: string]: any;
}

const HorizontalBarChart: React.FC<Props> = (props) => {
  const { data } = props;
  // 完整的数据源 - 使用更贴近后端API的key-value格式
  const fullData = data.map((item) => ({
    name: item.loomName,
    value: item.production,
  }));

  // 状态管理 - 简化为单一数据源
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [isLoopTransition, setIsLoopTransition] = useState(false);
  const displayCount = 5; // 只显示5条数据

  const getCurrentPageData = (startIndex) => {
    const currentPageData = [];

    for (let i = 0; i < displayCount; i++) {
      const index = (startIndex + i) % fullData.length;
      currentPageData.push(fullData[index]);
    }

    return currentPageData;
  };

  // 初始化数据和自动滚动 - 基于新的数据结构
  useEffect(() => {
    // 设置初始数据
    const initialData = getCurrentPageData(0);
    setChartData(initialData);

    // 设置自动滚动定时器
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // 每次向前移动1个位置，实现平滑滚动
        const nextIndex = prevIndex + 1;
        // 如果超出数据范围，回到开始，确保平滑循环
        const actualNextIndex = nextIndex >= fullData.length ? 0 : nextIndex;

        // 检测是否是循环切换（从最后回到开始）
        const isLooping =
          prevIndex === fullData.length - 1 && actualNextIndex === 0;

        if (isLooping) {
          setIsLoopTransition(true);
          // 缩短状态重置时间，与统一的动画时长匹配
          setTimeout(() => setIsLoopTransition(false), 1000);
        }

        // 更新显示数据
        const newData = getCurrentPageData(actualNextIndex);
        setChartData(newData);

        return actualNextIndex;
      });
    }, 2500); // 缩短间隔，配合统一的动画时长(1000ms)，让滚动更流畅

    return () => {
      clearInterval(interval);
    };
  }, []);

  const option = {
    // 添加动画配置，优化平滑度
    animation: true,
    animationDuration: 1000, // 缩短初始动画时间，与更新动画保持一致
    animationEasing: "cubicOut", // 平滑缓动
    animationDelay: 0, // 去掉延迟，避免视觉卡顿
    animationDurationUpdate: 1000, // 统一动画时长
    animationEasingUpdate: "cubicOut", // 统一缓动函数

    // 添加graphic组件来显示"(米)"标签，保持原来的位置
    graphic: [
      {
        type: "text",
        left: "87%", // 大约在X轴最大刻度的位置
        bottom: "0%", // 在X轴下方
        style: {
          text: "(米)",
          textAlign: "center",
          textVerticalAlign: "middle",
          fontSize: 14,
          fill: "#FFF",
          fontWeight: "bold",
        },
      },
    ],
    grid: {
      top: "30", // 增加顶部边距
      left: "80", // 🎯 固定左边距，为最长标签预留足够空间（包括"织机11"等）
      right: "40",
      bottom: "40", // 增加底部边距
      containLabel: false, // 🔑 禁用自动计算，强制使用固定布局
    },
    tooltip: {
      show: "true",
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        // 坐标轴指示器，坐标轴触发有效
        label: {
          show: true, //显示横坐标文字背景
        },
      },
    },
    xAxis: {
      type: "value",

      boundaryGap: false, //false代表是零刻度开始，设置为true代表离零刻度间隔一段距离
      data: [],
      splitNumber: 0,

      splitLine: {
        show: false,
      }, //去除网格线
      splitArea: {
        show: false,
      }, //保留网格区域
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(33,148,246,0.2)",
        },
      },
      axisLabel: {
        interval: 1, //隔几个显示
        rotate: 0,
        showMaxLabel: true,
        showMinLabel: true,
        textStyle: {
          color: "#FFF",
          fontSize: 14,
        },
      },
    },
    yAxis: [
      {
        type: "category",
        name: "(名称)",
        nameLocation: "end",
        nameGap: 10,
        nameTextStyle: {
          color: "#FFF",
          fontSize: 14,
          padding: [0, 0, 0, -50], // 向左偏移30px
        },
        boundaryGap: true, //false代表是零刻度开始，设置为true代表离零刻度间隔一段距离
        splitLine: {
          show: false,
        }, //去除网格线
        splitArea: {
          show: false,
        }, //保留网格区域
        axisLine: {
          show: true,
          lineStyle: {
            color: "#808492",
            width: 1.2, //这里是为了突出显示加上的
          },
        },
        axisTick: {
          show: true, //显示刻度线
          alignWithLabel: true, //在 boundaryGap: true,时候才可以，使得刻度线跟项目保持一致
        },
        axisLabel: {
          interval: 0, // 强制显示所有标签
          rotate: 0, // 标签旋转角度
          margin: 8, // 标签与轴线的距离

          textStyle: {
            color: "#FFF",
            fontSize: 14,
          },
        },
        axisLine: {
          lineStyle: {
            color: "#808492",
          },
        },
        data: chartData.map((item) => item.name), // 从数据对象中提取名称
      },
    ],
    series: [
      // 1. 主柱体 - 使用标准bar类型获得从0增长的动画效果
      {
        name: "数量",
        type: "bar",
        barWidth: 12,
        itemStyle: {
          color: function (params) {
            // 根据织机名称来选择颜色，确保同一个织机始终是同一种颜色
            const currentCategory = chartData[params.dataIndex]?.name;
            const machineIndex = fullData.findIndex(
              (item) => item.name === currentCategory
            );
            return COLOR_SCHEMES[machineIndex % COLOR_SCHEMES.length];
          },
          borderRadius: [0, 2, 2, 0], // 右侧圆角，模拟斜角效果
          borderColor: "#FFFFFF",
          borderWidth: 1,
        },
        label: {
          show: true,
          position: "right",
          formatter: "{c}",
          color: "#FFF",
          fontSize: 14,
          fontWeight: "bold",
          offset: [8, 0],
        },
        // 关键：调整动画配置，让切换更平滑
        animationDuration: 1000, // 初始动画稍慢
        animationEasing: "cubicOut",
        animationDelay: 0,
        animationDurationUpdate: 1000, // 统一使用1000ms，避免时长差异导致的抖动
        animationEasingUpdate: "cubicOut", // 统一使用平滑缓动，避免elasticOut的弹性效果

        data: chartData.map((item) => item.value), // 从数据对象中提取数值
      },
    ],
  };
  return <ChartBase option={option} id="chart_loom_production" />;
};

export default HorizontalBarChart;


