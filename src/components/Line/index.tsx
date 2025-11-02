import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-28 15:50:50
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-08 09:06:04
 */
import BasicLine from "./BasicLine";
import DynamicLine from "./DynamicLine";
import TrendLeftLine from "./TrendLeftLine";
import ScrollLineChart from "./scrollLineChart";
export const chartList = [
  {
    key: "BasicLine",
    name: "基础折线图",
    description: "简单的折线图表",
    category: "line",
    position: "components/Line/BasicLine",
    component: BasicLine,
  },
  {
    key: "DynamicLine",
    name: "动态折线图",
    description: "带动画效果的折线图",
    category: "line",
    position: "components/Line/DynamicLine",
    component: DynamicLine,
  },
  {
    key: "TrendLeftLine",
    name: "三毛工厂趋势折线图",
    description: "三毛工厂折线图",
    category: "line",
    position: "components/Line/TrendLeftLine",
    component: TrendLeftLine,
  },
  {
    key: "ScrollLineChart",
    name: "滚动折线图",
    description: "滚动折线图",
    category: "line",
    position: "components/Line/scrollLineChart",
    component: ScrollLineChart,
  },
];

