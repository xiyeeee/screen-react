import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";

// 类型定义
interface SzBarProps {
  [key: string]: any;
}

interface CoordData {
  coord: [number, number];
}

const SzBar: React.FC<SzBarProps> = () => {
  const xAxisData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const yData1: number[] = [9, 12, 15, 18, 15, 12, 9, 12, 15, 18, 15, 12];
  const yData2: number[] = [-9, -12, -15, -18, -15, -12, -9, -12, -15, -18, -15, -12];

  const barWidth: string = "10%";
  const dataCoord: CoordData[] = [
    { coord: [0, 9] },
    { coord: [1, 12] },
    { coord: [2, 15] },
    { coord: [3, 18] },
    { coord: [4, 15] },
    { coord: [5, 12] },
    { coord: [6, 9] },
    { coord: [7, 12] },
    { coord: [8, 15] },
    { coord: [9, 18] },
    { coord: [10, 15] },
    { coord: [11, 12] },
  ];
  const dataCoord2: CoordData[] = [
    { coord: [0, -9] },
    { coord: [1, -12] },
    { coord: [2, -15] },
    { coord: [3, -18] },
    { coord: [4, -15] },
    { coord: [5, -12] },
    { coord: [6, -9] },
    { coord: [7, -12] },
    { coord: [8, -15] },
    { coord: [9, -18] },
    { coord: [10, -15] },
    { coord: [11, -12] },
  ];

  const option: echarts.EChartsOption = {
    backgroundColor: "transparent",
    xAxis: {
      data: xAxisData,
      axisLabel: {
        color: "#999",
        formatter: "{value} 月",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(40, 103, 168, 0.3)",
        },
      },
    },
    yAxis: {
      axisLabel: {
        color: "#999",
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(40, 103, 168, 0.3)",
        },
      },
    },
    grid: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true,
    },
    series: [
      {
        name: "正值柱状图",
        type: "bar",
        stack: "one",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: "rgba(0, 0, 0, 0)",
            },
            {
              offset: 0.5,
              color: "#466e71",
            },
            {
              offset: 0,
              color: "#eb9b44",
            },
          ]),
        },
        barWidth: barWidth,
        markPoint: {
          symbol: "circle",
          itemStyle: {
            color: "#eb9b44",
            shadowColor: "#eb9b44",
            shadowBlur: 20,
          },
          symbolSize: [10, 10], // 容器大小
          symbolOffset: [0, 0], // 位置偏移
          data: dataCoord as any,
        },
        data: yData1,
        animationDelay: function (idx: number) {
          return idx * 50;
        },
      },
      {
        name: "负值柱状图",
        type: "bar",
        stack: "one",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(0, 0, 0, 0)",
            },
            {
              offset: 0.5,
              color: "#774a75",
            },
            {
              offset: 1,
              color: "#b34d69",
            },
          ]),
        },
        barWidth: barWidth,
        markPoint: {
          symbol: "circle",
          itemStyle: {
            color: "#b34d69",
            shadowColor: "#b34d69",
            shadowBlur: 20,
          },
          symbolSize: [10, 10],
          symbolOffset: [0, 0],
          data: dataCoord2,
        },
        data: yData2,
        animationDelay: function (idx) {
          return idx * 50 + 100;
        },
      },
    ],
    animationEasing: "elasticOut",
    animationDelayUpdate: function (idx: number) {
      return idx * 5;
    },
  };

  return <ChartBase title="双轴柱状图" option={option} id="chart_szbar" />;
};

export default SzBar;
