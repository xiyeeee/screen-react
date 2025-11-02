import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";

const DynamicLine = () => {
  const timerRef = useRef(null);
  const chartRef = useRef(null);
  const [xData, setXData] = useState([]);
  const startDate = useRef(new Date(2019, 0, 1)); // 固定起始日期
  const nowRef = useRef(new Date(2019, 0, 1));
  const valueRef = useRef(500); // 起始值
  const oneDay = 24 * 3600 * 1000;

  // 生成随机数据
  const randomData = () => {
    nowRef.current = new Date(+nowRef.current + oneDay);
    valueRef.current = valueRef.current + Math.random() * 25 - 10;

    // 确保值不会太小
    if (valueRef.current < 100) {
      valueRef.current = 100 + Math.random() * 50;
    }

    return [
      nowRef.current.getTime(), // 使用时间戳作为x轴值
      Math.round(valueRef.current),
    ];
  };

  // 初始化数据
  useEffect(() => {
    // 重置起始日期和值
    nowRef.current = new Date(startDate.current);
    valueRef.current = 500;

    const initialData = [];
    for (let i = 0; i < 365; i++) {
      // 生成一年的数据
      initialData.push(randomData());
    }
    setXData(initialData);
  }, []);

  // 图表配置
  const getOption = (data) => ({
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#283b56",
        },
      },
    },
    grid: {
      top: "10%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    color: ["#e84a5f"],
    xAxis: {
      type: "time",
      boundaryGap: false,
      axisLabel: {
        formatter: function (value) {
          const date = new Date(value);
          return date.getFullYear() + "-" + (date.getMonth() + 1);
        },
        textStyle: {
          color: "#7eb9ff",
        },
      },
      axisLine: {
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
      scale: true,
      name: "比特币（美元）",
      nameTextStyle: {
        color: "#7eb9ff",
      },
      axisLabel: {
        textStyle: {
          color: "#7eb9ff",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#2867a8",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(40, 103, 168, 0.2)",
        },
      },
    },
    series: [
      {
        name: "价格",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 2,
          color: "#e84a5f",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(232, 74, 95, 0.5)",
            },
            {
              offset: 1,
              color: "rgba(232, 74, 95, 0.1)",
            },
          ]),
        },
        data: data,
      },
    ],
  });

  // 定时更新数据
  useEffect(() => {
    if (xData.length === 0) return;

    // 获取图表实例
    const chartDom = document.getElementById("chart_dynamic_line");
    if (!chartDom) return;

    let myChart = echarts.getInstanceByDom(chartDom);
    if (!myChart) {
      myChart = echarts.init(chartDom);
      chartRef.current = myChart;
    } else {
      chartRef.current = myChart;
    }

    // 设置初始数据
    myChart.setOption(getOption(xData));

    // 设置定时器，更新数据
    timerRef.current = setInterval(() => {
      // 生成新数据
      const newPoint = randomData();

      // 更新状态
      setXData((prevData) => {
        const newData = [...prevData, newPoint];
        return newData;
      });

      // 直接更新图表，不等待状态更新
      const currentData = [...xData, newPoint];

      // 更新图表，保持向右延伸
      myChart.setOption({
        series: [
          {
            data: currentData,
          },
        ],
        xAxis: {
          min: "dataMin",
          max: newPoint[0], // 设置最大值为最新数据点的时间
        },
      });
    }, 1000);

    // 组件卸载时清除定时器
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [xData.length]);

  return (
    <ChartBase
      title="动态折线图"
      option={getOption(xData)}
      id="chart_dynamic_line"
      notMerge={true}
    />
  );
};

export default DynamicLine;


