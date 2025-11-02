import React, { useMemo } from "react";
import ChartBase from "@/components/ChartBase";
import { Empty } from "antd";
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
const tempMinAndMaxData = {
  min: 0,
  max: 100,
  average: 50,
};
const tempData = initdata.map((item) => ({ name: item.productionTime, value: item.capacity }));
const BarChart = ({ data = tempData, minAndMaxData = tempMinAndMaxData }) => {
  const option = useMemo(
    () => ({
      grid: {
        right: "10%",
        bottom: "15%",
        left: "2%",
        top: "40px",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.name),
        name: "kw/h",
        nameLocation: "end",
        nameGap: 15,
        nameTextStyle: {
          color: "#8c8c8c",
        },
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
        name: "到达次数",
        nameLocation: "end",
        nameGap: 15,
        nameTextStyle: {
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
          type: "bar",
          data: data.map((item) => item.value),
          barWidth: "60px",
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
                  color: "#376df7", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#bdd0ff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          label: {
            show: true,
            position: "inside",
            formatter: "{c}",
            color: "#fff",
            fontWeight: 500,
            fontSize: 14,
          },
          markLine: {
            symbol: "none",
            lineStyle: {
              width: 0, // 设置线宽为0，隐藏线条
            },
            data: [
              {
                name: "最小值",
                xAxis: 0, // 第一根柱子
                label: {
                  formatter: "最小值: " + minAndMaxData.min,
                  position: "end",
                  color: "#52C41A",
                },
              },
              {
                name: "最大值",
                xAxis: data.length - 1, // 最后一根柱子
                label: {
                  formatter: "最大值: " + minAndMaxData.max,
                  position: "end",
                  color: "#1890FF",
                },
              },
              {
                name: "平均值",
                xAxis: 2, // 第三根柱子
                label: {
                  formatter: "平均值: " + minAndMaxData.average,
                  position: "end",
                  color: "#FAAD14",
                },
              },
            ],
          },
        },
      ],
    }),
    [data, minAndMaxData],
  );

  return (
    <>
      <ChartBase option={option} id="chart_loom_production_scroll" />
    </>
  );
};

export default BarChart;
