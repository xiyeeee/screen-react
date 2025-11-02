import CircleRunway from "./circleRunway";
import ColorfulArea from "./colorfulArea";
import FrameBugStatistics from "./FrameBugStatistics";
import NumberCard from "./NumberCard";
import WaterPolo from "./WaterPolo";
export const chartList = [
  {
    key: "CircleRunway",
    name: "圆形跑道",
    description: "圆形跑道动画效果",
    category: "other",
    position: "components/Other/circleRunway",
    component: CircleRunway,
  },
  {
    key: "ColorfulArea",
    name: "彩色区域",
    description: "彩色区域图表",
    category: "other",
    position: "components/Other/colorfulArea",
    component: ColorfulArea,
  },
  {
    key: "WaterPolo",
    name: "水球图",
    description: "水球百分比图表",
    category: "other",
    position: "components/Other/WaterPolo",
    component: WaterPolo,
  },
  {
    key: "NumberCard",
    name: "xxx工厂数字统计",
    description: "xxx工厂数字统计",
    category: "other",
    position: "components/Other/NumberCard",
    component: NumberCard,
  },
  {
    key: "FrameBugStatistics",
    name: "xxx工厂自定义故障统计",
    description: "xxx工厂自定义故障统计 , 绝对定位做的, 需要调整定位位置",
    category: "other",
    position: "components/Other/FrameBugStatistics",
    component: FrameBugStatistics,
  },
];
