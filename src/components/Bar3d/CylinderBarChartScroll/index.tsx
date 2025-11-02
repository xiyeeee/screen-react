import ChartBase from "@/components/ChartBase";
import React, { useEffect, useState } from "react";
import footerBg from "./assets/footerBg.png";
import styles from "./index.module.less";

interface ChartDataItem {
  name: string;
  value: number;
  isEmpty?: boolean;
}

interface Props {
  [key: string]: any;
}

const CylinderBarChartScroll: React.FC<Props> = (props) => {
  // 所有18种异常数据
  const allChartData = [
    { name: "落管异常", value: 1 },
    { name: "测管异常", value: 2 },
    { name: "铲纱保护", value: 4 },
    { name: "气压不足", value: 2 },
    { name: "寻零异常", value: 1 },
    { name: "急停", value: 3 },
    { name: "导纱板翻起异常", value: 2 },
    { name: "里摆异常", value: 4 },
    { name: "外摆异常", value: 1 },
    { name: "中间位异常", value: 2 },
    { name: "上限保护", value: 1 },
    { name: "下限保护", value: 1 },
    { name: "导数板落下异常", value: 2 },
    { name: "满纱残留", value: 2 },
    { name: "托盘进异常", value: 1 },
    { name: "托盘退异常", value: 6 },
    { name: "落管不够", value: 1 },
    { name: "气架不在外摆位", value: 1 },
  ];

  // 计算异常数据总和
  const totalAbnormalCount = allChartData.reduce((sum, item) => sum + item.value, 0);

  // 状态管理
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const itemsPerPage = 5; // 每页显示5个

  // 获取当前显示的数据
  const getCurrentPageData = (startIndex: number): ChartDataItem[] => {
    const endIndex = startIndex + itemsPerPage;
    const actualData = allChartData.slice(startIndex, endIndex);

    // 如果数据不足5个，用空数据填充
    const filledData: ChartDataItem[] = [...actualData];
    while (filledData.length < itemsPerPage) {
      filledData.push({
        name: "",
        value: 0,
        isEmpty: true,
      });
    }

    return filledData;
  };

  // 初始化数据和自动滚动
  useEffect(() => {
    // 设置初始数据
    setChartData(getCurrentPageData(0));

    // 设置自动滚动定时器
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + itemsPerPage;
        // 如果超出数据范围，回到开始
        const actualNextIndex = nextIndex >= allChartData.length ? 0 : nextIndex;

        // 更新显示数据
        setChartData(getCurrentPageData(actualNextIndex));

        return actualNextIndex;
      });
    }, 5000); // 每3秒切换一次

    return () => {
      clearInterval(interval);
    };
  }, []);

  const chartNames = chartData.map((item) => item.name);
  const chartValues = chartData.map((item) => item.value);

  // 计算当前页数据总和（用于y轴最大值）
  const currentPageTotal = chartData
    .filter((item) => !item.isEmpty)
    .reduce((sum, item) => sum + item.value, 0);

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

    animation: true,
    animationDuration: 800,
    animationEasing: "cubicOut",
    animationDelay: 0,

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
          interval: 0, // 强制显示所有标签
          rotate: 0, // 设置旋转角度，如果文字过长可以设置为45或90
          overflow: "break", // 文字溢出时换行
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
        min: 0,
        max: currentPageTotal, // 设置y轴最大值为当前页数据总和
        interval: Math.ceil(currentPageTotal / 5), // 设置刻度间隔，确保显示最大值
        boundaryGap: [0, 0], // 确保刻度从0开始到最大值结束

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
          color: function (params: any) {
            // 如果是空数据，返回透明色
            return chartData[params.dataIndex]?.isEmpty ? "transparent" : color1;
          },
          borderColor: function (params: any) {
            // 如果是空数据，返回透明色
            return chartData[params.dataIndex]?.isEmpty ? "transparent" : color1;
          },
          borderWidth: 1,
          borderType: "solid",
        },
        label: {
          show: true,
          formatter: function (params: any) {
            // 如果是空数据，不显示标签
            return chartData[params.dataIndex]?.isEmpty ? "" : params.value;
          },
          position: "top",
          color: "#1B9ED5",
          fontSize: 14,
          textAlign: "center",
        },
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 0,
        zlevel: 2,
        data: chartValues,
      },

      // 2. 主柱体顶部椭圆（3D效果）
      {
        name: "数据值",
        type: "pictorialBar",
        symbolSize: function (value: any, params: any) {
          // 如果是空数据，symbolSize设为0来完全隐藏
          return chartData[params.dataIndex]?.isEmpty ? [0, 0] : [barWidth, 10];
        },
        symbolOffset: [0, -5],
        symbolPosition: "end",
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 100,
        z: 15,
        itemStyle: {
          color: function (params: any) {
            // 如果是空数据，返回透明色
            return chartData[params.dataIndex]?.isEmpty ? "transparent" : "#3eb6f5";
          },
        },
        zlevel: 2,
        data: chartValues,
      },

      // 3. 背景柱体（浅蓝色100%高度）
      {
        name: "浅蓝柱子",
        type: "bar",
        xAxisIndex: 1,
        barGap: "60%",
        data: chartData.map((item) => (item.isEmpty ? 0 : currentPageTotal)),
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 0,
        zlevel: 1,
        barWidth: barWidth,
        itemStyle: {
          normal: {
            color: function (params: any) {
              // 如果是空数据，返回透明色
              return chartData[params.dataIndex]?.isEmpty ? "transparent" : "rgba(61,187,255,.16)";
            },
          },
        },
      },

      // 4. 底部椭圆（3D效果）
      {
        name: "底部椭圆",
        type: "pictorialBar",
        symbolSize: function (value: any, params: any) {
          // 如果是空数据，symbolSize设为0来完全隐藏
          return chartData[params.dataIndex]?.isEmpty ? [] : [barWidth, 10];
        },
        symbolOffset: [0, 5],
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 50,
        z: 12,
        itemStyle: {
          color: function (params: any) {
            // 如果是空数据，返回透明色
            return chartData[params.dataIndex]?.isEmpty ? "transparent" : "#007AFF";
          },
        },
        data: chartData.map((item) => ({
          name: "",
          value: item.isEmpty ? 0 : 100,
        })),
      },

      // 5. 动态顶部效果
      {
        name: "动态封顶",
        type: "effectScatter",
        rippleEffect: {
          period: 2,
          scale: 2.5,
          brushType: "fill",
        },
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 200,
        z: 1,
        zlevel: 1,
        symbolPosition: "end",
        symbolSize: function (value: any, params: any) {
          // 如果是空数据，symbolSize设为0来完全隐藏
          return chartData[params.dataIndex]?.isEmpty ? [0, 0] : [10, 4];
        },
        symbolOffset: [0, 0],
        itemStyle: {
          normal: {
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 5,
            shadowOffsetY: 3,
            shadowOffsetX: 0,
            color: function (params: any) {
              // 如果是空数据，返回透明色
              return chartData[params.dataIndex]?.isEmpty ? "transparent" : "#155497";
            },
          },
        },
        data: chartData.map((item) => ({
          name: "",
          value: item.isEmpty ? 0 : currentPageTotal,
          symbolPosition: "end",
        })),
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

      {/* ECharts 柱状图层 */}
      <div className={styles.chartLayer}>
        <ChartBase option={option} id="chart_cylinder_bar" {...props} />
      </div>
    </div>
  );
};

export default CylinderBarChartScroll;
