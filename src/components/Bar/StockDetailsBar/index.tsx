/*
 * @Author:
 * @Date: 2025-01-18
 * @Description: 带滚动功能的堆叠柱状图组件
 */
import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useState, useEffect } from "react";

// 📊 数据转换函数 - 将后端数据映射为图表数据格式
const transformBackendToChartData = (backendData) => {
  // 商品名称作为X轴数据
  const xdata = backendData.map((item) => item.name);

  // 创建两个系列：库存数量和商品数量
  const result = [
    {
      name: "库存数量",
      data: backendData.map((item) => item.stock),
    },
    {
      name: "商品数量",
      data: backendData.map((item) => item.goods),
    },
  ];

  return { xdata, result };
};

// 🧪 模拟后端数据 - 扩展更多商品用于滚动展示
const mockBackendData = [
  { name: "中长群", stock: 24, goods: 100 },
  { name: "连衣裙", stock: 37, goods: 45 },
  { name: "衬衫", stock: 24, goods: 56 },
  { name: "T恤", stock: 34, goods: 42 },
  { name: "瑜伽裤", stock: 32, goods: 45 },
  { name: "牛仔裤", stock: 28, goods: 38 },
  { name: "西装", stock: 15, goods: 25 },
  { name: "裙子", stock: 42, goods: 67 },
  { name: "外套", stock: 19, goods: 33 },
  { name: "毛衣", stock: 35, goods: 52 },
  { name: "短裤", stock: 41, goods: 48 },
  { name: "背心", stock: 23, goods: 35 },
  { name: "风衣", stock: 17, goods: 29 },
  { name: "马甲", stock: 26, goods: 41 },
  { name: "卫衣", stock: 39, goods: 58 },
];

// 🎨 颜色配置 - 保持原有配色方案
const COLOR_SCHEMES = [
  [
    { offset: 0, color: "#0079FA" },
    { offset: 0.5, color: "#009AFF" },
    { offset: 1, color: "#0079FF" },
  ],
  [
    { offset: 0, color: "#00FD9F" },
    { offset: 0.5, color: "#44FFBA" },
    { offset: 1, color: "#00FD9F" },
  ],
  [
    { offset: 0, color: "#00C2FF" },
    { offset: 0.5, color: "#0EEBFF" },
    { offset: 1, color: "#00C2FF" },
  ],
];

