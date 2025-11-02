import CustomRowTableList from "./CustomRowTableList";
import LoomCapacityTrendTable from "./LoomCapacityTrendTable";
export const chartList = [
  {
    key: "LoomCapacityTrendTable",
    name: "轮播表格",
    description: "简单的轮播表格 , 使用了插件 react-slick , 参考antd的逻辑",
    category: "table",
    position: "components/Table/LoomCapacityTrendTable",
    component: LoomCapacityTrendTable,
    isChart: false,
  },
  {
    key: "CustomRowTableList",
    name: "轮播表格",
    description: "row的自定义",
    category: "table",
    position: "components/Table/CustomRowTableList",
    component: CustomRowTableList,
    isChart: false,
  },
];
