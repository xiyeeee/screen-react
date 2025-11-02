import React from "react";

import BaseScrollTable from "@/components/Table/BaseScrollTable";
import styles from "./index.module.less";
const mockData = [
  {
    name: "细纱机01",
    capacity: 42,
    percentage: 12.5,
  },
  {
    name: "细纱机02",
    capacity: 27,
    percentage: 8.0,
  },
  {
    name: "细纱机03",
    capacity: 35,
    percentage: 10.44,
  },
  {
    name: "细纱机04",
    capacity: 50,
    percentage: 14.9,
  },
  {
    name: "细纱机05",
    capacity: 22,
    percentage: 6.5,
  },
  {
    name: "细纱机06",
    capacity: 45,
    percentage: 13.4,
  },
  {
    name: "细纱机07",
    capacity: 38,
    percentage: 11.3,
  },
  {
    name: "细纱机08",
    capacity: 29,
    percentage: 8.6,
  },
  {
    name: "细纱机09",
    capacity: 47,
    percentage: 14.02,
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
