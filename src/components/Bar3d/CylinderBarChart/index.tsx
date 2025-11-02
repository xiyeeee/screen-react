import ChartBase from "@/components/ChartBase";
import React, { useEffect } from "react";
import footerBg from "./assets/footerBg.png";
import styles from "./index.module.less";
interface Props {
  [key: string]: any;
}

const CylinderBarChart: React.FC<Props> = (props) => {
  // 添加更多调试信息
  useEffect(() => {
    return () => {};
  }, []);

  // 基础数据
  const chartData = [
    { name: "落管异常", value: 82 },
    { name: "测量异常", value: 65 },
    { name: "气压不足", value: 45 },
    { name: "里程异常", value: 78 },
    { name: "外接异常", value: 56 },
  ];

  const chartNames = chartData.map((item) => item.name);
  const chartValues = chartData.map((item) => item.value);

  const barWidth = 30;

  // 新的渐变色配置
  const color1 = {
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    type: "linear",
    global: false,
    colorStops: [
      {
        offset: 0,
        color: "#0E60B2",
      },
      {
        offset: 1,
        color: "#1FAEDE",
      },
    ],
  };

  const option = {
    //提示框
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      formatter: function (param: any) {
        const resultTooltip =
          "<div style='background:rgba(13,5,30,.3);border:1px solid rgba(255,255,255,.2);padding:5px 10px;border-radius:4px;'>" +
          "<div style='text-align:center;'>" +
          param[0].name +
          "</div>" +
          "<div style='padding-top:5px;'>" +
          "<span style='display:inline-block;border-radius:4px;width:20px;height:10px;background-color:rgba(61,187,255,.3);border: 2px solid #3eb6f5;'></span>" +
          "<span style=''> " +
          param[0].seriesName +
          ": </span>" +
          "<span style=''>" +
          param[0].value +
          "</span><span>%</span>" +
          "</div>" +
          "</div>";
        return resultTooltip;
      },
    },

    grid: {
      top: "10%",
      left: "5%",
      bottom: "0%",
      right: "0%",
      containLabel: true,
    },

    animation: false,

    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          inside: false,
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 12,
          },
          margin: 20,
        },
        data: chartNames,
      },
      {
        type: "category",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: chartNames,
      },
    ],

    yAxis: [
      {
        show: true,
        type: "value",

        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            type: "dashed",
          },
        },
        axisLine: {
          show: false,
        },
      },
    ],

    series: [
      // 1. 主数据柱体（圆柱主体）
      {
        name: "数据值",
        type: "bar",
        barGap: "60%",
        barWidth: barWidth,
        itemStyle: {
          color: color1,
          borderColor: color1,
          borderWidth: 1,
          borderType: "solid",
        },
        label: {
          show: true,
          formatter: "{c}",
          position: "top",
          color: "#1B9ED5",
          fontSize: 14,
          textAlign: "center",
        },
        zlevel: 2,
        data: chartValues,
      },

      // 2. 主柱体顶部椭圆（3D效果）
      {
        name: "数据值",
        type: "pictorialBar",
        symbolSize: [barWidth, 10],
        symbolOffset: [0, -5],
        symbolPosition: "end",
        z: 15,
        color: "#3eb6f5",
        zlevel: 2,
        data: chartValues,
      },

      // 3. 背景柱体（浅蓝色100%高度）
      {
        name: "浅蓝柱子",
        type: "bar",
        xAxisIndex: 1,
        barGap: "60%",
        data: [150, 150, 150, 150, 150],
        zlevel: 1,
        barWidth: barWidth,
        itemStyle: {
          normal: {
            color: "rgba(61,187,255,.16)",
          },
        },
      },

      // 4. 底部椭圆（3D效果）
      {
        name: "底部椭圆",
        type: "pictorialBar",
        symbolSize: [barWidth, 10],
        symbolOffset: [0, 5],
        z: 12,
        color: "#007AFF",
        data: [
          { name: "", value: "100" },
          { name: "", value: "100" },
          { name: "", value: "100" },
          { name: "", value: "100" },
          { name: "", value: "100" },
        ],
      },

      // 5. 动态顶部效果
      {
        name: "动态封顶",
        type: "effectScatter",
        rippleEffect: {
          period: 1,
          scale: 4,
          brushType: "fill",
        },
        z: 1,
        zlevel: 1,
        symbolPosition: "end",
        symbolSize: [10, 4],
        symbolOffset: [0, 0],
        itemStyle: {
          normal: {
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 5,
            shadowOffsetY: 3,
            shadowOffsetX: 0,
            color: "#155497",
          },
        },
        data: [
          { name: "", value: 150, symbolPosition: "end" },
          { name: "", value: 150, symbolPosition: "end" },
          { name: "", value: 150, symbolPosition: "end" },
          { name: "", value: 150, symbolPosition: "end" },
          { name: "", value: 150, symbolPosition: "end" },
        ],
      },
    ],
  };

  return (
    <div className={styles.container}>
      {/* 背景图片层 */}
      <div
        className={styles.backgroundLayer}
        style={{
          backgroundImage: `url(${footerBg})`,
        }}
      />

      {/* ECharts 3D饼图层 */}
      <div className={styles.chartLayer}>
        <ChartBase option={option} id="chart_cylinder_bar" {...props} />
      </div>
    </div>
  );
};

export default CylinderBarChart;
