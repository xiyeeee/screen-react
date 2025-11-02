/*
 * @Author: luomingxi
 * @Date: 2025-06-28 15:50:50
 * @Description:
 * @LastEditors: Nikehu
 * @LastEditTime: 2025-07-28 18:21:02
 */
import ChinaMapSanMao from "./ChinaMapSanMao";
import ChinaMapTemplate from "./chinaMapTemplate";
import GlobalBusinessMap from "./GlobalBusinessMap";
import WorldMap from "./worldMap";
export const chartList = [
  {
    key: "WorldMap",
    name: "世界地图",
    description: "世界地图可视化",
    category: "map",
    position: "components/Map/worldMap",
    component: WorldMap,
  },
  {
    key: "GlobalBusinessMap",
    name: "xxx工厂地图",
    description: "xxx工厂地图",
    category: "map",
    position: "components/Map/GlobalBusinessMap",
    component: GlobalBusinessMap,
  },
  {
    key: "ChinaMap",
    name: "中国地图",
    description: "基础中国地图",
    position: "components/Map/chinaMap",
    category: "map",
    component: ChinaMapTemplate,
  },
  {
    key: "ChinaMapSanMao",
    name: "中国地图",
    description: "中国地图可视化(xxx工厂地图)",
    position: "components/Map/ChinaMapSanMao",
    category: "map",
    component: ChinaMapSanMao,
  },
  // {
  //   key: "ChinaMapAir",
  //   name: "中国地图",
  //   description: "中国货运航线地图",
  //   position: "components/Map/chinaMap_Air",
  //   category: "map",
  //   component: ChinaMapAir,
  // },
];
