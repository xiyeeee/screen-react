import React, { useMemo } from "react";
import ChartBase from "@/components/ChartBase";
import styles from "./index.module.less";
const initdata = [
  {
    productionTime: "2025-01",
    capacity: 0.0,
  },
  {
    productionTime: "2025-02",
    capacity: 0.0,
  },
  {
    productionTime: "2025-03",
    capacity: 0.0,
  },
  {
    productionTime: "2025-04",
    capacity: 0.0,
  },
  {
    productionTime: "2025-05",
    capacity: 0.0,
  },
  {
    productionTime: "2025-06",
    capacity: 132.7,
  },
  {
    productionTime: "2025-07",
    capacity: 0.0,
  },
  {
    productionTime: "2025-08",
    capacity: 0.0,
  },
  {
    productionTime: "2025-09",
    capacity: 0.0,
  },
  {
    productionTime: "2025-10",
    capacity: 0.0,
  },
  {
    productionTime: "2025-11",
    capacity: 0.0,
  },
  {
    productionTime: "2025-12",
    capacity: 0.0,
  },
];
const tempData = initdata.map((item) => ({ name: item.productionTime, value: item.capacity }));
const LineChart = ({ data = tempData }) => {
  const option = useMemo(
    () => ({
      grid: {
        right: "5%",
        bottom: "15%",
        left: "2%",
        top: "40px",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
        },
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.name),
        axisLabel: {
          interval: 0,
          textStyle: {
            fontSize: 12,
            color: "#8c8c8c",
          },
        },
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#ddd",
          },
        },
      },
      yAxis: {
        type: "value",
        name: "kw/h",
        nameLocation: "end",
        nameGap: 15,
        nameTextStyle: {
          // 添加这个配置来设置名称的样式
          color: "#8c8c8c",
        },
        axisLabel: {
          textStyle: {
            color: "#8c8c8c",
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#ddd",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#eee",
            type: "dashed",
          },
        },
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          start: 0,
          end: data.length >= 5 ? (5 / data.length) * 100 : 100,
          height: 20,
          left: "10%",
          right: "10%",
          bottom: "2%",
          zoomLock: true,
          preventDefaultMouseMove: true,
          moveHandleStyle: {
            show: false,
          },
          brushSelect: false,
          handleSize: 0,
          showDetail: false,
          borderColor: "transparent",
          textStyle: {
            fontSize: 11,
          },
          handleStyle: {
            color: "#1c4ed8",
            borderColor: "#1c4ed8",
          },
          fillerColor: "rgba(28,78,216,0.3)",
          selectedDataBackground: {
            lineStyle: {
              color: "#1c4ed8",
            },
            areaStyle: {
              color: "#1c4ed8",
            },
          },
        },
      ],
      series: [
        {
          type: "line",
          data: data.map((item) => item.value),
          symbol: "circle",
          symbolSize: 6,
          itemStyle: {
            color: "#fff",
            borderColor: "#376DF7",
            borderWidth: 2,
          },
          lineStyle: {
            color: "#376DF7",
            width: 2,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#376DF7", // 渐变开始的颜色
                },
                {
                  offset: 1,
                  color: "rgba(55, 109, 247, 0.1)", // 渐变结束的颜色，透明度设为0.1
                },
              ],
            },
          },
          label: {
            show: true,
            position: "top",
            formatter: "{c}",
            color: "#666",
          },
        },
      ],
    }),
    [data],
  ); // 只在 data 变化时重新计算 option

  return (
    <>
      <ChartBase option={option} id="chart_loom_production_scroll" />
    </>
  );
};

export default LineChart;


