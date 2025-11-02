import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import bluePosition from "./assets/bluePosition.png";
import titleBg from "./assets/titlebg.png";
import yellowPosition from "./assets/yellowPosition.png";
import worldJson from "@/assets/json/worldGeo.json"; // 导入世界地图数据
import styles from "./index.module.less";

const GlobalBusinessMap = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 业务地点坐标数据
  const businessLocations = {
    // 兰州（公司总部）
    headquarters: {
      name: "xx有限公司",
      coord: [103.834303, 36.061089], // 兰州坐标
      type: "headquarters",
    },
    // 其他业务地点
    branches: [
      {
        name: "加拿大",
        coord: [-106.346771, 56.130366],
        type: "branch",
        labelPosition: "right",
      },
      {
        name: "美国",
        coord: [-95.712891, 37.09024],
        type: "branch",
        labelPosition: "right",
      },
      {
        name: "南美洲",
        coord: [-58.381559, -14.235004],
        type: "branch",
        labelPosition: "right",
      },
      {
        name: "非洲",
        coord: [17.873887, 0.228021],
        type: "branch",
        labelPosition: "top",
      },
      {
        name: "欧洲",
        coord: [10.451526, 54.525961],
        type: "branch",
        labelPosition: "right",
      },
      // {
      //   name: '西亚',
      //   coord: [53.688046, 32.427908],
      //   type: 'branch',
      //   labelPosition: 'right',
      // },
      {
        name: "中亚",
        coord: [64.585262, 41.377491],
        type: "branch",
        labelPosition: "top",
      },
      {
        name: "俄罗斯",
        coord: [105.318756, 61.52401],
        type: "branch",
        labelPosition: "right",
      },
      {
        name: "日本",
        coord: [138.252924, 36.204824],
        type: "branch",
        labelPosition: "bottom",
      },
      {
        name: "南亚",
        coord: [78.96288, 20.593684],
        type: "branch",
        labelPosition: "bottom",
      },
      {
        name: "东南亚",
        coord: [101.975766, 4.210484],
        type: "branch",
        labelPosition: "bottom",
      },
      {
        name: "澳大利亚",
        coord: [133.775136, -25.274398],
        type: "branch",
        labelPosition: "left",
      },
    ],
  };

  // 图表配置
  const getChartOption = () => {
    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          if (params.componentType === "geo") {
            return params.name;
          } else if (params.seriesType === "scatter") {
            if (params.data.type === "headquarters") {
              return `<div style="padding: 8px;">
                <div style="color: #ff4757; font-weight: bold;">
                  xx有限公司
                </div>
              </div>`;
            } else {
              return `<div style="padding: 8px;">
                <div style="color: #FFD93D; font-weight: bold;">
                  ${params.data.name}
                </div>
                <div style="color: #fff; font-size: 12px;">业务地点</div>
              </div>`;
            }
          }
          return params.name;
        },
        borderColor: "#5B8FF9",
        borderWidth: 1,
        textStyle: {
          color: "#fff",
        },
      },
      geo: {
        map: "world",
        roam: true, // 开启鼠标缩放和平移漫游
        zoom: 1.05,
        center: [12, 0], // 地图中心点，与背景图对齐
        itemStyle: {
          // 默认地图样式
          areaColor: "rgba(29, 172, 243, 0.52)",
          borderColor: "#fff",
          borderWidth: 0.5,
          shadowColor: "rgba(0, 0, 0, 0.01)",
          shadowBlur: 3.454,
          shadowOffsetX: 0,
          shadowOffsetY: 1.727,
        },
        emphasis: {
          // 鼠标悬浮时的样式
          itemStyle: {
            areaColor: "#2a5caa",
          },
          label: {
            show: true,
            color: "#fff",
          },
        },
        regions: [
          {
            // 中国特殊样式 - 红色填充
            name: "China",
            itemStyle: {
              areaColor: "rgba(252, 10, 10, 0.32)",
              borderColor: "#ff6b47",
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                areaColor: "#e55039",
              },
            },
          },
        ],
      },
      series: [
        {
          name: "业务连接",
          type: "lines",
          coordinateSystem: "geo",
          zlevel: 1, // 设置层级，数值越小越在底层
          effect: {
            show: true,
            period: 4, // 箭头指向速度，值越小速度越快
            trailLength: 0.2, // 特效尾迹长度[0,1]值越大，尾迹越长
            symbol: "arrow", // 箭头图标
            symbolSize: 6, // 图标大小
            color: "#FFD93D", // 箭头颜色
          },
          data: businessLocations.branches.map((branch) => ({
            coords: [
              [
                businessLocations.headquarters.coord[0],
                businessLocations.headquarters.coord[1] - 3,
              ], // 起点保持不变
              [branch.coord[0], branch.coord[1] - 3], // 终点Y坐标减小（向下偏移）
            ],
          })),
          lineStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#FFC259", // 总部端（深蓝色）
                },
                {
                  offset: 0.5,
                  color: "#59d8cb", // （绿色）
                },
                {
                  offset: 1,
                  color: "#FFC259", // 业务地点端（绿色）
                },
              ],
            },
            width: 2,
            opacity: 1, // 降低线条透明度，突出动态效果
            curveness: 0.2,
          },
        },
        {
          // 总部标记（蓝色图片）
          name: "总部",
          type: "scatter",
          coordinateSystem: "geo",
          zlevel: 2, // 设置层级，在连接线之上
          data: [
            {
              name: businessLocations.headquarters.name,
              value: businessLocations.headquarters.coord,
              type: "headquarters",
            },
          ],
          symbol: `image://${bluePosition}`,
          symbolSize: [32, 32],
          label: {
            show: true,
            position: "left",
            formatter: "{companyName|xx有限公司}",
            rich: {
              companyName: {
                color: "#ffffff",
                height: 30,
                width: 150,
                fontSize: 12,
                fontWeight: 500,
                backgroundColor: {
                  image: titleBg,
                },
                textAlign: "center",
                padding: [2, 0, 0, 10],
                borderRadius: 4,
              },
            },
          },
          emphasis: {
            scale: 1.2,
          },
        },
        {
          // 业务地点散点（黄色图片）
          name: "业务地点",
          type: "scatter",
          coordinateSystem: "geo",
          zlevel: 2, // 设置层级，在连接线之上
          data: businessLocations.branches.map((item) => ({
            name: item.name,
            value: item.coord,
            type: "branch",
            label: {
              show: true,
              position: item.labelPosition || "bottom",
              formatter: "{b}",
              color: "#FFC259",
              textShadow: "0px 0px 15.488px #FF7C1B",
              fontSize: 12,
              fontWeight: 500,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: [5, 10],
              borderRadius: 8,
            },
          })),
          symbol: `image://${yellowPosition}`,
          symbolSize: [24, 24],
          emphasis: {
            scale: 1.3,
          },
        },
      ],
    };
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表
    chartInstance.current = echarts.init(chartRef.current);

    // 注册世界地图
    try {
      echarts.registerMap("world", worldJson as any);
    } catch (e) {}

    // 设置配置
    const option = getChartOption();
    chartInstance.current.setOption(option);

    // 窗口大小改变时重新渲染
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  return (
    <div className={styles.worldMap}>
      <div ref={chartRef} className={styles.chart} />
    </div>
  );
};

export default GlobalBusinessMap;