const StockDetailsBar = ({ data = mockBackendData }) => {
  // 📊 转换后端数据为图表数据格式
  const fullDataSource = transformBackendToChartData(data);

  // 🔄 状态管理
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentData, setCurrentData] = useState<{
    xdata: string[];
    result: { name: string; data: number[] }[];
  }>({
    xdata: [],
    result: [],
  });

  // 📊 动态计算显示数量 - 根据数据长度自适应，最多显示7个商品
  const displayCount = Math.min(5, fullDataSource.xdata.length);
  const totalDataLength = fullDataSource.xdata.length;

  // 📈 获取当前页面数据的函数 - 支持商品数据滚动
  const getCurrentPageData = (startIndex) => {
    const currentXData = [];
    const currentResult = fullDataSource.result.map((item) => ({
      name: item.name,
      data: [],
    }));

    for (let i = 0; i < displayCount; i++) {
      const index = (startIndex + i) % totalDataLength;
      currentXData.push(fullDataSource.xdata[index]);

      fullDataSource.result.forEach((item, resultIndex) => {
        currentResult[resultIndex].data.push(item.data[index]);
      });
    }

    return {
      xdata: currentXData,
      result: currentResult,
    };
  };

  // 🔄 初始化数据和自动滚动
  useEffect(() => {
    // 设置初始数据
    const initialData = getCurrentPageData(0);
    setCurrentData(initialData);

    // 设置自动滚动定时器 - 仅在数据足够多时启用滚动
    let interval;

    if (totalDataLength > displayCount) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          const actualNextIndex = nextIndex >= totalDataLength ? 0 : nextIndex;

          // 更新显示数据
          const newData = getCurrentPageData(actualNextIndex);
          setCurrentData(newData);

          return actualNextIndex;
        });
      }, 2500); // 每2.5秒滚动一次
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [totalDataLength, displayCount]); // 依赖数据长度，当数据变化时重新初始化

  // 📊 动态计算堆叠数据 - 用于pictorialBar装饰
  const diamondData =
    currentData.result.length > 0
      ? currentData.result.reduce((pre, cur, index) => {
          pre[index] = cur.data.map((el, id) => el + (pre[index - 1] ? pre[index - 1][id] : 0));
          return pre;
        }, [])
      : [];

  // 📊 动态生成系列配置
  const generateSeries = () => {
    const series = [];

    currentData.result.forEach((item, i) => {
      // 主柱体
      series.push({
        z: i + 1,
        stack: "总量",
        type: "bar",
        name: item.name,
        barGap: "-100%",
        barWidth: 10,
        data: item.data,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 1, 0, COLOR_SCHEMES[i]),
          opacity: 1,
        },
        // 📊 显示数值标签
        label: {
          show: true,
          position: "top", // 在柱子上方显示
          formatter: function (params) {
            // 只显示非零值，避免标签重叠
            return params.value === 0 ? "" : params.value;
          },
          color: "#fff",
          fontSize: 12,
          fontWeight: "bold",
          offset: [0, -1], //
        },
        // 动画配置
        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDelay: 0,
        animationDurationUpdate: 1000,
        animationEasingUpdate: "cubicOut",
      });

      // 顶部装饰圆形
      series.push({
        z: i + 10,
        type: "pictorialBar",
        symbolPosition: "end",
        symbol: "circle",
        symbolOffset: ["50%", 0],
        symbolSize: [7, 10],
        data: diamondData[i] || [],
        itemStyle: {
          color: function (params) {
            if (item.data[params.dataIndex] === 0) {
              return "rgba(0,0,0,0)";
            } else {
              return new echarts.graphic.LinearGradient(0, 1, 1, 0, COLOR_SCHEMES[i]);
            }
          },
        },
        tooltip: { show: false },
        // 动画配置
        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDelay: 0,
        animationDurationUpdate: 1000,
        animationEasingUpdate: "cubicOut",
      });
    });

    return series;
  };

  const option = {
    // 🎨 背景色
    backgroundColor: "transparent",
    // 🎬 动画配置
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDelay: 0,
    animationDurationUpdate: 1000,
    animationEasingUpdate: "cubicOut",

    // 💡 提示框
    tooltip: {
      show: true,
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      textStyle: {
        color: "#fff",
      },
    },

    // 🏷️ 图例
    legend: {
      data: currentData.result.map((item) => item.name),
      textStyle: { fontSize: 14, color: "#fff" },
      itemWidth: 25,
      itemHeight: 15,
      itemGap: 15,
      top: "0%",
      selectedMode: false, // 禁止点击
    },

    // 📐 网格布局
    grid: {
      top: "10%",
      left: "15%",
      right: "3%",
      bottom: "15%",
    },

    // 📊 X轴配置
    xAxis: {
      axisLabel: {
        color: "#fff",
        fontSize: 13,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(255,255,255,0.2)",
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

    // 📊 Y轴配置
    yAxis: [
      {
        inverse: true,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
              {
                offset: 0,
                color: "rgba(255,255,255,0.8)",
              },
              {
                offset: 1,
                color: "rgba(255,255,255,0)",
              },
            ]),
            width: 1,
          },
        },
        axisLabel: {
          fontSize: 16,
          color: "#fff",
        },
        data: currentData.xdata,
      },
    ],

    // 📊 系列数据
    series: generateSeries(),
  };

  return <ChartBase option={option} id="chart_stock_details_bar" />;
};

export default StockDetailsBar;