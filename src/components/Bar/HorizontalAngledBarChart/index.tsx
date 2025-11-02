import React from "react";

import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";

// 在组件外部定义和注册自定义形状（水平版本）
const myShape = {
  x: 0,
  y: 0,
  width: 13,
};

const HorizontalInclinedBar = echarts.graphic.extendShape({
  shape: myShape,
  buildPath: function (ctx: any, shape: any) {
    // 完全按照你的模板逻辑，转换为水平版本
    const startPoint = shape.startPoint; // 对应 xAxisPoint (柱子起始端)
    const endPoint = shape.endPoint; // 对应 shape.x, shape.y (柱子结束端)

    // 只有右上角一个斜角，其他都是直角
    const barHeight = shape.barHeight || 10;
    const centerY = startPoint[1]; // Y轴中心线（刻度线位置）
    const cutSize = 8; // 斜角大小

    // 4个顶点：右下角斜角，按正确顺序
    const c0 = [startPoint[0], centerY - barHeight / 2]; // 左上角 (直角)
    const c1 = [startPoint[0], centerY + barHeight / 2]; // 左下角 (直角)
    const c2 = [endPoint[0] - cutSize, centerY + barHeight / 2]; // 右下斜角点
    const c3 = [endPoint[0], centerY - barHeight / 2]; // 右上角 (直角)

    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath();
  },
});

// 注册自定义形状
echarts.graphic.registerShape("HorizontalInclinedBar", HorizontalInclinedBar);

const HorizontalBarChart: React.FC = () => {
  // console.log("HorizontalBarChart rendering...");

  const option = {
    grid: {
      top: "30", // 增加顶部边距
      left: "15",
      right: "40",
      bottom: "30px", // 增加底部边距
      containLabel: true,
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
          color: "#808492",
        },
      },
    },
    yAxis: [
      {
        type: "category",
        boundaryGap: true, //false代表是零刻度开始，设置为true代表离零刻度间隔一段距离
        nameTextStyle: {
          color: "#808492",
          // fontSize:16,
        },
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
            color: "#808492",
            fontSize: 12, // 可以适当调小字体
          },
        },
        data: ["机器10", "机器20", "机器30", "机器40", "机器50", "机器50"],
      },
    ],
    series: [
      {
        name: "数量",
        type: "custom",
        renderItem: (params: any, api: any) => {
          const value = api.value(0); // 数值
          const categoryIndex = params.dataIndex; // 类别索引
          const startPoint = api.coord([0, categoryIndex]); // 起始点坐标
          const endPoint = api.coord([value, categoryIndex]); // 结束点坐标

          // 确保柱状图居中对齐到刻度线，并且不超出边界
          const barHeight = Math.min(api.size([0, 1])[1] * 0.4, 12); // 更保守的高度设置

          // 定义颜色数组，对应5个机器
          const colors = [
            // 机器10 - 红色渐变 (opacity: 0.4)
            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "rgba(224, 48, 36, 0.4)" },
              { offset: 1, color: "rgba(224, 48, 36, 0.4)" },
            ]),
            // 机器20 - 灰色 (opacity: 0.4)
            "rgba(217, 217, 217, 0.4)",
            // 机器30 - 绿色渐变 (opacity: 0.4)
            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "rgba(64, 249, 127, 0.4)" },
              { offset: 1, color: "rgba(70, 223, 122, 0.4)" },
            ]),
            // 机器40 - 橙色渐变 (opacity: 0.4)
            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "rgba(241, 96, 18, 0.4)" },
              { offset: 1, color: "rgba(240, 182, 32, 0.4)" },
            ]),
            // 机器50 - 青色渐变 (opacity: 0.4)
            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "rgba(9, 255, 252, 0.4)" },
              { offset: 1, color: "rgba(36, 221, 234, 0.4)" },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "rgba(9, 255, 252, 0.4)" },
              { offset: 1, color: "rgba(36, 221, 234, 0.4)" },
            ]),
          ];

          return {
            type: "HorizontalInclinedBar",
            shape: {
              startPoint: startPoint,
              endPoint: endPoint,
              barHeight: barHeight, // 传递正确的柱子高度
            },
            style: {
              fill: colors[params.dataIndex] || "#55ADFF",
              stroke: "#FFFFFF",
              lineWidth: 1,
            },
          };
        },
        label: {
          show: true,
          position: "right",
          distance: 10,
          fontSize: 12,
          color: "#565656",
          formatter: function (param: any) {
            return `${param.value}`;
          },
        },
        data: [10, 20, 30, 40, 50, 60], // 直接是数值
      },
    ],
  };
  return <ChartBase option={option} id="chart_loom_production" />;
};

export default HorizontalBarChart;
