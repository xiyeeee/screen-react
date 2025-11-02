import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";

const Business = () => {
  const charts = {
    // 按顺序排列从大到小
    cityList: ["金融行业", "电子政务", "文创版权", "教育行业", "智慧停车", "医疗互联", "物流行业"],
    cityData: [1500, 1200, 900, 600, 400, 300, 100],
  };

  const top10CityList = charts.cityList;
  const top10CityData = charts.cityData;
  const color = [
    "rgba(14,109,236",
    "rgba(255,91,6",
    "rgba(100,255,249",
    "rgba(248,195,248",
    "rgba(110,234,19",
    "rgba(255,168,17",
    "rgba(218,111,227",
  ];

  const lineY = [];
  for (let i = 0; i < charts.cityList.length; i++) {
    let x = i;
    if (x > color.length - 1) {
      x = color.length - 1;
    }
    const data = {
      name: charts.cityList[i],
      color: color[x] + ")",
      value: top10CityData[i],
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
              {
                offset: 0,
                color: color[x] + ", 0.3)",
              },
              {
                offset: 1,
                color: color[x] + ", 1)",
              },
            ],
            false,
          ),
          barBorderRadius: 10,
        },
        emphasis: {
          shadowBlur: 15,
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
      },
    };
    lineY.push(data);
  }

  const option = {
    backgroundColor: "transparent",
    color: color,
    tooltip: {
      trigger: "item",
    },
    grid: {
      borderWidth: 0,
      top: "5%",
      left: "2%",
      right: "15%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          inside: false,
          textStyle: {
            color: "#b3ccf8",
            fontSize: 13,
          },
        },
        data: top10CityList,
      },
      {
        type: "category",
        inverse: true,
        position: "right",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          inside: false,
          textStyle: {
            color: "#b3ccf8",
            fontSize: 13,
          },
          formatter: (val: any, index: any) => {
            return top10CityData[index];
          },
        },
        splitArea: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: top10CityList,
      },
    ],
    series: [
      {
        name: "",
        type: "bar",
        zlevel: 2,
        barWidth: "10px",
        data: lineY,
        animationDuration: 1500,
        label: {
          normal: {
            color: "#b3ccf8",
            show: false,
            position: [5, 0],
            textStyle: {
              fontSize: 13,
            },
            formatter: (a: any) => {
              return a.value;
            },
          },
        },
      },
    ],
  };

  return <ChartBase title="业务范围" option={option} id="chart_business" />;
};

export default Business;
