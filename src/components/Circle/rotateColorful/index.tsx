import React from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";
import styles from "./index.less";

const RotateColorful = () => {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      show: true,
      orient: "vertical",
      left: "center",
      top: "middle",
      data: ["内存", "存储"],
      textStyle: {
        color: "#4ce5ff",
        fontSize: 14,
      },
      itemWidth: 20,
      itemHeight: 10,
    },
    label: {
      normal: {
        show: false,
      },
    },
    labelLine: {
      normal: {
        show: false,
      },
    },
    series: [
      {
        name: "磁盘空间",
        type: "pie",
        radius: [60, 110],
        center: ["50%", "50%"],
        roseType: "area",
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        data: [
          {
            value: 6.5,
            name: "内存",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#387ed3",
                  },
                  {
                    offset: 1,
                    color: "#bc8b68",
                  },
                ]),
              },
            },
          },
          {
            value: 3.5,
            name: "存储",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#188bfd",
                  },
                  {
                    offset: 1,
                    color: "#51eeff",
                  },
                ]),
              },
            },
          },
          {
            value: 0,
            name: "其他",
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          },
          {
            value: 0,
            name: "其他1",
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          },
          {
            value: 0,
            name: "其他2",
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          },
          {
            value: 0,
            name: "其他3",
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0)",
              },
            },
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.rotateColorfulContainer}>
      <div className={styles.pie}>
        <div className={`${styles.pies} ${styles.pie1}`} />
        <div className={`${styles.pies} ${styles.pie2}`} />
        <div className={`${styles.pies} ${styles.pie3}`} />
        <div className={styles.pie4} />
      </div>
      <ChartBase
        title="旋转多彩图"
        option={option}
        id="chart_rotate"
        className={styles.chartContent}
      />
    </div>
  );
};

export default RotateColorful;

