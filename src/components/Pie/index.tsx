import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-28 15:50:50
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-08 09:07:10
 */
import BasicPie from "./BasicPie";
import ScalePie from "./scalePie";

export const chartList = [
  {
    key: "BasicPie",
    name: "基础饼图",
    description: "简单的饼图表",
    category: "pie",
    position: "components/Pie/BasicPie",
    component: BasicPie,
  },
  {
    key: "ScalePie",
    name: "比例饼图",
    description: "带比例显示的饼图",
    category: "pie",
    position: "components/Pie/scalePie",
    component: ScalePie,
  },
];

