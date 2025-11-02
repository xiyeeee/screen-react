import BasicRadar from "./BasicRadar";
import ChangeRadar from "./ChangeRadar";
import ColorfulRadar from "./ColorfulRadar";
export const chartList = [
  {
    key: "ColorfulRadar",
    name: "彩色雷达图",
    description: "彩色的雷达图表",
    category: "radar",
    position: "components/Radar/ColorfulRadar",
    component: ColorfulRadar,
  },
  {
    key: "BasicRadar",
    name: "基础雷达图",
    description: "简单的雷达图表",
    category: "radar",
    position: "components/Radar/BasicRadar",
    component: BasicRadar,
  },
  {
    key: "ChangeRadar",
    name: "轮播雷达",
    description: "有点小动态的轮播雷达",
    category: "radar",
    position: "components/Radar/ChangeRadar",
    component: ChangeRadar,
  },
];
