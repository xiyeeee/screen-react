/*
 * @Descripttion: 优化版中国航线图组件
 * @Author: Nikehu
 * @Date: 2025-07-28 11:20:10
 * @LastEditors: Nikehu
 * @LastEditTime: 2025-07-28 13:29:38
 */
import chinaGeoJSON from "@/assets/json/chinaGeo.json"; // 确保引入正确的GeoJSON文件
import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";
import { cityData } from "./cityData";
import { mapData } from "./mapData";

interface Props {
  [key: string]: any;
}

const ChinaMapAir: React.FC<Props> = (props) => {
  const { title = "中国航线图", ...restProps } = props;
  const [chartOption, setChartOption] = useState<echarts.EChartsOption | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  // 注册地图 (仅执行一次)
  useEffect(() => {
    if (!echarts.getMap("china")) {
      echarts.registerMap("china", chinaGeoJSON as any);
    }
  }, []);

  // 初始化图表配置
  useEffect(() => {
    // 配置项初始化
    const option = {
      title: {
        text: title,
        left: "center",
        textStyle: {
          color: "#fff",
          fontSize: 16,
        },
        padding: [10, 0],
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderColor: "rgba(255, 209, 163, 0.5)",
        borderWidth: 1,
        textStyle: {
          color: "#fff",
        },
      },
      geo: {
        map: "china",
        nameMap: { China: "中国" },
        roam: true, // 允许缩放平移
        zoom: 1,
        top: "26%",
        label: {
          show: false,
          color: "#eee",
          fontSize: 10,
          emphasis: { show: false },
        },
        itemStyle: {
          borderColor: "rgba(255,209,163, .5)",
          borderWidth: 0.5,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              { offset: 0, color: "rgba(73,86,166,.2)" },
              { offset: 1, color: "rgba(73,86,166,.05)" },
            ],
          },
        },
        emphasis: {
          itemStyle: {
            areaColor: "rgba(102,105,240,.3)",
            borderColor: "#FFD1A3",
            borderWidth: 1,
          },
        },
      },
      series: [
        {
          name: "城市节点",
          type: "effectScatter",
          coordinateSystem: "geo",
          symbolSize: (val: any) => Math.max(3, Math.sqrt(val[2]) / 5),
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke",
            scale: 3,
          },
          itemStyle: {
            color: "#46bee9",
          },
          label: {
            show: false,
            formatter: "{b}",
            position: "right",
            fontSize: 10,
            color: "#eee",
            backgroundColor: "rgba(20, 30, 60, 0.7)",
            padding: [3, 5],
            borderRadius: 3,
          },
          zlevel: 2,
          data: cityData.citys.map((item) => ({
            name: item.name,
            value: [...item.value, item.value[2] || 10], // 确保第三位数据存在
          })),
        },
        {
          name: "线路",
          type: "lines",
          coordinateSystem: "geo",
          zlevel: 2,
          zoom: 1,
          large: true,
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: "pin",
            symbolSize: 3,
            trailLength: 0,
          },
          lineStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#58B3CC",
                  },
                  {
                    offset: 1,
                    color: "#F58158",
                  },
                ],
                false,
              ),
              width: 1,
              opacity: 0.2,
              curveness: 0.1,
            },
          },
          data: mapData.moveLines,
        },
      ],
    };

    // 添加响应式处理
    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);

    setChartOption(option as echarts.EChartsOption);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current?.dispose();
    };
  }, [title]);

  return (
    <ChartBase
      ref={chartRef}
      option={chartOption}
      id="chart_chinamap"
      style={{ width: "100%", height: "600px" }}
      {...restProps}
    />
  );
};

export default ChinaMapAir;
