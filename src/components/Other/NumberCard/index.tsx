/*
 * @Author: luomingxi
 * @Date: 2025-06-25 09:50:00
 * @Description: 数量卡片组件
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-08 09:06:51
 */

import React from "react";
import numberBg from "./assets/numberBg.png";
import numberFooter from "./assets/numberFooter.png";
import styles from "./index.module.less";

interface Props {
  [key: string]: any;
}

const NumberCard: React.FC<Props> = (props) => {
  const { title = "上电设备数量", number = 999, unit = "个", className = "", style = {} } = props;

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {/* 顶部背景图 */}
      <div
        className={styles.topBg}
        style={{
          backgroundImage: `url(${numberBg})`,
        }}
      >
        <div className={styles.title}>{title}</div>
      </div>

      {/* 底部背景图 */}
      <div
        className={styles.bottomBg}
        style={{
          backgroundImage: `url(${numberFooter})`,
        }}
      >
        <div className={styles.number}>
          {number} {unit}
        </div>
      </div>
    </div>
  );
};

export default NumberCard;


