import ChartBase from "@/components/ChartBase";
import React from "react";

interface Props {
  [key: string]: any;
}

const BasicPie: React.FC<Props> = (props) => {
  const {
    chartData = [
      { value: 1048, name: "类别1" },
      { value: 735, name: "类别2" },
      { value: 580, name: "类别3" },
      { value: 484, name: "类别4" },
      { value: 300, name: "类别5" },
    ],
    showLegend = true,
    isDonut = false,
    isRose = false,
    title = "基础饼图",
    subtitle = "",
    colorConfig = [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
    center = ["50%", "50%"],
    radius = "70%",
    innerRadius = "40%",
    ...restProps
  } = props;

  // 直接定义option，不使用useState
  const actualRadius = isDonut ? [innerRadius, radius] : radius;

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      right: 10,
      top: 10,
      data: chartData.map((item: any) => item.name),
      show: showLegend,
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: actualRadius,
        center: center,
        roseType: isRose ? "radius" : false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: "{b}: {d}%",
          color: "#fff",
        },
        labelLine: {
          smooth: 0.2,
          length: 10,
          length2: 20,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.5)",
          },
        },
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          label: {
            show: true,
            fontSize: "14",
            fontWeight: "bold",
          },
        },
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function (idx: any) {
          return Math.random() * 200;
        },
      },
    ],
    color: colorConfig,
  };

  return <ChartBase title={title} option={option} id="chart_pie" {...restProps} />;
};

export default BasicPie;
