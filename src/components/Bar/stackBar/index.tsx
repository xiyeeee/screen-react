import ChartBase from "@/components/ChartBase";
import React from "react";

// 类型定义
interface SeriesItem {
  name: string;
  data: number[];
}

interface ChartData {
  categories: string[];
  series: SeriesItem[];
}

interface ColorStop {
  offset: number;
  color: string;
}

interface ColorConfig {
  type: string;
  x: number;
  y: number;
  x2: number;
  y2: number;
  colorStops: ColorStop[];
}

interface StackBarProps {
  chartData?: ChartData;
  colorConfig?: ColorConfig[];
  title?: string;
  [key: string]: any;
}

const StackBar: React.FC<StackBarProps> = (props) => {
  const {
    chartData = {
      categories: ["印刷机", "烫金机", "分切机", "复卷机", "打孔机"],
      series: [
        {
          name: "线路停运",
          data: [2, 3, 2, 2, 1],
        },
        {
          name: "支线停运",
          data: [0, 0, 1, 1, 1],
        },
        {
          name: "线段停运",
          data: [0, 0, 0, 1, 1],
        },
      ],
    },
    colorConfig = [
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(61, 137, 247, 1)",
          },
          {
            offset: 1,
            color: "rgba(61, 137, 247, 0)",
          },
        ],
      },
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(70, 170, 165, 1)",
          },
          {
            offset: 1,
            color: "rgba(70, 170, 165, 0)",
          },
        ],
      },
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(154, 142, 130, 1)",
          },
          {
            offset: 1,
            color: "rgba(154, 142, 130, 0)",
          },
        ],
      },
    ],
    title = "堆叠柱状图",
    ...restProps
  } = props;

  const option: echarts.EChartsOption = {
    legend: {
      x: "center",
      textStyle: {
        color: "white",
        fontSize: 14,
      },
      top: 12,
      itemWidth: 20,
      itemHeight: 10,
      itemGap: 20,
    },
    color: [
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(25, 205, 255, 1)",
          },
          {
            offset: 1,
            color: "rgba(25, 205, 255, 0.35)",
          },
        ],
      },
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(66, 255, 185, 1)",
          },
          {
            offset: 1,
            color: "rgba(66, 255, 185, 0.35)",
          },
        ],
      },
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(255, 210, 0, 1)",
          },
          {
            offset: 1,
            color: "rgba(255, 210, 0, 0.35)",
          },
        ],
      },
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(255, 90, 0, 1)",
          },
          {
            offset: 1,
            color: "rgba(255, 90, 0, 0.35)",
          },
        ],
      },
    ],
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        color: "rgba(255, 255, 255, 1)",
      },
      backgroundColor: "rgba(0,0,0,0.8)",
      borderColor: "rgba(219, 230, 255, 0.8)",
    },
    xAxis: {
      data: chartData.categories,
      axisLabel: {
        color: "#A9AEB2", //单位值的颜色
      },
      axisLine: {
        lineStyle: {
          color: "#A9AEB2", //轴线和单位颜色
        },
      },
      axisTick: {
        //刻度颜色
        show: false,
        lineStyle: {
          color: "#A9AEB2",
        },
      },
    },
    yAxis: [
      {
        name: "(条)",
        type: "value",
        position: "left",
        gridIndex: 0,
        nameTextStyle: {
          color: "#fff",
          fontSize: "12px",
          padding: [0, 30, 0, 0],
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(8, 50, 90)", //左侧显示线
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#fff",
          fontSize: 12,
        },
      },
      {
        //右边
        name: "(户)",
        nameTextStyle: {
          color: "#fff",
          padding: [0, 0, 0, 40],
        },
        type: "value",
        position: "right",
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
        axisTick: {
          show: false,
        },
        min: 0,
        max: 100,
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
          show: true,
          interval: "auto",
        },
        show: true,
        splitLine: {
          //网格线
          show: false,
        },
      },
    ],
    series: chartData.series.map((item, index) => ({
      name: item.name,
      type: "bar",
      stack: "total",
      label: {
        show: false,
        color: "#FFFFFF",
      formatter: function (e: any) {
        // return e.value ? e.value : "";
        // return e.value ? e.seriesName : "";
      },
      },
      itemStyle: {
        borderRadius: [0, 0, 0, 0],
        color: colorConfig[index % colorConfig.length],
      },
      barWidth: 20,
      emphasis: {
        focus: "series",
      },
      data: item.data,
    })),
  };

  return <ChartBase title={title} option={option} id="chart_stackbar" {...restProps} />;
};

export default StackBar;
