import React from "react";
/*
 * @Author: luomingxi
 * @Date: 2025-06-25 14:50:17
 * @Description: 产能统计
 * @LastEditors: luomingxi
 * @LastEditTime: 2025-07-31 11:30:32
 */
import BaseScrollTable from "@/components/Table/BaseScrollTable";
import styles from "./index.module.less";
const mockData = [
  {
    name: "细纱机01",
    capacity: 42,
    percentage: 12.53999999999999914734871708787977695465087890625,
  },
  {
    name: "细纱机02",
    capacity: 27,
    percentage: 8.0600000000000004973799150320701301097869873046875,
  },
  {
    name: "细纱机03",
    capacity: 35,
    percentage: 10.449999999999999289457264239899814128875732421875,
  },
  {
    name: "细纱机04",
    capacity: 50,
    percentage: 14.92999999999999971578290569595992565155029296875,
  },
  {
    name: "细纱机05",
    capacity: 22,
    percentage: 6.57000000000000028421709430404007434844970703125,
  },
  {
    name: "细纱机06",
    capacity: 45,
    percentage: 13.42999999999999971578290569595992565155029296875,
  },
  {
    name: "细纱机07",
    capacity: 38,
    percentage: 11.339999999999999857891452847979962825775146484375,
  },
  {
    name: "细纱机08",
    capacity: 29,
    percentage: 8.660000000000000142108547152020037174224853515625,
  },
  {
    name: "细纱机09",
    capacity: 47,
    percentage: 14.0299999999999993605115378159098327159881591796875,
  },
];
interface CustomRowProps {
  data: {
    name: string;
    capacity: number;
    percentage: number;
  };
}

interface CustomRowTableListProps {
  data?: CustomRowProps["data"][];
}

const CustomRow: React.FC<CustomRowProps> = ({ data }) => {
  return (
    <div className={styles.row}>
      <div className={styles.powerName}>产能</div>
      <div className={styles.name}>{data.name}</div>
      <div className={styles.valueAndUnit}>
        <span className={styles.value}>{data.capacity}</span>
        <span className={styles.unit}>米/小时</span>
      </div>

      <div className={styles.ratioAndRate}>
        <span className={styles.ratio}>{data.percentage} </span>
        <span className={styles.ratio}> %</span>
      </div>
    </div>
  );
};

const CustomRowTableList: React.FC<CustomRowTableListProps> = (props) => {
  const { data = mockData } = props;

  const columns = [
    {
      title: "",
      dataIndex: "customRow",
      key: "customRow",
      width: "100%",
      render: (text: any, record: CustomRowProps["data"]) => {
        return <CustomRow data={record} />;
      },
    },
  ];

  return (
    <BaseScrollTable
      showHeader={false}
      headerClassName={styles.headerClassName}
      dataSource={data as any}
      columns={columns as any}
      slideSettings={{
        dots: false,
        infinite: true,
        slidesToShow: 5,
        fullPageScroll: false,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false,
        pauseOnHover: true,
        fade: false,
        cssEase: "ease-in-out",
        speed: 800,
        centerMode: false,
        variableWidth: false,
        adaptiveHeight: false,
      }}
      rowClassName={styles.rowClassName}
    />
  );
};

export default CustomRowTableList;
