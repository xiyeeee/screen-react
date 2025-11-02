import ChartBase from "@/components/ChartBase";
import React from "react";

interface Props {
  [key: string]: any;
}

const Fake3dBar: React.FC<Props> = (props) => {
  const {
    chartData = {
      categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
      series: [
        {
          name: "人体",
          data: [1700, 800, 1700, 600, 800, 1700],
        },
        {
          name: "抓拍",
          data: [2600, 1400, 3350, 1400, 1400, 3350],
        },
      ],
    },
    colorConfig1 = ["rgba(11, 83, 128)", "rgba(2, 143, 224)", "#4894F7"],
    colorConfig2 = ["rgb(12, 109, 122)", "rgba(1, 241, 228)", "#5ce1d6"],
    barWidth = 18,
    title = "伪3D柱状图",
    ...restProps
  } = props;

  const option = {
    tooltip: {
      backgroundColor: "rgba(255,255,255,.05)", //设置背景图片 rgba格式
      borderWidth: "1", //边框宽度设置1
      borderColor: "rgba(255,255,255,0.25)", //设置边框颜色
      extraCssText: "backdrop-filter: blur(5px);",
      textStyle: {
        fontSize: 18,
        color: "#ffffff", //设置文字颜色
      },
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        let str = params[0].name + ":";
        params.filter(function (item: any) {
          if (item.componentSubType === "bar") {
            str += "<br/>" + item.seriesName + "：" + item.value;
          }
        });
        return str;
      },
    },
    backgroundColor: "transparent",
    //图表大小位置限制
    grid: {
      left: "2%",
      right: "4%",
      bottom: "5%",
      top: "20%",
      containLabel: true,
    },
    legend: {
      top: "5%",
      right: "2%",
      itemGap: 20,
      icon: "circle", //  这个字段控制形状  类型包括 circle 圆形，triangle 三角形，diamond 四边形，arrow 变异三角形，none 无
      itemWidth: 10, // 设置图例图形的宽
      itemHeight: 10, // 设置图例图形的高
      textStyle: {
        color: "#C5D6E6",
      },
    },
    xAxis: {
      data: chartData.categories,
      //坐标轴
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "#D9E7FF",
        },
        textStyle: {
          color: "#C5D6E6",
          fontSize: "16",
        },
      },
      type: "category",
      axisLabel: {
        textStyle: {
          color: "#C5DFFB",
          fontWeight: 500,
          fontSize: "14",
        },
      },
      axisTick: {
        textStyle: {
          color: "#fff",
          fontSize: "16",
        },
        show: true,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(217,231,255,0.3)",
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      //坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: "#C5DFFB",
        },
      },
    },
    series: [
      {
        z: 1,
        name: chartData.series[0].name,
        type: "bar",
        barWidth: barWidth,
        barGap: "0%",
        data: chartData.series[0].data,
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              x2: 1,
              y: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: colorConfig1[0],
                },
                {
                  offset: 1,
                  color: "rgba(10,50,95,0)",
                },
              ],
            },
          },
        },
      },
      {
        z: 3,
        type: "pictorialBar",
        symbolPosition: "end",
        data: chartData.series[0].data,
        symbol: "diamond",
        symbolOffset: ["-75%", "-60%"],
        symbolSize: [18, 12],
        itemStyle: {
          normal: {
            borderWidth: 2,
            color: colorConfig1[2], // 顶部小方块颜色
          },
        },
      },
      {
        z: 1,
        name: chartData.series[1].name,
        type: "bar",
        barWidth: barWidth,
        barGap: "50%",
        data: chartData.series[1].data,
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              x2: 1,
              y: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: colorConfig2[1],
                },
                {
                  offset: 1,
                  color: "rgba(0,88,102,0)",
                },
              ],
            },
          },
        },
      },
      {
        z: 3,
        type: "pictorialBar",
        symbolPosition: "end",
        data: chartData.series[1].data,
        symbol: "diamond",
        symbolOffset: ["75%", "-60%"],
        symbolSize: [18, 12],
        itemStyle: {
          normal: {
            borderWidth: 2,
            color: colorConfig2[2],
          },
        },
        tooltip: {
          show: false,
        },
      },
    ],
  };

  return <ChartBase title={title} option={option} id="chart_flatbar3d" {...restProps} />;
};

export default Fake3dBar;
