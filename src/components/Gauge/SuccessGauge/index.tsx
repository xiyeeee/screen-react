import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Gauge = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      formatter: "{a} <br/>{c} {b}",
    },
    series: [
      {
        name: "速度",
        type: "gauge",
        min: 0,
        max: 220,
        splitNumber: 11,
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [
              [0.09, "lime"],
              [0.82, "#1e90ff"],
              [1, "#ff4500"],
            ],
            width: 3,
            shadowColor: "#fff", //默认透明
            shadowBlur: 10,
          },
        },
        axisLabel: {
          // 坐标轴小标记
          fontWeight: "bolder",
          color: "#fff",
          shadowColor: "#fff", //默认透明
          shadowBlur: 10,
        },
        axisTick: {
          // 坐标轴小标记
          length: 15, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "auto",
            shadowColor: "#fff", //默认透明
            shadowBlur: 10,
          },
        },
        splitLine: {
          // 分隔线
          length: 25, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle（详见lineStyle）控制线条样式
            width: 3,
            color: "#fff",
            shadowColor: "#fff", //默认透明
            shadowBlur: 10,
          },
        },
        pointer: {
          // 分隔线
          shadowColor: "#fff", //默认透明
          shadowBlur: 5,
        },
        title: {
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: "bolder",
            fontSize: 20,
            fontStyle: "italic",
            color: "#fff",
            shadowColor: "#fff", //默认透明
            shadowBlur: 10,
          },
        },
        detail: {
          offsetCenter: [0, "50%"], // x, y，单位px
          textStyle: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: "bolder",
            fontSize: 25,
            color: "#fff",
          },
        },
        data: [
          {
            value: 40,
            name: "km/h",
          },
        ],
      },
    ],
  };

  // 在组件挂载后设置定时器
  useEffect(() => {
    // 获取图表实例
    const chartDom = document.getElementById("chart_gauge");
    if (!chartDom) return;

    const myChart = echarts.getInstanceByDom(chartDom);
    if (!myChart) return;

    // 设置定时器，更新数据
    timerRef.current = setInterval(() => {
      option.series[0].data[0].value = +(Math.random() * 100).toFixed(2);
      myChart.setOption(option, true);
    }, 2000);

    // 组件卸载时清除定时器
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return <ChartBase title="仪表盘" option={option} id="chart_gauge" />;
};

export default Gauge;
