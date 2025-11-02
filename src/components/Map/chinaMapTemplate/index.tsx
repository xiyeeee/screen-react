import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useEffect, useState } from "react";
// 引入配置数据
import mapConfig from "@/assets/json/chinaGeo.json";

interface Props {
  [key: string]: any;
}

const ChinaMapTemplate: React.FC<Props> = (props) => {
  const {
    title = "中国地图",
    mapUrl = "https://img.isqqw.com/profile/upload/2025/04/01/1097d567-f39b-45fe-aea7-6876d2639b5c.json",
    hubLists = [
      {
        name: "京津冀枢纽",
        id: 1,
        lat: [116.41, 39.9],
        children: [{ name: "张家口市", id: 11, lat: [114.89, 40.77] }],
      },
      {
        name: "粤港澳大湾区枢纽",
        id: 2,
        lat: [113.26, 24.15],
        children: [{ name: "韶关市", id: 21, lat: [113.6, 24.81] }],
      },
      {
        name: "贵州枢纽",
        id: 3,
        lat: [106.49, 26.47],
        children: [{ name: "贵安市", id: 31, lat: [106.49, 26.47] }],
      },
      {
        name: "甘肃枢纽",
        id: 4,
        lat: [107.63, 35.69],
        children: [{ name: "庆阳市", id: 41, lat: [107.63, 35.69] }],
      },
      {
        name: "宁夏枢纽",
        id: 5,
        lat: [105.19, 37.52],
        children: [{ name: "中卫市", id: 51, lat: [105.19, 37.52] }],
      },
      {
        name: "成渝枢纽",
        id: 6,
        lat: [104.07, 30.57],
        children: [
          { name: "成都市", id: 61, lat: [104.07, 30.7] },
          { name: "简阳市", id: 62, lat: [104.55, 30.38] },
          { name: "重庆市", id: 63, lat: [106.55, 29.55] },
        ],
      },
      {
        name: "内蒙古枢纽",
        id: 7,
        lat: [111.67, 40.83],
        children: [
          { name: "呼和浩特市", id: 71, lat: [111.67, 40.83] },
          { name: "乌兰察布市", id: 72, lat: [113.16, 40.96] },
        ],
      },
      {
        name: "长三角枢纽",
        id: 8,
        lat: [118.5, 31.25],
        children: [
          { name: "芜湖市", id: 81, lat: [118.39, 31.35] },
          { name: "上海市", id: 82, lat: [121.46, 31.25] },
          { name: "苏州市", id: 83, lat: [120.61, 31.33] },
          { name: "嘉兴市", id: 84, lat: [120.76, 30.76] },
        ],
      },
    ],
    targetPoints = [
      {
        id: 7,
        name: "张家口市",
        delay: [{ operator: "移动", delay: 888 }],
        lat: [114.53, 40.48],
      },
      {
        id: 296,
        name: "上海市",
        delay: [{ operator: "移动", delay: 888 }],
        lat: [121.29, 31.14],
      },
      {
        id: 185,
        name: "韶关市",
        delay: [{ operator: "移动", delay: 888 }],
        lat: [113.37, 24.48],
      },
      {
        id: 223,
        name: "成都市",
        delay: [{ operator: "移动", delay: 888 }],
        lat: [104.04, 30.4],
      },
      {
        id: 280,
        name: "庆阳市",
        delay: [{ operator: "移动", delay: 888 }],
        lat: [107.63, 35.73],
      },
      {
        id: 289,
        name: "中卫市",
        delay: [{ operator: "移动", delay: 888 }],
        lat: [105.2, 37.5],
      },
      {
        id: 23,
        name: "呼和浩特市",
        delay: [{ operator: "移动", delay: 888 }],
        lat: [111.41, 40.48],
      },
    ],
    seriesLineData = [
      [{ coord: [106.59, 26.43] }, { coord: [114.53, 40.48] }],
      [{ coord: [106.59, 26.43] }, { coord: [121.29, 31.14] }],
      [{ coord: [106.59, 26.43] }, { coord: [113.37, 24.48] }],
      [{ coord: [106.59, 26.43] }, { coord: [104.04, 30.4] }],
      [{ coord: [106.59, 26.43] }, { coord: [107.63, 35.73] }],
      [{ coord: [106.59, 26.43] }, { coord: [105.2, 37.5] }],
      [{ coord: [106.59, 26.43] }, { coord: [111.41, 40.48] }],
    ],
    loopData = {
      center: [106.49, 26.47],
      green: [
        [105.762007, 24.747506],
        [109.809413, 26.084192],
        [109.14711, 27.2084],
        [109.073521, 28.516449],
        [107.38097, 29.486886],
        [105.467651, 28.06045],
        [103.925728, 27.92709],
        [103.407153, 25.417722],
        [104.955976, 24.677491],
      ],
      blue: [
        [99.501249, 25.246824],
        [105.535562, 23.222448],
        [112.894481, 24.440989],
        [114.881389, 31.805613],
        [105.167616, 32.991861],
        [99.942784, 28.804969],
      ],
      red: [
        [101.046622, 37.692576],
        [95.601022, 28.54536],
        [98.323822, 24.036098],
        [112.894481, 22.266822],
        [121.13647, 31.30146],
        [115.322924, 39.539997],
      ],
    },
    ...restProps
  } = props;

  // 辅助函数 - 计算位置
  const getPosition = (dot1: number[], dot2: number[], angle: number) => {
    const x1 = dot1[0];
    const y1 = dot1[1];
    const x2 = dot2[0];
    const y2 = dot2[1];
    const PI = Math.PI;

    let xAngle = Math.atan2(y2 - y1, x2 - x1);
    xAngle = (360 * xAngle) / (2 * PI);
    const L = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
    const L2 = L / 2 / Math.cos((angle * 2 * PI) / 360);

    const val1: { x: number; y: number } = {
      x: x1 + Math.round(L2 * Math.cos(((xAngle + angle) * 2 * PI) / 360)),
      y: y1 + Math.round(L2 * Math.sin(((xAngle + angle) * 2 * PI) / 360)),
    };
    return [val1.x, val1.y];
  };

  // 辅助函数 - 生成路径
  const generatePath = (api: any, coords: number[][]) => {
    const points = [];
    for (let i = 0; i < coords.length; i++) {
      points.push(api.coord(coords[i]));
    }
    const temp = [];
    for (let i = 0; i < points.length; i++) {
      const start = i;
      let end = i + 1;
      if (start === points.length - 1) {
        end = 0;
      }
      temp.push(
        `${start === 0 ? "M" : "L"}${points[start][0]} ${points[start][1]} Q${
          getPosition(points[start], points[end], 15)[0]
        } ${getPosition(points[start], points[end], 15)[1]} ${points[end][0]} ${points[end][1]} ${
          end === 0 ? "Z" : ""
        }`,
      );
    }
    return temp.join(" ");
  };

  // 自定义渲染函数
  const renderItem = (params: any, api: any, loopData: any) => {
    const greenCoords = loopData?.green ?? [];
    const blueCoords = loopData?.blue ?? [];
    const redCoords = loopData?.red ?? [];
    const center = loopData?.center ?? [];
    const temp = [
      {
        coords: greenCoords,
        color: "0,255,54",
        z: 3,
      },
      {
        coords: blueCoords,
        color: "0,233,247",
        z: 2,
      },
      {
        coords: redCoords,
        color: "255,13,0",
        z: 1,
      },
    ];
    return {
      type: "group",
      children: temp.map((item) => {
        return {
          type: "path",
          shape: {
            d: generatePath(api, item.coords),
          },
          z2: item.z,
          originX: api.coord(center)[0],
          originY: api.coord(center)[1],
          keyframeAnimation: {
            duration: 500,
            keyframes: [
              {
                percent: 0,
                easing: "sinusoidalInOut",
                scaleX: 0,
                scaleY: 0,
              },
              {
                percent: 0.5,
                easing: "sinusoidalInOut",
                scaleX: 0.1,
                scaleY: 0.1,
              },
              {
                percent: 1,
                easing: "sinusoidalInOut",
                scaleX: 1,
                scaleY: 1,
              },
            ],
          },
          transition: "shape",
          style: api.style({
            lineWidth: 2,
            fill: `rgba(${item.color},0.5)`,
            lineDash: 6,
            lineJoin: "round",
            lineCap: "round",
            stroke: `rgba(${item.color},1)`,
          }),
        };
      }),
    };
  };

  const [mapLoaded, setMapLoaded] = useState(false);

  // 加载地图数据
  useEffect(() => {
    // 否则直接使用本地数据
    echarts.registerMap("china2", mapConfig as any);
    setMapLoaded(true);
  }, []);

  // 如果地图数据未加载完成，显示加载中
  if (!mapLoaded) {
    return <div>地图数据加载中...</div>;
  }

  // 配置项
  const option = {
    animation: true,
    animationDuration: 1000,
    backgroundColor: "transparent",
    animationEasing: "quinticOut",
    geo: [
      {
        layoutCenter: ["50%", "50%"], //位置
        layoutSize: "150%", //大小
        center: [103.6, 35.4],
        show: true,
        map: "china2",
        roam: false,
        zoom: 0.8,
        aspectScale: 0.74,
        label: {
          normal: {
            show: false,
            textStyle: {
              color: "#fff",
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        itemStyle: {
          normal: {
            areaColor: {
              type: "linear",
              x: 1200,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(3,27,78,0.75)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(58,149,253,0.75)", // 50% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
            borderColor: "#c0f3fb",
            borderWidth: 1,
            shadowColor: "#8cd3ef",
            shadowOffsetY: 10,
            shadowBlur: 120,
          },
          emphasis: {
            areaColor: "rgba(0,254,233,0.6)",
          },
        },
        emphasis: {
          itemStyle: {
            areaColor: "#59FFCE",
          },
        },
        zlevel: 3,
      },
      {
        type: "map",
        map: "china2",
        zlevel: -1,
        aspectScale: 0.74,
        zoom: 0.8,
        layoutCenter: ["50%", "51%"],
        layoutSize: "150%",
        center: [103.6, 35.4],
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: "rgba(58,149,253,0.8)",
            shadowColor: "rgba(172, 122, 255,0.5)",
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: "rgba(5,21,35,0.1)",
          },
        },
      },
      {
        type: "map",
        map: "china2",
        zlevel: -2,
        aspectScale: 0.74,
        zoom: 0.8,
        layoutCenter: ["50%", "52%"],
        layoutSize: "150%",
        center: [103.6, 35.4],
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: "rgba(58,149,253,0.6)",
            shadowColor: "rgba(65, 214, 255,1)",
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: "transparent",
          },
        },
      },
      {
        type: "map",
        map: "china2",
        zlevel: -3,
        aspectScale: 0.74,
        zoom: 0.8,
        layoutCenter: ["50%", "53%"],
        layoutSize: "150%",
        center: [103.6, 35.4],
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: "rgba(58,149,253,0.4)",
            shadowColor: "rgba(58,149,253,1)",
            shadowOffsetY: 15,
            shadowBlur: 10,
            areaColor: "transparent",
          },
        },
      },
      {
        type: "map",
        map: "china2",
        zlevel: -4,
        aspectScale: 0.74,
        zoom: 0.65,
        layoutCenter: ["50%", "54%"],
        layoutSize: "150%",
        center: [103.6, 35.4],
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 5,
            borderColor: "rgba(5,9,57,0.8)",
            shadowColor: "rgba(29, 111, 165,0.8)",
            shadowOffsetY: 15,
            shadowBlur: 10,
            areaColor: "rgba(5,21,35,0.1)",
          },
        },
      },
    ],
    series: [],
  };

  return <ChartBase title={title} option={option} id="chart_chinamap" {...restProps} />;
};

export default ChinaMapTemplate;
