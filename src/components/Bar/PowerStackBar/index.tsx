import React from "react";
import ChartBase from "@/components/ChartBase";

interface Props {
  [key: string]: any;
}

const PowerStackBar: React.FC<Props> = (props) => {
  const {
    chartData = {
      categories: ["2025/01", "2025/02", "2025/03", "2025/04", "2025/05"],
      series: [
        {
          name: "类型01",
          data: [35, 24, 48, 28, 45],
        },
        {
          name: "类型02",
          data: [20, 35, 34, 44, 40],
        },
        {
          name: "类型03",
          data: [45, 41, 18, 28, 15],
        },
      ],
    },
    title = false,
    ...restProps
  } = props;

  const option = {
    legend: {
      data: chartData.series.map((item) => item.name),
      top: "1%", // 图例位置保持不变
      left: "center",
      padding: [10, 0, 15, 0], // 专门增加图例下方15px间距
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 25,
      icon: "rect",
    },

    grid: {
      top: "20%", // 增加顶部距离，让图例和图表分离更远
      left: "5%",
      right: "5%",
      bottom: "0%",
      containLabel: true,
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let result = `<div style="background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.2);padding:8px;border-radius:4px;">
          <div style="color:#fff;margin-bottom:6px;">${params[0].axisValue}</div>`;

        params.forEach((param) => {
          result += `<div style="margin-bottom:3px;">
            <span style="display:inline-block;width:10px;height:10px;background:${
              param.color.colorStops ? param.color.colorStops[0].color : param.color
            };margin-right:8px;"></span>
            <span style="color:#fff;">${param.seriesName}: ${param.value}%</span>
          </div>`;
        });

        result += "</div>";
        return result;
      },
    },

    xAxis: {
      type: "category",
      data: chartData.categories,
      axisLabel: {
        color: "#fff",
        fontSize: 11,
        margin: 12,
        rotate: 0,
        interval: 0,
        overflow: "none",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

    yAxis: {
      type: "value",
      max: 100,
      axisLabel: {
        color: "#fff",
        fontSize: 12,

        formatter: "{value}%",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.1)",
          type: "dashed",
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

    series: [
      // 类型01 - 最底下的绿色系
      {
        name: "类型01",
        type: "bar",
        stack: "total",
        barWidth: 30,
        barCategoryGap: "40%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#42FF38",
              },
              {
                offset: 1,
                color: "rgba(76, 255, 45, 0)",
              },
            ],
          },
        },
        label: {
          show: true,
          position: "inside",
          color: "#fff",
          fontSize: 12,
          fontWeight: 400,
          formatter: "{c}%",
        },
        data: chartData.series[0].data,
      },
      // 类型02 - 中间的黄色系
      {
        name: "类型02",
        type: "bar",
        stack: "total",
        barWidth: 30,
        barCategoryGap: "40%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#FCB717",
              },
              {
                offset: 1,
                color: "rgba(255, 251, 45, 0)",
              },
            ],
          },
        },
        label: {
          show: true,
          position: "inside",
          color: "#fff",
          fontSize: 12,
          fontWeight: 400,
          formatter: "{c}%",
        },
        data: chartData.series[1].data,
      },
      // 类型03 - 最顶部的蓝色系
      {
        name: "类型03",
        type: "bar",
        stack: "total",
        barWidth: 30,
        barCategoryGap: "40%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#384CFF",
              },
              {
                offset: 1,
                color: "rgba(45, 129, 255, 0)",
              },
            ],
          },
        },
        label: {
          show: true,
          position: "inside",
          color: "#fff",
          fontSize: 12,
          fontWeight: 400,
          formatter: "{c}%",
        },
        data: chartData.series[2].data,
      },
    ],

    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicOut",
  };

  return <ChartBase title={title} option={option} id="chart_power_stackbar" {...restProps} />;
};

export default PowerStackBar;