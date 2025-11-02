import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useEffect, useState } from "react";
import { geoCoordMapData } from "./map";
// 导入世界地图数据
import worldJson from "@/assets/json/worldGeo.json";

// 接口定义
interface FlightDataItem {
  name: string;
  value?: number;
}

interface FlightData {
  0: FlightDataItem;
  1: FlightDataItem;
}

interface ConvertedFlightData {
  fromName: string;
  toName: string;
  coords: number[][];
  value?: number;
}

interface ScatterDataItem {
  name: string;
  value: number[];
}

interface GeoCoordMap {
  [country: string]: number[];
}

interface WorldMapProps {
  title?: string;
  backgroundColor?: string;
  flightData?: FlightData[];
  startCity?: string;
  lineColors?: string[];
  subtitleText?: string;
  [key: string]: any;
}

const WorldMap: React.FC<WorldMapProps> = (props) => {
  const {
    title = "世界航线图",
    backgroundColor = "#013954",
    flightData = [
      [{ name: "广州" }, { name: "广州", value: 0 }],
      [{ name: "广州" }, { name: "基里巴斯", value: 30 }],
      [{ name: "广州" }, { name: "阿尔巴尼亚", value: 30 }],
      [{ name: "广州" }, { name: "布隆迪", value: 30 }],
      [{ name: "广州" }, { name: "白俄罗斯", value: 30 }],
      [{ name: "广州" }, { name: "不丹", value: 30 }],
      [{ name: "广州" }, { name: "美国,华盛顿", value: 100 }],
      [{ name: "广州" }, { name: "加拿大,温尼伯", value: 20 }],
      [{ name: "广州" }, { name: "俄罗斯,下诺夫哥罗德", value: 20 }],
      [{ name: "北京" }, { name: "巴西,阿雷格里港", value: 20 }],
    ],
    startCity = "广州",
    lineColors = ["#00eaff", "#00eaff", "#00eaff"],
    subtitleText = "出访境外",
    ...restProps
  } = props;

  // 使用state存储图表配置
  const [chartOption, setChartOption] = useState<echarts.EChartsOption | null>(null);

  // 飞机路径
  const planePath =
    "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

  // 将数据转换为地图可用的格式
  const convertData = (data: FlightData[]): ConvertedFlightData[] => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const fromCoord = (geoCoordMapData as GeoCoordMap)[dataItem[0].name];
      const toCoord = (geoCoordMapData as GeoCoordMap)[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value,
        });
      }
    }
    return res;
  };

  // 生成series配置
  const generateSeries = (): echarts.EChartsOption["series"] => {
    const series: echarts.SeriesOption[] = [];
    const cityName = startCity;
    const flightList = flightData;
    // 生成系列配置
    for (let i = 0; i < 1; i++) {
      // 飞线效果
      series.push({
        name: cityName + " Top3",
        type: "lines",
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: lineColors[i % lineColors.length],
          symbolSize: 3,
        },
        lineStyle: {
          color: lineColors[i % lineColors.length],
          width: 0,
          curveness: 0.2,
        },
        data: convertData(flightList),
      });

      // 箭头效果
      series.push({
        name: cityName + " Top3",
        type: "lines",
        zlevel: 2,
        symbol: ["none", "arrow"],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15,
        },
        lineStyle: {
          color: lineColors[i % lineColors.length],
          width: 1,
          opacity: 0.6,
          curveness: 0.2,
        },
        data: convertData(flightList),
      });

      // 散点效果
      series.push({
        name: cityName + " Top3",
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          brushType: "stroke",
        },
        label: {
          show: true,
          position: "bottom",
          formatter: "{b}",
          fontSize: 10,
          color: "#fff",
        },
        symbolSize: 10,
        itemStyle: {
          color: "#00eaff",
        },
        emphasis: {
          itemStyle: {
            areaColor: "#2B91B7",
          },
        },
        data: flightList
          .map(function (dataItem: FlightData) {
            if ((geoCoordMapData as GeoCoordMap).hasOwnProperty(dataItem[1].name)) {
              return {
                name: dataItem[1].name,
                value: (geoCoordMapData as GeoCoordMap)[dataItem[1].name].concat([
                  dataItem[1].value || 0,
                ]),
              };
            }
            return undefined;
          })
          .filter((item): item is ScatterDataItem => item !== undefined),
      });
    }
    return series as echarts.EChartsOption["series"];
  };

  // 在组件挂载后延迟设置图表配置
  useEffect(() => {
    // 延迟设置配置，确保echarts已完全初始化
    const timer = setTimeout(() => {
      const option = {
        backgroundColor: backgroundColor,
        title: {
          text: subtitleText,
          y: "top",
          top: "4%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 25,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params: any) {
            if (params.seriesType === "effectScatter") {
              return "线路：" + params.data.name + " " + params.data.value[2];
            } else if (params.seriesType === "lines") {
              return (
                params.data.fromName +
                " → " +
                params.data.toName +
                "<br />" +
                params.data.value +
                "人"
              );
            } else {
              return params.name;
            }
          },
        },
        nameMap: {
          "St. Pierre and Miquelon": "圣皮埃尔岛和密克隆岛",
          "S. Geo. and S. Sandw. Is.": "南乔治亚和南桑德威奇群岛",
          Niue: "纽埃",
          Tonga: "汤加",
          Kiribati: "基里巴斯",
          "Côte d'Ivoire": "科特迪瓦",
          Afghanistan: "阿富汗",
          Singapore: "新加坡",
          Angola: "安哥拉",
          Albania: "阿尔巴尼亚",
          "United Arab Emirates": "阿联酋",
          Argentina: "阿根廷",
          Armenia: "亚美尼亚",
          "French Southern and Antarctic Lands": "法属南半球和南极领地",
          Australia: "澳大利亚",
          Austria: "奥地利",
          Azerbaijan: "阿塞拜疆",
          Burundi: "布隆迪",
          Belgium: "比利时",
          Benin: "贝宁",
          "Burkina Faso": "布基纳法索",
          Bangladesh: "孟加拉国",
          Bulgaria: "保加利亚",
          "The Bahamas": "巴哈马",
          "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
          Belarus: "白俄罗斯",
          Belize: "伯利兹",
          Bermuda: "百慕大",
          Bolivia: "玻利维亚",
          Brazil: "巴西",
          Brunei: "文莱",
          Bhutan: "不丹",
          Botswana: "博茨瓦纳",
          "Central African Republic": "中非共和国",
          Canada: "加拿大",
          Switzerland: "瑞士",
          Chile: "智利",
          China: "中国",
          "Ivory Coast": "象牙海岸",
          Cameroon: "喀麦隆",
          "Dem. Rep. Congo": "刚果民主共和国",
          "Republic of the Congo": "刚果共和国",
          Colombia: "哥伦比亚",
          "Costa Rica": "哥斯达黎加",
          Cuba: "古巴",
          "Northern Cyprus": "北塞浦路斯",
          Cyprus: "塞浦路斯",
          "Czech Republic": "捷克共和国",
          Germany: "德国",
          Djibouti: "吉布提",
          Denmark: "丹麦",
          "Dominican Republic": "多明尼加共和国",
          Algeria: "阿尔及利亚",
          Ecuador: "厄瓜多尔",
          Egypt: "埃及",
          Eritrea: "厄立特里亚",
          Spain: "西班牙",
          Estonia: "爱沙尼亚",
          Ethiopia: "埃塞俄比亚",
          Finland: "芬兰",
          Fiji: "斐",
          "Falkland Islands": "福克兰群岛",
          France: "法国",
          Gabon: "加蓬",
          "United Kingdom": "英国",
          Georgia: "格鲁吉亚",
          Ghana: "加纳",
          Guinea: "几内亚",
          Gambia: "冈比亚",
          "Guinea Bissau": "几内亚比绍",
          Greece: "希腊",
          Greenland: "格陵兰",
          Guatemala: "危地马拉",
          "French Guiana": "法属圭亚那",
          Guyana: "圭亚那",
          Honduras: "洪都拉斯",
          Croatia: "克罗地亚",
          Haiti: "海地",
          Hungary: "匈牙利",
          Indonesia: "印度尼西亚",
          India: "印度",
          Ireland: "爱尔兰",
          Iran: "伊朗",
          Iraq: "伊拉克",
          Iceland: "冰岛",
          Israel: "以色列",
          Italy: "意大利",
          Jamaica: "牙买加",
          Jordan: "约旦",
          Japan: "日本",
          Kazakhstan: "哈萨克斯坦",
          Kenya: "肯尼亚",
          Kyrgyzstan: "吉尔吉斯斯坦",
          Cambodia: "柬埔寨",
          Kosovo: "科索沃",
          Kuwait: "科威特",
          Laos: "老挝",
          Lebanon: "黎巴嫩",
          Liberia: "利比里亚",
          Libya: "利比亚",
          "Sri Lanka": "斯里兰卡",
          Lesotho: "莱索托",
          Lithuania: "立陶宛",
          Luxembourg: "卢森堡",
          Latvia: "拉脱维亚",
          Morocco: "摩洛哥",
          Moldova: "摩尔多瓦",
          Madagascar: "马达加斯加",
          Mexico: "墨西哥",
          Macedonia: "马其顿",
          Mali: "马里",
          Myanmar: "缅甸",
          Montenegro: "黑山",
          Mongolia: "蒙古",
          Mozambique: "莫桑比克",
          Mauritania: "毛里塔尼亚",
          Malawi: "马拉维",
          Malaysia: "马来西亚",
          Namibia: "纳米比亚",
          "New Caledonia": "新喀里多尼亚",
          Niger: "尼日尔",
          Nigeria: "尼日利亚",
          Nicaragua: "尼加拉瓜",
          Netherlands: "荷兰",
          Norway: "挪威",
          Nepal: "尼泊尔",
          "New Zealand": "新西兰",
          Oman: "阿曼",
          Pakistan: "巴基斯坦",
          Panama: "巴拿马",
          Peru: "秘鲁",
          Philippines: "菲律宾",
          "Papua New Guinea": "巴布亚新几内亚",
          Poland: "波兰",
          "Puerto Rico": "波多黎各",
          "North Korea": "北朝鲜",
          Portugal: "葡萄牙",
          Paraguay: "巴拉圭",
          Qatar: "卡塔尔",
          Romania: "罗马尼亚",
          Russia: "俄罗斯",
          Rwanda: "卢旺达",
          "Western Sahara": "西撒哈拉",
          "Saudi Arabia": "沙特阿拉伯",
          Sudan: "苏丹",
          "S. Sudan": "南苏丹",
          Senegal: "塞内加尔",
          "Solomon Islands": "所罗门群岛",
          "Sierra Leone": "塞拉利昂",
          "El Salvador": "萨尔瓦多",
          Somaliland: "索马里兰",
          Somalia: "索马里",
          "Republic of Serbia": "塞尔维亚",
          Suriname: "苏里南",
          Slovakia: "斯洛伐克",
          Slovenia: "斯洛文尼亚",
          Sweden: "瑞典",
          Swaziland: "斯威士兰",
          Syria: "叙利亚",
          Chad: "乍得",
          Togo: "多哥",
          Thailand: "泰国",
          Tajikistan: "塔吉克斯坦",
          Turkmenistan: "土库曼斯坦",
          "East Timor": "东帝汶",
          "Trinidad and Tobago": "特里尼达和多巴哥",
          Tunisia: "突尼斯",
          Turkey: "土耳其",
          "United Republic of Tanzania": "坦桑尼亚",
          Uganda: "乌干达",
          Ukraine: "乌克兰",
          Uruguay: "乌拉圭",
          "United States": "美国",
          Uzbekistan: "乌兹别克斯坦",
          Venezuela: "委内瑞拉",
          Vietnam: "越南",
          Vanuatu: "瓦努阿图",
          "West Bank": "西岸",
          Yemen: "也门",
          "South Africa": "南非",
          Zambia: "赞比亚",
          Korea: "韩国",
          Tanzania: "坦桑尼亚",
          Zimbabwe: "津巴布韦",
          Congo: "刚果",
          "Central African Rep.": "中非",
          Serbia: "塞尔维亚",
          "Bosnia and Herz.": "波黑",
          "Czech Rep.": "捷克",
          "W. Sahara": "西撒哈拉",
          "Lao PDR": "老挝",
          "Dem. Rep. Korea": "朝鲜",
          "Falkland Is.": "福克兰群岛",
          "Timor-Leste": "东帝汶",
          "Solomon Is.": "所罗门群岛",
          Palestine: "巴勒斯坦",
          "N. Cyprus": "北塞浦路斯",
          Aland: "奥兰群岛",
          "Fr. S. Antarctic Lands": "法属南半球和南极陆地",
          Mauritius: "毛里求斯",
          Comoros: "科摩罗",
          "Eq. Guinea": "赤道几内亚",
          "Guinea-Bissau": "几内亚比绍",
          "Dominican Rep.": "多米尼加",
          "Saint Lucia": "圣卢西亚",
          Dominica: "多米尼克",
          "Antigua and Barb.": "安提瓜和巴布达",
          "U.S. Virgin Is.": "美国原始岛屿",
          Montserrat: "蒙塞拉特",
          Grenada: "格林纳达",
          Barbados: "巴巴多斯",
          Samoa: "萨摩亚",
          "American Samoa": "东萨摩亚",
          Bahamas: "巴哈马",
          "Cayman Is.": "开曼群岛",
          "Faeroe Is.": "法罗群岛",
          "IsIe of Man": "马恩岛",
          Malta: "马耳他共和国",
          Jersey: "泽西",
          "Cape Verde": "佛得角共和国",
          "Turks and Caicos Is.": "特克斯和凯科斯群岛",
          "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
          "United States of America": "美国",
        },
        geo: {
          type: "map",
          map: "world",
          zoom: 2, // 当前视角的缩放比例
          roam: true, // 是否开启平游或缩放
          aspectScale: 0.86,
          layoutCenter: ["50%", "50%"], // 地图位置
          layoutSize: "100%",
          regions: [], // 添加空的regions数组以避免未定义错误
          label: {
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(147, 235, 248, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(143, 235, 231, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(143, 235, 231, .2)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: "rgba(128, 217, 248, 1)",
            },
            emphasis: {
              areaColor: "#389bb7",
            },
          },
        },
        series: generateSeries(),
      };
      setChartOption(option as echarts.EChartsOption);
    }, 500); // 延迟500毫秒

    return () => clearTimeout(timer);
  }, [backgroundColor, subtitleText]);

  // 自定义onChartReady函数
  const handleChartReady = (chart: any) => {
    if (chart) {
      try {
        // 注册世界地图
        echarts.registerMap("world", worldJson as any);
      } catch (e) {}
    }
  };

  return (
    <ChartBase
      title={title}
      option={chartOption || {}} // 如果chartOption为null则传递空对象
      id="chart_worldmap"
      onChartReady={handleChartReady}
      {...restProps}
    />
  );
};

export default WorldMap;
