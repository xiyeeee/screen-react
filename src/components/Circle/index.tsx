import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-28 15:50:50
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-08 09:05:49
 */
import RotateColorful from "./rotateColorful";
import Rainbow from "./rainbow";
import CircleNesting from "./circleNesting";
import ScanRadius from "./ScanRadius";

export const chartList = [
  {
    key: "RotateColorful",
    name: "旋转彩色圆环",
    description: "旋转动画的彩色圆环图",
    category: "circle",
    position: "components/Circle/rotateColorful",
    component: RotateColorful,
  },
  {
    key: "Rainbow",
    name: "彩虹圆环",
    description: "彩虹色彩的圆环图",
    category: "circle",
    position: "components/Circle/rainbow",
    component: Rainbow,
  },
  {
    key: "CircleNesting",
    name: "嵌套圆环",
    description: "多层嵌套的圆环图",
    category: "circle",
    position: "components/Circle/circleNesting",
    component: CircleNesting,
  },
  {
    key: "ScanRadius",
    name: "扫描雷达",
    description: "扫描动画的雷达圆环",
    category: "circle",
    position: "components/Circle/ScanRadius",
    component: ScanRadius,
  },
];

