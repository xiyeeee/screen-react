import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-25 14:50:30
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-31 11:19:06
 */
import SlickTable from "@/components/Table/BaseScrollTable";
import TrendLeftLine from "../TrendLeftLine";
import styles from "./index.module.less";

interface Props {
  [key: string]: any;
}

const LoomCapacityTrend: React.FC<Props> = (props) => {
  const { data } = props;

  // 🎯 将嵌套数组格式转换成折线图所需格式
  const transformDataToLineData = (capacityData) => {
    // 提取所有时间点
    const xAxis = capacityData.map((item) => item.timePoint);

    // 获取所有型号名称（从第一个时间点获取）
    const loomNames = capacityData[0]?.productionByCapacityVOS?.map((item) => item.loomName) || [];

    // 为每个型号构建数据系列
    const series = loomNames.map((loomName) => ({
      name: loomName,
      data: capacityData.map((timeItem) => {
        const production = timeItem.productionByCapacityVOS.find((p) => p.loomName === loomName);
        return production ? production.num : 0;
      }),
      smooth: false,
    }));

    return { xAxis, series };
  };

  const lineData = transformDataToLineData(data);
  // 🎯 将嵌套数组格式转换成扁平的tableData格式
  const transformDataToTableData = (capacityData) => {
    return capacityData.flatMap((item) =>
      item.productionByCapacityVOS.map((production) => ({
        date: item.timePoint,
        model: production.loomName,
        capacity: production.num,
      })),
    );
  };

  const tableData = transformDataToTableData(data);

  // 🎯 列配置，支持render函数自定义渲染
  const columns = [
    {
      title: "时间",
      dataIndex: "date",
      key: "date",
      width: "30%",
      render: (text, record) => {
        return `<span style="color: #fff">${text}</span>`;
      },
    },
    {
      title: "机器",
      dataIndex: "model",
      key: "model",
      width: "30%",
      render: (text, record) => {
        const color = "#fff";
        return `<span style="color: ${color}; ">${text}</span>`;
      },
    },
    {
      title: "产能(米/分钟)",
      dataIndex: "capacity",
      key: "capacity",
      width: "40%",
      render: (text, record) => {
        return `<span style="color: #fff; ">${text}</span>`;
      },
    },
  ];

  return (
    <div className={styles.trendContainer}>
      {/* 左侧折线图 */}
      <div className={styles.chartSection}>
        <TrendLeftLine
          data={lineData}
          title={false}
          showLegend={true}
          showArea={true}
          dataZoomConfig={{
            show: false, // 隐藏滑块
            start: 0, // 从0%开始
            end: 25, // 显示25%的数据（正好3个月份，一个标准季度）
            autoPlay: true, // 开启自动轮播
            playInterval: 4000, // 每4秒切换一次季度，充分观察季度数据
            step: 25, // 每次移动25%，直接跳转到下一个季度
          }}
        />
      </div>

      {/* 右侧滚动表格 */}
      <div className={styles.tableSection}>
        <SlickTable
          dataSource={tableData}
          columns={columns}
          slideSettings={{ slidesToShow: 6, autoplaySpeed: 5000, fullPageScroll: true }}
          headerClassName={styles.customTableHeader}
          rowClassName={styles.customTableRow}
        />
      </div>
    </div>
  );
};

export default LoomCapacityTrend;
