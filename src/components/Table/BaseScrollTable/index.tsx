/*
 * @Author: luomingxi
 * @Date: 2025-06-24 16:41:38
 * @Description: 现代化滚动表格组件 - 支持key-value数据和render函数
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-31 11:14:50
 */
import classNames from "classnames";

// 接口定义
interface ColumnConfig {
  title: string;
  dataIndex: string;
  key?: string;
  render?: (text: any, record: Record<string, any>, rowIndex: number) => React.ReactNode;
  width?: number | string;
  className?: string;
}

interface TableRecord extends Record<string, any> {
  isEmpty?: boolean;
}

interface SlideSettings {
  dots?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  fullPageScroll?: boolean;
  slidesToScroll?: number;
  vertical?: boolean;
  verticalSwiping?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  arrows?: boolean;
  pauseOnHover?: boolean;
  fade?: boolean;
  cssEase?: string;
  speed?: number;
  centerMode?: boolean;
  variableWidth?: boolean;
  adaptiveHeight?: boolean;
}

interface SlickTableProps {
  openVirtual?: boolean;
  showHeader?: boolean;
  dataSource?: TableRecord[];
  columns?: ColumnConfig[];
  slideSettings?: SlideSettings;
  headerClassName?: string;
  rowClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
}

import React from "react";
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./index.module.less";
const initSlideSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 5, // 显示行数
  fullPageScroll: true, // 是否整页滚动
  slidesToScroll: 5, // 每次滚动行数
  vertical: true, // 是否垂直滚动
  verticalSwiping: true, // 是否垂直滚动
  autoplay: true, // 是否自动播放
  autoplaySpeed: 2000, // 自动播放速度
  arrows: false,
  pauseOnHover: true, // 是否鼠标悬停暂停
  fade: false, // 是否淡入淡出
  cssEase: "ease-in-out", // 动画效果
  speed: 800, // 动画速度
  centerMode: false,
  variableWidth: false,
  adaptiveHeight: false,
};
const SlickTable: React.FC<SlickTableProps> = ({
  openVirtual = false, // todo 是否开启虚拟滚动
  showHeader = true,
  dataSource = [], // key-value格式数据: [{key1: value1, key2: value2}, ...]
  columns = [], // 列配置: [{title, dataIndex, key, render?, width?, className?}, ...]
  slideSettings = initSlideSettings,
  headerClassName = "", // 自定义表头容器样式
  rowClassName = "", // 自定义行样式
  className = "", // 自定义表格样式
  style = {},
  headerStyle = {}, // 自定义表头容器内联样式
  rowStyle = {}, // 自定义行内联样式
  ...restProps // todo 是否虚拟滚动,rowKey等antd其他属性
}) => {
  const finalTableData = [...dataSource];
  const titleList = columns.map((column) => column.title);
  const {
    fullPageScroll = true, // 是否整页滚动
    slidesToShow = 5, // 每页显示行数
  } = slideSettings;
  // 滚动配置
  const finalSlideSettings = {
    ...initSlideSettings,
    ...slideSettings,
    slidesToScroll: fullPageScroll ? slidesToShow : 1,
  };
  /* 整页滚动, 空行填充 */
  if (fullPageScroll === true && dataSource.length > 0) {
    const remainder = dataSource.length % slidesToShow;
    if (remainder !== 0) {
      const emptyRowsNeeded = slidesToShow - remainder;
      const emptyRows = Array.from({ length: emptyRowsNeeded }, () => {
        const emptyRow: TableRecord = { isEmpty: true }; // 明确标识这是空行
        // 为每个列添加占位符数据
        columns.forEach((col) => {
          emptyRow[col.dataIndex] = "";
        });
        return emptyRow;
      });
      finalTableData.push(...emptyRows);
    }
  }
  /* 整页滚动, 空行填充 */

  // 渲染表头
  const renderHead = () => {
    return (
      <div className={classNames(styles.tableHeader, headerClassName)} style={headerStyle}>
        {titleList.map((title, key) => (
          <div key={title || key} className={classNames(styles.headerCell)}>
            {title}
          </div>
        ))}
      </div>
    );
  };
  // 渲染单元格内容
  const renderRowCell = (column: ColumnConfig, record: TableRecord, rowIndex: number) => {
    const { dataIndex, render } = column;
    const text = record[dataIndex];
    // 🎯 空行处理：如果是空行且没有自定义render，返回空内容
    if (record.isEmpty && typeof render !== "function") {
      return "";
    }
    // 如果有自定义渲染函数，使用render函数
    // 注意：render函数可以访问record.isEmpty来做特殊处理
    if (typeof render === "function") {
      return render(text, record, rowIndex);
    }
    // 否则直接显示文本
    return text;
  };
  // 渲染数据行
  const renderRow = () => {
    return finalTableData.map((record, rowIndex) => {
      const isEmptyData = record.isEmpty === true;
      return (
        <div
          key={rowIndex}
          className={classNames(isEmptyData ? styles.fakeRow : styles.tableRow, rowClassName)}
          style={rowStyle}
        >
          {columns.map((column) => {
            const cellContent = renderRowCell(column, record, rowIndex);
            return (
              <div
                key={column.key || column.dataIndex}
                className={classNames(styles.tableCell, {
                  [styles.fakeCell]: isEmptyData,
                })}
              >
                {/* 如果是html , 直接渲染 , 如果是render函数 */}
                {typeof cellContent === "string" ? (
                  <span
                    className={styles.cellText}
                    dangerouslySetInnerHTML={{ __html: cellContent }}
                  />
                ) : (
                  cellContent
                )}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className={classNames(styles.slickTable, className)} style={style}>
      {/* 固定表头 */}
      {showHeader && renderHead()}
      {/* 滚动内容 */}
      <div className={styles.tableContent}>
        <Slider {...finalSlideSettings}>{renderRow()}</Slider>
      </div>
    </div>
  );
};

export default SlickTable;
