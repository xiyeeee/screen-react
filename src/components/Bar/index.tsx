import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-28 10:53:45
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-08 09:04:47
 */
import BasicBar from "./BasicBar";
import StackBar from "./stackBar";
import CompanySummary from "./companySummary/Business";
import SzBar from "./SzBar";
import PyramidTrend from "./PyramidTrend";
import HorizontalBarChart from "./HorizontalBarChart";
import PowerStackBar from "./PowerStackBar";
import HorizontalAngledBarChart from "./HorizontalAngledBarChart";
import PowerStackBarRefresh from "./PowerStackBarRefresh";
import ScrollBarChart from "./scrollBarChart";
import StockDetailsBar from "./StockDetailsBar";
export const chartList = [
  {
    key: "BasicBar",
    name: "基础柱状图",
    description: "简单的柱状图表",
    category: "bar",
    position: "components/Bar/BasicBar",
    component: BasicBar,
  },
  {
    key: "StackBar",
    name: "堆叠柱状图",
    description: "堆叠显示的柱状图",
    category: "bar",
    position: "components/Bar/stackBar",
    component: StackBar,
  },
  {
    key: "CompanySummary",
    name: "企业汇总图",
    description: "企业业务汇总柱状图",
    category: "bar",
    position: "components/Bar/companySummary/Business",
    component: CompanySummary,
  },
  {
    key: "SzBar",
    name: "SZ柱状图",
    description: "SZ样式柱状图",
    category: "bar",
    position: "components/Bar/SzBar",
    component: SzBar,
  },
  {
    key: "PyramidTrend",
    name: "金字塔趋势图",
    description: "金字塔形态的趋势柱状图",
    category: "bar",
    position: "components/Bar/PyramidTrend",
    component: PyramidTrend,
  },
  {
    key: "HorizontalBarChart",
    name: "横向无限滚动柱状图",
    description: "横向无限滚动柱状图",
    category: "bar",
    position: "components/Bar/HorizontalBarChart",
    component: HorizontalBarChart,
  },
  {
    key: "HorizontalAngledBarChart",
    name: "斜角柱状图",
    description: "虽然他斜了, 但是他也动不了了",
    category: "bar",
    position: "components/Bar/HorizontalAngledBarChart",
    component: HorizontalAngledBarChart,
  },
  {
    key: "PowerStackBar",
    name: "三毛工厂产能堆叠柱状图",
    description: "三毛工厂产能堆叠柱状图",
    category: "bar",
    position: "components/Bar/PowerStackBar",
    component: PowerStackBar,
  },
  {
    key: "PowerStackBarRefresh",
    name: "三毛工厂产能堆叠柱状图动态更新",
    description: "三毛工厂产能堆叠柱状图 , 可轮播 , 已对接接口数据",
    category: "bar",
    position: "components/Bar/PowerStackBarRefresh",
    component: PowerStackBarRefresh,
  },
  {
    key: "ScrollBarChart",
    name: "滚动柱状图",
    description: "滚动柱状图",
    category: "bar",
    position: "components/Bar/scrollBarChart",
    component: ScrollBarChart,
  },
  {
    key: "StockDetailsBar",
    name: "库存详情柱状图",
    description: "库存详情柱状图",
    category: "bar",
    position: "components/Bar/StockDetailsBar",
    component: StockDetailsBar,
  },
];

