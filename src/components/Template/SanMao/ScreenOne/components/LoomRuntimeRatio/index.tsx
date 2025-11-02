import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-25 14:50:17
 * @Description:
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-31 11:18:49
 */
import SlickTable from "@/components/Table/BaseScrollTable";
import styles from "./index.module.less";
interface Props {
  [key: string]: any;
}

const LoomRuntimeRatio: React.FC<Props> = (props) => {
  const { data } = props;

  const columns: any = [
    {
      title: "名称",
      dataIndex: "equipmentName",
      key: "equipmentName",
      width: "25%",
      render: (text: any) => {
        return `<span style="font-size: 14px; color: #fff">${text}</span>`;
      },
    },
    {
      title: "所属",
      dataIndex: "productionLine",
      key: "productionLine",
      width: "25%",
      render: (text: any) => {
        return `<span style="color: #fff">${text}</span>`;
      },
    },
    {
      title: "值",
      dataIndex: "productivity",
      key: "productivity",
      width: "25%",
      render: (text: any, record: any) => {
        if (record.isEmpty) {
          return "";
        }
        return `<span style="color: #fff">${text}米/分钟</span>`;
      },
    },
    {
      title: "占比",
      dataIndex: "runtimePercentage",
      key: "runtimePercentage",
      width: "25%",
      render: (text: any, record: any) => {
        // 根据占比设置不同颜色
        const runtimePercentage = Number(text);
        let color = "#52c41a"; // 默认绿色

        if (runtimePercentage >= 80) {
          color = "#52c41a"; // 高运行率 - 绿色
        } else if (runtimePercentage >= 50) {
          color = "#faad14"; // 中等运行率 - 橙色
        } else {
          color = "#ff4d4f"; // 低运行率 - 红色
        }
        if (record.isEmpty) {
          return "";
        }
        return `<span style="color: ${color}; font-weight: bold">${text}%</span>`;
      },
    },
  ];

  return (
    <SlickTable
      dataSource={data}
      columns={columns}
      slideSettings={{ slidesToShow: 6, autoplaySpeed: 5000, fullPageScroll: true }}
      rowClassName={styles.runtimePercentage}
    />
  );
};

export default LoomRuntimeRatio;
