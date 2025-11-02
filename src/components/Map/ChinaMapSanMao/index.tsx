import mapJson from "@/assets/json/chinaGeo.json";
import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import bluePosition from "../GlobalBusinessMap/assets/bluePosition.png";
import titleBg from "../GlobalBusinessMap/assets/titlebg.png";
import yellowPosition from "../GlobalBusinessMap/assets/yellowPosition.png";

const ChinaMap = () => {
  // 兰州总部坐标
  const headquarters = {
    name: "xx有限公司",
    coord: [103.834303, 36.061089], // 兰州坐标
  };

  // 经济特区坐标数据
  const specialEconomicZones = {
    北京: [116.405285, 39.904989],
    河北: [114.502461, 38.045474],
    山西: [112.549248, 37.857014],
    内蒙古: [111.670801, 40.818311],
    辽宁: [123.429096, 41.796767],
    吉林: [125.3245, 43.886841],
    黑龙江: [126.642464, 45.756967],
    上海: [121.472644, 31.231706],
    江苏: [118.767413, 32.041544],
    浙江: [120.153576, 30.287459],
    安徽: [117.283042, 31.86119],
    福建: [119.306239, 26.075302],
    江西: [115.892151, 28.676493],
    山东: [117.000923, 36.675807],
    河南: [113.665412, 34.757975],
    湖北: [114.298572, 30.584355],
    湖南: [112.982279, 28.19409],
    重庆: [106.504962, 29.533155],
    四川: [104.065735, 30.659462],
    贵州: [106.713478, 26.578343],
    云南: [102.712251, 25.040609],
    西藏: [91.132212, 29.660361],
    陕西: [108.948024, 34.263161],
    甘肃: [103.823557, 36.058039],
    青海: [101.778916, 36.623178],
    宁夏: [106.278179, 38.46637],
    新疆: [87.617733, 43.792818],
    广东: [113.280637, 23.125178],
    广西: [108.320004, 22.82402],
    海南: [110.33119, 20.031971],
    香港: [114.173355, 22.320048],
    澳门: [113.54909, 22.198951],
  };

  // 各省份坐标数据
  const geoCoordMap = {
    北京: [116.405285, 39.904989],
    河北: [114.502461, 38.045474],
    山西: [112.549248, 37.857014],
    内蒙古: [111.670801, 40.818311],
    辽宁: [123.429096, 41.796767],
    吉林: [125.3245, 43.886841],
    黑龙江: [126.642464, 45.756967],
    上海: [121.472644, 31.231706],
    江苏: [118.767413, 32.041544],
    浙江: [120.153576, 30.287459],
    安徽: [117.283042, 31.86119],
    福建: [119.306239, 26.075302],
    江西: [115.892151, 28.676493],
    山东: [117.000923, 36.675807],
    河南: [113.665412, 34.757975],
    湖北: [114.298572, 30.584355],
    湖南: [112.982279, 28.19409],
    重庆: [106.504962, 29.533155],
    四川: [104.065735, 30.659462],
    贵州: [106.713478, 26.578343],
    云南: [102.712251, 25.040609],
    西藏: [91.132212, 29.660361],
    陕西: [108.948024, 34.263161],
    甘肃: [103.823557, 36.058039],
    青海: [101.778916, 36.623178],
    宁夏: [106.278179, 38.46637],
    新疆: [87.617733, 43.792818],
    广东: [113.280637, 23.125178],
    广西: [108.320004, 22.82402],
    海南: [110.33119, 20.031971],
    香港: [114.173355, 22.320048],
    澳门: [113.54909, 22.198951],
    台湾: [121.509062, 25.044332],
  };

  const data = [
    { name: "北京", value: 199 },
    { name: "天津", value: 42 },
    { name: "河北", value: 102 },
    { name: "山西", value: 81 },
    { name: "内蒙古", value: 47 },
    { name: "辽宁", value: 67 },
    { name: "吉林", value: 82 },
    { name: "黑龙江", value: 123 },
    { name: "上海", value: 24 },
    { name: "江苏", value: 92 },
    { name: "浙江", value: 114 },
    { name: "安徽", value: 109 },
    { name: "福建", value: 116 },
    { name: "江西", value: 91 },
    { name: "山东", value: 119 },
    { name: "河南", value: 137 },
    { name: "湖北", value: 116 },
    { name: "湖南", value: 114 },
    { name: "重庆", value: 91 },
    { name: "四川", value: 125 },
    { name: "贵州", value: 62 },
    { name: "云南", value: 83 },
    { name: "西藏", value: 9 },
    { name: "陕西", value: 80 },
    { name: "甘肃", value: 56 },
    { name: "青海", value: 10 },
    { name: "宁夏", value: 18 },
    { name: "新疆", value: 180 },
    { name: "广东", value: 123 },
    { name: "广西", value: 59 },
    { name: "海南", value: 14 },
    { name: "香港", value: 11 },
    { name: "澳门", value: 35 },
    { name: "台湾", value: 22 },
  ];

  // 生成连线数据 - 只与经济特区连线
  const linesData = Object.keys(specialEconomicZones).map((zoneName: string) => ({
    coords: [
      [headquarters.coord[0], headquarters.coord[1]], // 起点（兰州总部）- 移除偏移
      [(specialEconomicZones as any)[zoneName][0], (specialEconomicZones as any)[zoneName][1]], // 终点（经济特区）- 移除偏移
    ],
    name: zoneName,
    value: data.find((item) => item.name === zoneName)?.value || 0,
  }));

  // 生成散点数据 - 只显示经济特区
  const scatterData = Object.keys(specialEconomicZones).map((zoneName: string) => {
    // 城市位置偏移配置对象
    const cityOffsetConfig: { [key: string]: { offset: number[]; position: string } } = {
      甘肃: { offset: [0, -8], position: "bottom" },
      青海: { offset: [10, 10], position: "left" },
      安徽: { offset: [0, 8], position: "bottom" },
      山西: { offset: [0, 0], position: "bottom" },
      澳门: { offset: [0, -5], position: "bottom" },
      广东: { offset: [0, 10], position: "top" },
      香港: { offset: [-5, 0], position: "right" },
      上海: { offset: [-15, 0], position: "right" },
      江西: { offset: [0, 0], position: "bottom" },
      海南: { offset: [0, -10], position: "bottom" },
    };

    // 获取城市偏移量和位置
    const getCityConfig = (zoneName: string) => {
      return cityOffsetConfig[zoneName] || { offset: [0, 0], position: "inside" };
    };

    const { offset, position } = getCityConfig(zoneName);

    return {
      name: zoneName,
      value: [
        (specialEconomicZones as any)[zoneName][0],
        (specialEconomicZones as any)[zoneName][1] + 0.5,
      ], // 向上偏移0.5度
      dataValue: data.find((item) => item.name === zoneName)?.value || 0,
      label: {
        show: true,
        position: position,
        offset: offset,
        formatter: "{b}",
        color: "#FFC259",
        textShadow: "0px 0px 15.488px #FF7C1B",
        fontSize: 8,
        fontWeight: 500,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: [3, 8],
        borderRadius: 6,
      },
    };
  });

  // 图表配置
  const options = {
    backgroundColor: "transparent",
    title: {
      top: 10,
      text: "",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
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
                <div style="color: #fff; font-size: 12px;">数值: ${params.data.dataValue}</div>
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
      map: "china",
      aspectScale: 0.75,
      layoutCenter: ["54%", "50%"], // 从50%调整到55%，往右边移动
      layoutSize: "110%", // 从100%增加到120%，让地图更大
      roam: true,
      itemStyle: {
        normal: {
          borderColor: "rgba(147, 235, 248, 1)",
          borderWidth: 0.5,
          areaColor: "rgba(252, 10, 10, 0.32)",
          opacity: 0.5,
        },
        emphasis: {
          areaColor: "#2a333d",
        },
      },
      z: 1,
    },
    series: [
      {
        type: "map",
        map: "china",
        tooltip: {
          show: true,
        },
        label: {
          show: false, // 隐藏省份标签
        },
        aspectScale: 0.75,
        layoutCenter: ["54%", "50%"], // 与geo保持一致，往右边移动
        layoutSize: "110%", // 从100%增加到120%，保持与geo一致
        roam: false,
        itemStyle: {
          normal: {
            borderColor: "rgba(147, 235, 248, 0.6)",
            borderWidth: 0.8,
            areaColor: "rgba(29, 172, 243, 0.52)",
          },
          emphasis: {
            areaColor: "rgba(147, 235, 248, 50)",
          },
        },
        zlevel: 1,
        data: data,
      },
      {
        name: "业务连接",
        type: "lines",
        coordinateSystem: "geo",
        zlevel: 2,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.2,
          symbol: "arrow",
          symbolSize: 3,
          color: "#FFD93D",
        },
        data: linesData,
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
                color: "#FFC259",
              },
              {
                offset: 0.5,
                color: "#59d8cb",
              },
              {
                offset: 1,
                color: "#FFC259",
              },
            ],
          },
          width: 1,
          opacity: 1,
          curveness: 0.2,
        },
      },
      {
        // 兰州总部标记（蓝色图片）
        name: "总部",
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 3,
        data: [
          {
            name: headquarters.name,
            value: [headquarters.coord[0], headquarters.coord[1] + 1], // 向上偏移0.5度
            type: "headquarters",
          },
        ],
        symbol: `image://${bluePosition}`,
        symbolSize: [20, 20],
        label: {
          show: true,
          position: "left",
          offset: [15, -10],
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
        // 各省份散点（黄色图片）
        name: "业务地点",
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 3,
        data: scatterData,
        symbol: `image://${yellowPosition}`,
        symbolSize: [10, 10],
        emphasis: {
          scale: 1.3,
        },
      },
    ],
  };

  // 自定义onChartReady函数
  const handleChartReady = (chart: any) => {
    echarts.registerMap("china", mapJson as any);
    if (chart) {
      try {
        // 注册地图
        echarts.registerMap("china", mapJson as any);
      } catch (e) {}
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ChartBase option={options} id="chart_chinaMapSanMao" onChartReady={handleChartReady} />
    </div>
  );
};

export default ChinaMap;
