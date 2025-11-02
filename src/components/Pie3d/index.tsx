import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-28 15:50:50
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-08 09:07:39
 */
import CustomLegendPie3d from "./CustomLegendPie3d";
import Base3dPie from "./Base3dPie";
import ModelRatioPie3d from "./ModelRatioPie3d";

export const chartList = [
  {
    key: "Base3dPie",
    name: "基础3D饼图",
    description: "基础的3D饼图效果",
    category: "3dPie",
    position: "components/Pie3d/Base3dPie",
    component: Base3dPie,
  },
  {
    key: "CustomLegendPie3d",
    name: "自定义图例3D饼图",
    description: "带自定义图例的3D饼图",
    category: "3dPie",
    position: "components/Pie3d/CustomLegendPie3d",
    component: CustomLegendPie3d,
  },
  {
    key: "ModelRatioPie3d",
    name: "三毛工厂型号占比3D饼图",
    description: "三毛工厂型号占比3D饼图",
    category: "3dPie",
    position: "components/Pie3d/ModelRatioPie3d",
    component: ModelRatioPie3d,
  },
];

