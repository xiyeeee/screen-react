import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-28 15:50:50
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-08 09:05:09
 */
import BaseBar3d from "./BaseBar3d";
import CylinderBarChart from "./CylinderBarChart";
import Fake3dBar from "./Fake3dBar";
import CylinderBarChartScroll from "./CylinderBarChartScroll";
import BarCube from "./BarCube";
import ClothStockDetailBar from "./ClothStockDetailBar";
export const chartList = [
  {
    key: "BaseBar3d",
    name: "3D立体柱状图",
    description: "3D效果的立体柱状图",
    category: "3dBar",
    position: "components/Bar3d/BaseBar3d",
    component: BaseBar3d,
  },
  {
    key: "CylinderBarChart",
    name: "圆柱柱状图",
    description: "圆柱柱状图",
    category: "3dBar",
    position: "components/Bar3d/CylinderBarChart",
    component: CylinderBarChart,
  },
  {
    key: "Fake3dBar",
    name: "圆柱柱状图",
    description: "圆柱柱状图",
    category: "3dBar",
    position: "components/Bar3d/Fake3dBar",
    component: Fake3dBar,
  },
  {
    key: "CylinderBarChartScroll",
    name: "圆柱柱状图轮播",
    description: "圆柱柱状图轮播",
    category: "3dBar",
    position: "components/Bar3d/CylinderBarChartScroll",
    component: CylinderBarChartScroll,
  },
  {
    key: "BarCube",
    name: "立方体柱状图",
    description: "立方体柱状图(可滚动,也可以不滚动)",
    category: "3dBar",
    position: "components/Bar3d/BarCube",
    component: BarCube,
  },
  {
    key: "ClothStockDetailBar",
    name: "衣物库存详情柱状图",
    description: "衣物库存详情柱状图",
    category: "3dBar",
    position: "components/Bar3d/ClothStockDetailBar",
    component: ClothStockDetailBar,
  },
];

