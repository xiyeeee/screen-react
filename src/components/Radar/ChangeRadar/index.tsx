import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useState, useEffect } from "react";
const mockData = [
  {
    faultName: "敏感异常",
    capacity: 70,
  },
  {
    faultName: "卷布不齐",
    capacity: 50,
  },
  {
    faultName: "成型不均",
    capacity: 60,
  },
  {
    faultName: "卷布沉重",
    capacity: 60,
  },
  {
    faultName: "反复跳动",
    capacity: 50,
  },
  {
    faultName: "转动沉滞",
    capacity: 30,
  },
  {
    faultName: "系统失灵",
    capacity: 40,
  },
  {
    faultName: "计长不准",
    capacity: 50,
  },
  {
    faultName: "运输异常",
    capacity: 60,
  },
  {
    faultName: "运转故障",
    capacity: 70,
  },
  {
    faultName: "气垫失效",
    capacity: 80,
  },
  {
    faultName: "静电干扰",
    capacity: 60,
  },
  {
    faultName: "采光不足",
    capacity: 65,
  },
  {
    faultName: "整机断电",
    capacity: 66,
  },
  {
    faultName: "对边抖动",
    capacity: 75,
  },
  {
    faultName: "变频器失灵",
    capacity: 58,
  },
  {
    faultName: "卷凸凹痕",
    capacity: 63,
  },
  {
    faultName: "布匹窜动",
    capacity: 72,
  },
  {
    faultName: "链条卡滞",
    capacity: 75,
  },
  {
    faultName: "轴承异响",
    capacity: 60,
  },
];
// 数据转换函数
const transformData = (rawData) => {
  if (!rawData || rawData.length === 0) {
    return {
      indicator: [],
      series: [
        {
          name: "",
          value: [],
        },
      ],
    };
  }
  return {
    indicator: rawData.map((item) => ({
      name: item.name,
      max: 100,
    })),
    series: [
      {
        name: "",
        value: rawData.map((item) => item.value),
      },
    ],
  };
};

interface Props {
  [key: string]: any;
}

const ChangeRadar: React.FC<Props> = (props) => {
  const {
    data = mockData.map((item) => ({ name: item.faultName, value: item.capacity })),
    showLegend = false,
    showArea = true,
    showSymbol = true,
    shape = "polygon", // 'polygon' | 'circle'
    colorConfig = ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452"],
    ...restProps
  } = props;

  const itemsPerPage = 7;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentData, setCurrentData] = useState(data?.slice(0, itemsPerPage) || []);

  // 稳定化数据长度，避免频繁重新创建定时器
  const getCurrentPageData = (startIndex) => {
    const actualData = data.slice(startIndex, startIndex + itemsPerPage);
    // 如果数据不足itemsPerPage，补充空数据
    const filledData = [...actualData];
    while (filledData.length < itemsPerPage) {
      filledData.push({
        name: "",
        value: 0,
        isEmpty: true,
      });
    }
    return filledData;
  };
  // 数据内容变化时更新当前显示的数据，但不重新创建定时器
  useEffect(() => {
    if (!data || data.length === 0) return;

    // 更新当前索引对应的数据
    setCurrentData(getCurrentPageData(currentIndex * itemsPerPage));
  }, [currentIndex]);

  // 创建定时器（只在数据长度变化时重新创建）
  useEffect(() => {
    if (data?.length === 0) return;

    // 计算总页数
    const totalPages = Math.ceil(data?.length / itemsPerPage);

    // 重置到第一页
    setCurrentIndex(0);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // 使用页码来计算，而不是具体的数据索引
        const nextIndex = (prevIndex + 1) % totalPages;
        return nextIndex;
      });
    }, 6500);

    // 清理函数：组件卸载或依赖变化时清理 interval
    return () => {
      clearInterval(interval);
    };
  }, [data?.length]);

  // 转换当前显示的数据
  const chartData = transformData(currentData);

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
              color: "#94C2FD",
            },
            {
              offset: 1,
              color: "#5B8FF9",
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
          fontSize: 10,
        },
        padding: [-10, -10, -10, -10], // 上右下左的内边距，减小这个值会让文字更靠近图形
      },
    },
    series: series,
    color: colorConfig,
  };

  return <ChartBase option={option} id="chart_radar" {...restProps} />;
};

export default ChangeRadar;



