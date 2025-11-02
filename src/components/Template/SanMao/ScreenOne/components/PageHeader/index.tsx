/*
 * @Author: luomingxi
 * @Date: 2025-06-20 15:58:38
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-06-20 17:53:32
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
const PageHeader = ({ title = "数据可视化平台", className = "", style = {} }) => {
  return (
    <div className={`${styles.header} ${className}`} style={style}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};

export default PageHeader;

