import ChartBase from "@/components/ChartBase";

interface ChartSeriesItem {
  name: string;
  data: number[];
}

interface ChartData {
  categories: string[];
  series: ChartSeriesItem[];
}

interface BasicBarProps {
  chartData?: ChartData;
  showLegend?: boolean;
  colorConfig?: string[];
  title?: string;
  [key: string]: any;
}

const BasicBar: React.FC<BasicBarProps> = (props) => {
  const {
    chartData = {
      categories: ["类别1", "类别2", "类别3", "类别4", "类别5"],
      series: [
        {
          name: "系列1",
          data: [120, 200, 150, 80, 70],
        },
        {
          name: "系列2",
          data: [90, 130, 110, 60, 40],
        },
      ],
    },
    showLegend = true,
    colorConfig = [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
    title = "基础柱状图",
    ...restProps
  } = props;

  // 直接定义option，不使用useState
  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: chartData.series.map((item) => item.name),
      show: showLegend,
      right: 10,
      top: 10,
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.categories,
      axisLine: {
        lineStyle: {
          color: "#2867a8",
        },
      },
      axisLabel: {
        color: "#fff",
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#fff",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    series: chartData.series.map((item, index) => ({
      name: item.name,
      type: "bar",
      data: item.data,
      itemStyle: {
        color: colorConfig[index % colorConfig.length],
      },
      barMaxWidth: 50,
      emphasis: {
        focus: "series",
      },
      animationDelay: function (idx: number) {
        return idx * 100;
      },
    })),
    color: colorConfig,
    animationEasing: "elasticOut",
    animationDelayUpdate: function (idx: number) {
      return idx * 5;
    },
  };

  return <ChartBase title={title} option={option} id="chart_basicbar" {...restProps} />;
};

export default BasicBar;
