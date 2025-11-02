import React, { useState } from "react";
import * as echarts from "echarts";
import ChartBase from "@/components/ChartBase";
import styles from "./index.less";

const ScanRadius = () => {
  const [val, setVal] = useState(0);

  const getOption = () => {
    const arrData = [
      {
        value: 3,
        name: "区块链",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#4284dd",
              },
              {
                offset: 1,
                color: "#0c3371",
              },
            ]),
          },
        },
      },
      {
        value: 4.5,
        name: "人工智能",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#5253d3",
              },
              {
                offset: 1,
                color: "#072559",
              },
            ]),
          },
        },
      },
      {
        value: 3,
        name: "大数据",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#8b5c85",
              },
              {
                offset: 1,
                color: "#183571",
              },
            ]),
          },
        },
      },
      {
        value: 5.5,
        name: "云计算",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#b4734f",
              },
              {
                offset: 1,
                color: "#443e5f",
              },
            ]),
          },
        },
      },
      {
        value: 3,
        name: "移动互联网",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#3ab1d9",
              },
              {
                offset: 1,
                color: "#124c94",
              },
            ]),
          },
        },
      },
    ];

    let totalVal = 0;
    for (let i = 0; i < arrData.length; i++) {
      totalVal += arrData[i].value;
    }

    arrData.push({
      value: totalVal,
      name: "__other",
      itemStyle: {
        normal: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
    });

    const arrData2 = [
      {
        value: 10,
        itemStyle: {
          normal: {
            color: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(17, 93, 217, 0.4)",
            borderWidth: 1,
          },
        },
      },
      {
        value: 10,
        itemStyle: {
          normal: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      },
    ];

    const tooltip = {
      formatter: " ",
      backgroundColor: "rgba(0, 0, 0, 0)",
    };

    return {
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
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "现代技术",
          type: "pie",
          startAngle: -180,
          radius: "190%",
          center: ["50%", "50%"],
          roseType: "radius",
          z: 0,
          tooltip: {
            formatter: "{b0}: {c0} ({d0}%)",
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          data: arrData,
        },
        {
          name: "2020年",
          type: "pie",
          clockWise: false,
          startAngle: 0,
          hoverAnimation: false,
          radius: ["90%", "90%"],
          center: ["50%", "50%"],
          tooltip: tooltip,
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
          data: [
            {
              value: 10,
              itemStyle: {
                normal: {
                  color: "rgba(0, 0, 0, 0)",
                  borderColor: "rgba(21, 103, 214, 1)",
                  borderWidth: 2,
                  borderType: "dashed",
                },
              },
            },
            {
              value: 10,
              itemStyle: {
                normal: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            },
          ],
        },
        {
          name: "2019年",
          type: "pie",
          clockWise: false,
          startAngle: 0,
          hoverAnimation: false,
          radius: ["70%", "70%"],
          center: ["50%", "50%"],
          tooltip: tooltip,
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
          data: arrData2,
        },
        {
          name: "2018年",
          type: "pie",
          clockWise: false,
          startAngle: 0,
          hoverAnimation: false,
          radius: ["50%", "50%"],
          center: ["50%", "50%"],
          tooltip: tooltip,
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
          data: arrData2,
        },
        {
          name: "2017年",
          type: "pie",
          clockWise: false,
          startAngle: 0,
          hoverAnimation: false,
          radius: ["30%", "30%"],
          center: ["50%", "50%"],
          tooltip: tooltip,
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
          data: arrData2,
        },
        {
          name: "2016年",
          type: "pie",
          clockWise: false,
          startAngle: 0,
          hoverAnimation: false,
          radius: ["10%", "10%"],
          center: ["50%", "50%"],
          tooltip: tooltip,
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
          data: arrData2,
        },
      ],
    };
  };

  const option = getOption();

  return (
    <div className={styles.scanRadiusContainer}>
      <ChartBase
        title="扫描半径图"
        option={option}
        id="chart_scan"
        className={styles.chartContent}
      />
      <div className={styles.box}>
        <div className={`${styles.nodetext} ${styles.text0}`}>
          <span>区块链</span>
        </div>
        <div className={`${styles.nodetext} ${styles.text1}`}>
          <span>人工智能</span>
        </div>
        <div className={`${styles.nodetext} ${styles.text2}`}>
          <span>大数据</span>
        </div>
        <div className={`${styles.nodetext} ${styles.text3}`}>
          <span>云计算</span>
        </div>
        <div className={`${styles.nodetext} ${styles.text4}`}>
          <span>移动互联网</span>
        </div>
      </div>
    </div>
  );
};

export default ScanRadius;


