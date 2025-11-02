import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-28 15:50:50
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-08 09:07:49
 */
import ColorfulRadar from "./ColorfulRadar";
import BasicRadar from "./BasicRadar";
import ChangeRadar from "./ChangeRadar";
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

