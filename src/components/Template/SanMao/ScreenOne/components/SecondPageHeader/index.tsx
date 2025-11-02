/*
 * @Author: luomingxi
 * @Date: 2025-06-24 16:41:38
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-06-26 17:14:38
 */
import React from "react";
import styles from "./index.module.less";

/**
 * 页面顶部标题组件
 * @param {Object} props
 * @param {string} props.title - 标题文本
 * @param {string} [props.className] - 自定义类名
 * @param {Object} [props.style] - 自定义样式
 * @returns {React.ReactNode}
 */
const PageHeader = ({
  title = "数据可视化平台",
  className = "",
  backgroundImage = "",
  style = {},
}) => {
  return (
    <div className={`${styles.header} ${className}`}>
      <div
        className={styles.titleWrapper}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          ...style,
        }}
      >
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;

