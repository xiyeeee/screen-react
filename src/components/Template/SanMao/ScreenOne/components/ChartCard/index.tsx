import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-24 16:41:38
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-06-26 16:40:32
 */
import styles from "./index.module.less";
import SecondPageHeader from "../SecondPageHeader";
import defaultImg from "../../assets/titleImg/second_title.png";
interface Props {
  [key: string]: any;
}

const ChartCard: React.FC<Props> = (props) => {
  const { children, title = "", className = "", style = {}, secondTitleImage } = props;

  return (
    <div className={`${styles.chartCard} ${className}`} style={style}>
      <SecondPageHeader title={title} backgroundImage={secondTitleImage || defaultImg} />
      <div className={styles.chartContainer}>{children}</div>
    </div>
  );
};

export default ChartCard;


