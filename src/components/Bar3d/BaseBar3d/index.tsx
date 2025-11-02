import ChartBase from "@/components/ChartBase";
import "echarts-gl";
import styles from "./index.less";

const Bar3d = () => {
  const xData = ["20-25", "25-30", "30-35", "35-40", "40-45", "45-50"];
  const days = ["1", "2", "3", "4", "5", "6"];
  const sex = ["女", "男"];
  const data = [
    [0, 0, 3, sex[0], xData[0], 500, 25],
    [0, 1, 2.5, sex[0], xData[3], 1000, 35],
    [0, 2, 1.5, sex[1], xData[4], 3000, 5],
    [0, 3, 1, sex[1], xData[1], 300, 15],
    [0, 4, 2, sex[0], xData[2], 500, 55],
    [0, 5, 3, sex[0], xData[3], 1500, 45],

    [1, 5, 6, sex[1], xData[0], 300, 25],
    [1, 1, 4, sex[0], xData[1], 500, 22],
    [1, 2, 2, sex[0], xData[2], 1500, 38],
    [1, 3, 1.5, sex[1], xData[3], 2500, 25],
    [1, 4, 3, sex[0], xData[4], 3500, 49],
    [1, 0, 4, sex[1], xData[5], 5500, 15],

    [2, 2, 3, sex[1], xData[0], 300, 25],
    [2, 1, 2, sex[0], xData[4], 1300, 25],
    [2, 2, 5, sex[0], xData[2], 900, 25],
    [2, 5, 1, sex[1], xData[3], 2000, 25],
    [2, 0, 3, sex[1], xData[1], 2300, 25],
    [2, 0, 10, sex[1], xData[5], 3500, 25],

    [3, 2, 3, sex[0], xData[5], 500, 35],
    [3, 3, 2, sex[0], xData[4], 2300, 55],
    [3, 2, 1, sex[1], xData[3], 3300, 15],
    [3, 5, 5, sex[1], xData[2], 500, 10],
    [3, 1, 2, sex[1], xData[1], 1000, 35],
    [3, 0, 1, sex[0], xData[0], 300, 45],

    [4, 2, 3, sex[1], xData[1], 600, 25],
    [4, 0, 5, sex[0], xData[0], 500, 15],
    [4, 1, 3.5, sex[1], xData[3], 4000, 5],
    [4, 4, 7, sex[0], xData[0], 300, 75],
    [4, 1, 0, sex[1], xData[5], 3000, 85],
    [3, 1, 3, sex[0], xData[2], 2500, 65],

    [5, 2, 3, sex[0], xData[2], 500, 15],
    [5, 1, 2, sex[1], xData[3], 3300, 52],
    [5, 1, 5, sex[0], xData[4], 1000, 88],
    [5, 5, 8, sex[1], xData[0], 200, 12],
    [5, 2, 7, sex[0], xData[0], 300, 45],
    [3, 2, 2, sex[1], xData[1], 5000, 51],
  ];

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      borderColor: "#8a704e",
      borderWidth: 1,
      padding: 15,
      formatter: (params: any) => {
        const html = `${params.seriesName} <br> <span style="color: #fff;">性别：${params.value[3]} <br> 年龄：${params.value[4]}岁<br> 贷款金额：${params.value[5]} <br> 总人数：${params.value[6]}</span>`;
        return html;
      },
      textStyle: {
        color: "#8a704e",
        fontSize: 16,
      },
    },
    xAxis3D: {
      type: "category",
      data: xData,
      axisLabel: {
        color: "#fff",
        fontSize: 10,
      },
    },
    yAxis3D: {
      type: "category",
      data: days,
      axisLabel: {
        color: "#fff",
        fontSize: 10,
      },
    },
    zAxis3D: {
      type: "value",
      axisLabel: {
        color: "#fff",
        fontSize: 10,
      },
    },
    grid3D: {
      show: true,
      boxWidth: 160,
      boxDepth: 80,
      light: {
        main: {
          intensity: 1.2,
          shadow: true,
        },
        ambient: {
          intensity: 0.3,
        },
      },
      viewControl: {
        alpha: 20,
        beta: 30,
        autoRotate: true,
        autoRotateSpeed: 5,
        distance: 300,
      },
      postEffect: {
        enable: true,
        SSAO: {
          enable: true,
          radius: 5,
          quality: "medium",
          intensity: 1.5,
        },
      },
      temporalSuperSampling: {
        enable: true,
      },
    },
    series: [
      {
        type: "bar3D",
        name: "当前值",
        data: data.map((item) => {
          return {
            value: [item[1], item[0], item[2], item[3], item[4], item[5], item[6]],
          };
        }),
        shading: "lambert",
        label: {
          show: false,
        },
        itemStyle: {
          color: "#0084ff",
          opacity: 0.8,
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            color: "#0084ff",
          },
        },
        animation: true,
        animationDurationUpdate: 1000,
      },
    ],
  };

  return (
    <div className={styles.bar3dContainer}>
      <ChartBase
        title="3D立体柱状图"
        option={option}
        id="chart_3d"
        className={styles.chartContent}
      />
      <div className={styles.barImg} />
      <div className={styles.barImg1} />
      <div className={styles.barImg2} />
    </div>
  );
};

export default Bar3d;
