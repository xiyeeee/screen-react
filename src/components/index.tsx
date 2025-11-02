// 导入所有分类的图表组件配置
import { chartList as barCharts } from "./Bar";
import { chartList as bar3dCharts } from "./Bar3d";
import { chartList as circleCharts } from "./Circle";
import { chartList as gaugeCharts } from "./Gauge";
import { chartList as lineCharts } from "./Line";
import { chartList as linkCharts } from "./LinkChart";
import { chartList as mapCharts } from "./Map";
import { chartList as otherCharts } from "./Other";
import { chartList as pictorialBarCharts } from "./PictorialBar";
import { chartList as pieCharts } from "./Pie";
import { chartList as pie3dCharts } from "./Pie3d";
import { chartList as radarCharts } from "./Radar";
import { chartList as scatterCharts } from "./Scatter";
import { chartList as table } from "./Table";
import { chartList as Template } from "./Template";

// 合并所有图表配置
export const allChartList = [
  ...barCharts,
  ...pictorialBarCharts,
  ...bar3dCharts,
  ...circleCharts,
  ...gaugeCharts,
  ...lineCharts,
  ...linkCharts,
  ...mapCharts,
  ...otherCharts,
  ...pieCharts,
  ...pie3dCharts,
  ...radarCharts,
  ...scatterCharts,
  ...table,
  ...Template,
];

// 按分类导出（中文分类名，便于理解和使用）
export const chartsByCategory = {
  柱状图: barCharts,
  象形柱状图: pictorialBarCharts,
  饼图: pieCharts,
  折线图: lineCharts,
  圆环图: circleCharts,
  雷达图: radarCharts,
  散点图: scatterCharts,
  仪表盘: gaugeCharts,
  地图: mapCharts,
  联动图: linkCharts,
  表格: table,
  其他: otherCharts,
  "3D饼图": pie3dCharts,
  "3D柱状图": bar3dCharts,
  模板: Template,
};

// 中文到英文的分类映射
export const categoryEnglishMap = {
  柱状图: "Bar Charts",
  象形柱状图: "PictorialBar Charts",
  饼图: "Pie Charts",
  折线图: "Line Charts",
  圆环图: "Circle Charts",
  雷达图: "Radar Charts",
  散点图: "Scatter Charts",
  仪表盘: "Gauge Charts",
  地图: "Map Charts",
  联动图: "Link Charts",
  其他: "Other Charts",
  表格: "table",
  "3D饼图": "3D Pie Charts",
  "3D柱状图": "3D Bar Charts",
  模板: "Templates",
};

// 获取所有分类列表
export const categoryList = Object.keys(chartsByCategory);

// 获取分类统计信息
export const getCategoryStats = () => {
  const stats = {};
  Object.entries(chartsByCategory).forEach(([category, charts]) => {
    stats[category] = {
      count: charts.length,
      charts: charts.map((chart) => chart.name),
    };
  });
  return stats;
};

// 根据分类获取图表列表的工具函数
export const getChartsByCategory = (category: string) => {
  return chartsByCategory[category] || [];
};

// 根据key获取特定图表的工具函数
export const getChartByKey = (key: string) => {
  return allChartList.find((chart) => chart.key === key);
};

// 搜索图表（支持名称和描述搜索）
export const searchCharts = (keyword: string) => {
  if (!keyword) return allChartList;
  const lowerKeyword = keyword.toLowerCase();
  return allChartList.filter(
    (chart) =>
      chart.name.toLowerCase().includes(lowerKeyword) ||
      chart.description.toLowerCase().includes(lowerKeyword),
  );
};

// 默认导出所有图表列表
export default allChartList;
