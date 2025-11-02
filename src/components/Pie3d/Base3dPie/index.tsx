import React from "react";
import ChartBase from "@/components/ChartBase";

interface Props {
  [key: string]: any;
}

const Base3dPie: React.FC<Props> = (props) => {
  const {
    chartData = {
      categories: ["第一产业", "第二产业", "第三产业", "城乡居民生活用电"],
      values: [5, 32, 18, 45],
    },
    colorConfig = ["#286DF7ee", "#04F7FDee", "#E23AA9ee", "#FFC852ee"],
    title = "3D饼图",
    ...restProps
  } = props;

  // 计算参数方程
  function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {
    // 计算
    const midRatio = (startRatio + endRatio) / 2;

    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
      isSelected = false;
    }

    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== "undefined" ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    const hoverRate = isHovered ? 1.05 : 1;

    // 返回曲面参数方程
    return {
      u: {
        min: -Math.PI,
        max: Math.PI * 3,
        step: Math.PI / 32,
      },
      v: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        if (u < startRadian) {
          return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },
      y: function (u, v) {
        if (u < startRadian) {
          return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
      },
      z: function (u, v) {
        if (u < -Math.PI * 0.5) {
          return Math.sin(u);
        }
        if (u > Math.PI * 2.5) {
          return Math.sin(u);
        }
        return Math.sin(v) > 0 ? 2 * height : -1;
      },
    };
  }

  // 生成模拟 3D 饼图的配置项
  function getPie3D(pieData, internalDiameterRatio) {
    const series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k =
      typeof internalDiameterRatio !== "undefined"
        ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
        : 1 / 3;

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
      sumValue += pieData[i].value;

      const seriesItem = {
        name: typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
        type: "surface",
        parametric: true,
        wireframe: {
          show: false,
        },
        pieData: pieData[i],
        pieStatus: {
          selected: false,
          hovered: false,
          k: k,
        },
      };

      if (typeof pieData[i].itemStyle !== "undefined") {
        const itemStyle = {};
        typeof pieData[i].itemStyle.color !== "undefined"
          ? (itemStyle.color = pieData[i].itemStyle.color)
          : null;
        typeof pieData[i].itemStyle.opacity !== "undefined"
          ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
          : null;
        seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value;
      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      series[i].parametricEquation = getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        false,
        false,
        k,
        series[i].pieData.value,
      );
      startValue = endValue;
      legendData.push(series[i].name);
    }

    // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
      name: "mouseoutSeries",
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      itemStyle: {
        opacity: 0.1,
        color: "#f0f",
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 20,
        },
        x: function (u, v) {
          return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.1;
        },
        y: function (u, v) {
          return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.1;
        },
        z: function (u, v) {
          return Math.cos(v) > 0 ? 0 : -5;
        },
      },
    });

    series.push({
      name: "mouseoutSeries",
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      itemStyle: {
        opacity: 0.1,
        color: "#0ff",
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 20,
        },
        x: function (u, v) {
          return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.1;
        },
        y: function (u, v) {
          return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.1;
        },
        z: function (u, v) {
          return Math.cos(v) > 0 ? -15 : -20;
        },
      },
    });

    return series;
  }

  // 准备数据
  const optionsData = chartData.categories.map((item, index) => ({
    name: item,
    value: chartData.values[index],
    itemStyle: {
      color: colorConfig[index % colorConfig.length],
    },
  }));

  const series = getPie3D(optionsData, 0.8);

  // 添加2D饼图用于标签展示
  series.push({
    name: "pie2d",
    type: "pie",
    label: {
      opacity: 1,
      fontSize: 12,
      lineHeight: 20,
      textStyle: {
        fontSize: 12,
      },
    },
    labelLine: {
      length: 60,
      length2: 60,
    },
    startAngle: -50, //起始角度，支持范围[0, 360]。
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ["0", "0"],
    center: ["20%", "20%"],
    data: optionsData,
    itemStyle: {
      opacity: 0,
    },
  });

  // 完整配置项
  const option = {
    legend: {
      tooltip: {
        show: true,
      },
      data: chartData.categories,
      bottom: "5%",
      itemGap: 20,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    animation: true,
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== "mouseoutSeries" && params.seriesName !== "pie2d") {
          return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${params.seriesIndex < optionsData.length ? optionsData[params.seriesIndex].value : ""}`;
        }
      },
      textStyle: {
        fontSize: 12,
      },
    },
    backgroundColor: "transparent",
    labelLine: {
      show: false,
      lineStyle: {
        color: "transparent",
      },
    },
    label: {
      show: false,
      color: "transparent",
      position: "outside",
      formatter: "{b} \n{c} {d}%",
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: 0.5,
      bottom: "20%",
      viewControl: {
        autoRotate: true, // 自动旋转
        zoomSensitivity: 0,
      },
    },
    series: series,
  };

  return <ChartBase title={title} option={option} id="chart_3dpie" {...restProps} />;
};

export default Base3dPie;
