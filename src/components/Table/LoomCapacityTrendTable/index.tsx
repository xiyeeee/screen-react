import BaseScrollTable from "@/components/Table/BaseScrollTable";
import styles from "./index.module.less";

const LoomRuntimeRatio = () => {
  // 🎯 新的key-value格式数据
  const tableData = [
    {
      deviceName: "内容01",
      productionLine: "产线01",
      capacity: 100,
      ratio: 95,
    },
    { deviceName: "内容02", productionLine: "产线02", capacity: 92, ratio: 90 },
    { deviceName: "内容03", productionLine: "产线03", capacity: 58, ratio: 55 },
    { deviceName: "内容04", productionLine: "产线04", capacity: 46, ratio: 45 },
    { deviceName: "内容05", productionLine: "产线05", capacity: 6, ratio: 5 },
    { deviceName: "内容06", productionLine: "产线06", capacity: 85, ratio: 80 },
    { deviceName: "内容07", productionLine: "产线07", capacity: 72, ratio: 70 },
    { deviceName: "内容08", productionLine: "产线08", capacity: 25, ratio: 25 },
  ];

  // 🎯 列配置，支持render函数自定义渲染
  const columns = [
    {
      title: "名称",
      dataIndex: "deviceName",
      key: "deviceName",
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
      dataIndex: "capacity",
      key: "capacity",
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
      dataIndex: "ratio",
      key: "ratio",
      width: "25%",
      render: (text: any, record: any) => {
        // 根据占比设置不同颜色
        const ratio = Number(text);
        let color = "#52c41a"; // 默认绿色

        if (ratio >= 80) {
          color = "#52c41a"; // 高运行率 - 绿色
        } else if (ratio >= 50) {
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
    <BaseScrollTable
      dataSource={tableData}
      columns={columns}
      slideSettings={{ slidesToShow: 6, autoplaySpeed: 4500, fullPageScroll: true }}
      rowClassName={styles.ratioClassName}
    />
  );
};

export default LoomRuntimeRatio;
