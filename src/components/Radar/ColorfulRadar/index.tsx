import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";

const ColorfulRadar = () => {
  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
    },
    radar: [
      {
        indicator: [
          { text: "外观", max: 100 },
          { text: "拍照", max: 100 },
          { text: "系统", max: 100 },
          { text: "性能", max: 100 },
          { text: "屏幕", max: 100 },
          { text: "折叠", max: 100 },
        ],
        radius: "75%",
        center: ["50%", "50%"],
        name: {
          textStyle: {
            color: "#1883ff",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: true,
          symbol: "arrow",
          symbolSize: [5, 7.5],
          lineStyle: {
            color: "#1883ff",
            type: "dashed",
          },
        },
        splitArea: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: "radar",
        areaStyle: {},
        symbol: "none",
        itemStyle: {
          normal: {
            areaStyle: {
              type: "default",
            },
          },
        },
        lineStyle: {
          opacity: 0,
        },
        data: [
          {
            value: [35, 50, 30, 30, 40, 45],
            name: "智能手机",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#9c6b4e",
                  },
                  {
                    offset: 1,
                    color: "#2a59ac",
                  },
                ]),
                lineStyle: {
                  color: "#2a59ac",
                },
              },
            },
          },
          {
            value: [70, 40, 55, 55, 30, 55],
            name: "5G手机",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0855ca",
                  },
                  {
                    offset: 1,
                    color: "#36a6c7",
                  },
                ]),
                lineStyle: {
                  color: "#36a6c7",
                },
              },
            },
          },
        ],
      },
    ],
    animationEasing: "elasticOut",
    animationDelay: function (idx: any) {
      return idx * 100;
    },
  };

  return <ChartBase title="多彩雷达" option={option} id="chart_colorful_radar" />;
};

export default ColorfulRadar;
