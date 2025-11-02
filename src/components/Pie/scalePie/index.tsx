import React from "react";
import ChartBase from "@/components/ChartBase";

interface Props {
  [key: string]: any;
}

const ScalePie: React.FC<Props> = (props) => {
  const {
    title = "成功率",
    value = 65.3,
    splitLineLength = "19%",
    splitLineDistance = -2,
    splitLineWidth = 9,
    colors = {
      main: {
        start: "rgba(58, 183, 255, 1)",
        end: "rgba(102, 188, 238, 1)",
      },
      background: "rgba(15, 31, 52, 1)",
    },
    ...restProps
  } = props;

  const int = value.toFixed(1).split(".")[0];
  const float = value.toFixed(1).split(".")[1];

  const option = {
    backgroundColor: "transparent",
    title: {
      text: "{a|" + int + "}{b|." + float + "%}\n{c|" + title + "}",
      x: "center",
      y: "center",
      textStyle: {
        rich: {
          a: {
            fontSize: 30,
            color: "#fff",
            fontWeight: "600",
          },
          b: {
            fontSize: 20,
            color: "#fff",
            padding: [2, 0, 0, 0],
          },
          c: {
            fontSize: 22,
            color: "#96A2BC",
            padding: [2, 0, 0, 0],
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        radius: ["86%", "70%"],
        silent: true,
        clockwise: true,
        startAngle: -35,
        z: 0,
        zlevel: 0,
        data: [
          {
            value: value,
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
                    color: colors.main.start, // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: colors.main.end, // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            label: {
              show: false,
            },
          },
          {
            value: 100 - value,
            label: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: colors.background,
              },
            },
          },
        ],
      },
      {
        name: "",
        type: "gauge",
        radius: "88%",
        center: ["50%", "50%"],
        startAngle: 0,
        endAngle: 360,
        splitNumber: 60,
        hoverAnimation: true,
        axisTick: {
          show: false,
        },
        splitLine: {
          length: splitLineLength,
          distance: splitLineDistance,
          lineStyle: {
            width: splitLineWidth,
            color: "#000",
          },
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
    ],
  };

  return <ChartBase title={title} option={option} id="chart_scalepie" {...restProps} />;
};

export default ScalePie;
