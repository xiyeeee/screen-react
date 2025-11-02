import BasicBar from "./BasicBar";
import CompanySummary from "./companySummary/Business";
import HorizontalAngledBarChart from "./HorizontalAngledBarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import PowerStackBar from "./PowerStackBar";
import PowerStackBarRefresh from "./PowerStackBarRefresh";
import PyramidTrend from "./PyramidTrend";
import ScrollBarChart from "./scrollBarChart";
import StackBar from "./stackBar";
import StockDetailsBar from "./StockDetailsBar";
import SzBar from "./SzBar";
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
    name: "xxx工厂产能堆叠柱状图",
    description: "xxx工厂产能堆叠柱状图",
    category: "bar",
    position: "components/Bar/PowerStackBar",
    component: PowerStackBar,
  },
  {
    key: "PowerStackBarRefresh",
    name: "xxx工厂产能堆叠柱状图动态更新",
    description: "xxx工厂产能堆叠柱状图 , 可轮播 , 已对接接口数据",
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
