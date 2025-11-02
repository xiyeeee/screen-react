import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-24 16:07:26
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-06-30 13:12:55
 */
import ChartBase from "@/components/ChartBase";
import statusFooter from "./assets/statusFooter.png";
import styles from "./index.module.less";
const CustomLegend = ({ data, colors }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.customLegend}>
      {/* 标题行 */}
      <div className={styles.legendHeader}>
        <span className={styles.headerEmpty} />
        <span className={styles.headerName} />
        <span className={styles.headerTitle}>机器数量</span>
        <span className={styles.headerPercent}>占比</span>
      </div>

      {/* 数据行 */}
      {data.map((item, index) => (
        <div key={index} className={styles.legendItem}>
          <div className={styles.legendDot} style={{ backgroundColor: colors[index] }} />
          <span className={styles.legendName}>{item.name}</span>
          <span className={styles.legendValue}>{item.value}</span>
          <span className={styles.legendPercent}>{((item.value / total) * 100).toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};
// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;

  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;

  isSelected = false;
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

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
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate * 1.5;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate * 1.5;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate * 1.5;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate * 1.5;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate * 1.5;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate * 1.5;
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u) * 2;
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.3;
      }
      return Math.sin(v) > 0 ? 2 * h * 0.3 : -2;
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
        k: 1 / 10,
      },
    };

    if (typeof pieData[i].itemStyle !== "undefined") {
      const itemStyle = {};

      if (typeof pieData[i].itemStyle.color !== "undefined") {
        itemStyle.color = pieData[i].itemStyle.color;
      }
      if (typeof pieData[i].itemStyle.opacity !== "undefined") {
        itemStyle.opacity = pieData[i].itemStyle.opacity;
      }

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
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    backgroundColor: "transparent",
    fontFamily: "Source Han Sans CN",

    legend: {
      show: false, // 关闭默认图例，使用自定义图例
    },

    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    grid3D: {
      viewControl: {
        autoRotate: true, // 自动旋转
        distance: 280, // 视角距离
        alpha: 20, // 视角
        beta: 15,
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
      },
      left: "10%",
      width: "80%",
      top: "10%",
      height: "80%",
      show: false,
      boxWidth: 200,
      boxHeight: 80,
      boxDepth: 200,
      zlevel: 1,
    },
    series: series,
  };
  return option;
}

interface Props {
  [key: string]: any;
}

const CustomLegendPie3d: React.FC<Props> = (props) => {
  const { className = "", style = {}, data } = props;

  // // 默认数据（模拟后端返回的格式）
  // const defaultStatusDist = [
  //   {
  //     state: "上电",
  //     count: 160,
  //     percentage: 56.3,
  //   },
  //   {
  //     state: "下电",
  //     count: 74,
  //     percentage: 26.1,
  //   },
  //   {
  //     state: "异常",
  //     count: 38,
  //     percentage: 13.4,
  //   },
  //   {
  //     state: "维修中",
  //     count: 12,
  //     percentage: 4.2,
  //   },
  // ];

  // 使用传入的数据或默认数据
  const statusDist = data;

  // 从数组对象中提取图表所需的数据
  const categories = statusDist.map((item) => item.state);
  const values = statusDist.map((item) => item.count);

  const colorConfig = [
    "rgba(115, 195, 238, 0.9)", // 维修中：浅蓝色
    "rgba(47, 163, 181, 0.9)", // 异常：青色
    "rgba(146, 116, 58, 0.9)", // 上电：棕色
    "rgba(240, 134, 65, 0.9)", // 下电：橙色
  ];
  const legendColors = ["#73C3EE", "#2FA3B5", "#92743A", "#F08641"];

  const grid3DConfig = {
    left: "0%",
    width: "100%",
    height: "100%",
    top: "-15%", // 向上移动3D图
    boxWidth: 200,
    boxHeight: 100, // 增加Z轴高度，让饼图更立体
    boxDepth: 200,
    viewControl: {
      distance: 350,
      alpha: 30,
      beta: 0,
      autoRotate: true,
      rotateSensitivity: 1,
      zoomSensitivity: 0,
      panSensitivity: 0,
    },
  };

  const showTitle = false;

  // 构建图例数据
  const legendData = categories.map((name, index) => ({
    name,
    value: values[index],
  }));

  // 构建饼图数据，将原有数据格式转换为新的3D饼图所需格式
  const pieData = categories.map((name, index) => ({
    name,
    value: values[index],
    itemStyle: {
      color: colorConfig[index],
      opacity: 0.8,
    },
  }));

  // 生成3D饼图配置
  const option = getPie3D(pieData, 0.7);

  // 合并用户的grid3D配置
  if (grid3DConfig) {
    option.grid3D = { ...option.grid3D, ...grid3DConfig };
  }

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          {/* 背景图片层 */}
          <div
            className={styles.backgroundLayer}
            style={{
              backgroundImage: `url(${statusFooter})`,
            }}
          />

          {/* ECharts 3D饼图层 */}
          <div className={styles.chartLayer}>
            <ChartBase title={showTitle} option={option} id="chart_custom_legend_pie3d" />
          </div>
        </div>
      </div>
      <div className={styles.legendContainer}>
        <CustomLegend data={legendData} colors={legendColors} />
      </div>
    </div>
  );
};

export default CustomLegendPie3d;
