import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useEffect, useState } from "react";

// 类型定义
interface ClothDataItem {
  name: string;
  value: number;
  isEmpty?: boolean;
}

interface ClothStockDetailBarProps {
  data?: ClothDataItem[];
  backgroundColor?: string;
  itemsPerPage?: number;
  autoScroll?: boolean;
  scrollInterval?: number;
  [key: string]: any;
}

// 🧪 模拟服装库存数据
const templateData: ClothDataItem[] = [
  { name: "连衣裙", value: 3567 },
  { name: "衬衫", value: 1645 },
  { name: "T恤", value: 2760 },
  { name: "牛仔裤", value: 2521 },
  { name: "西装", value: 2344 },
  { name: "外套", value: 1676 },
  { name: "毛衣", value: 1876 },
  { name: "裙子", value: 1456 },
  { name: "短裤", value: 1166 },
  { name: "背心", value: 976 },
  { name: "风衣", value: 1876 },
  { name: "马甲", value: 1276 },
  { name: "卫衣", value: 1566 },
  { name: "羽绒服", value: 2166 },
  { name: "针织衫", value: 1366 },
];

const ClothStockDetailBar: React.FC<ClothStockDetailBarProps> = (props) => {
  const {
    data = templateData,
    backgroundColor = "transparent",
    itemsPerPage = 5, // 每页显示5个
    autoScroll = true, // 是否自动轮播
    scrollInterval = 3000, // 轮播间隔时间（毫秒）
    ...restProps
  } = props;

  // 🔄 状态管理
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [chartData, setChartData] = useState<ClothDataItem[]>([]);

  // 📊 3D立方体参数配置
  const wid: number = 20; // 从30减小到20，让柱子变小
  const w1: number = Math.sin(Math.PI / 6) * wid; // ~10
  const w2: number = Math.sin(Math.PI / 3) * wid; // ~17.3
  const snapHeight: number = wid / 2;

  // 🎨 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      const xAxisPoint = shape.xAxisPoint;
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - w2, shape.y];
      const c2 = [shape.x - w2, xAxisPoint[1]];
      const c3 = [shape.x, xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });

  // 🎨 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x, xAxisPoint[1]];
      const c3 = [shape.x + w1, xAxisPoint[1] - w2 + snapHeight];
      const c4 = [shape.x + w1, shape.y - w2 + snapHeight];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });

  // 🎨 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + w1, shape.y - w2 + snapHeight]; // 右点
      const c3 = [shape.x - w2 + w1, shape.y - w2 + snapHeight];
      const c4 = [shape.x - w2, shape.y];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });

  // ! 注册三个面图形（使用唯一名称避免冲突 , 如果其他地方用到了相同的注册名, 会导致样式问题）
  echarts.graphic.registerShape("ClothCubeLeft", CubeLeft);
  echarts.graphic.registerShape("ClothCubeRight", CubeRight);
  echarts.graphic.registerShape("ClothCubeTop", CubeTop);

  // 📈 获取当前显示的数据
  const getCurrentPageData = (startIndex: number): ClothDataItem[] => {
    const endIndex = startIndex + itemsPerPage;
    const actualData = data.slice(startIndex, endIndex);

    // 如果数据不足itemsPerPage个，用空数据填充
    const filledData: ClothDataItem[] = [...actualData];
    while (filledData.length < itemsPerPage) {
      filledData.push({
        name: "",
        value: 0,
        isEmpty: true,
      });
    }

    return filledData;
  };

  // 🔄 初始化数据和自动滚动
  useEffect(() => {
    // 设置初始数据
    setChartData(getCurrentPageData(0));

    if (!autoScroll || data.length <= itemsPerPage) return;

    // 设置自动滚动定时器
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + itemsPerPage;
        // 如果超出数据范围，回到开始
        const actualNextIndex = nextIndex >= data.length ? 0 : nextIndex;

        // 更新显示数据
        setChartData(getCurrentPageData(actualNextIndex));

        return actualNextIndex;
      });
    }, scrollInterval);

    return () => {
      clearInterval(interval);
    };
  }, [data, autoScroll, scrollInterval, itemsPerPage]);

  // 📊 数据提取
  const chartNames: string[] = chartData.map((item) => item.name);
  const chartValues: number[] = chartData.map((item) => item.value);

  const option: echarts.EChartsOption = {
    backgroundColor: backgroundColor,
    // 📊 图例配置
    legend: {
      show: true,
      data: [
        {
          name: "库存总量",
          icon: "rect",
          itemStyle: {
            color: "#0064FF", // 与3D立方体主色保持一致
          },
        },
      ],
      top: "5%",
      right: "5%",
      textStyle: {
        color: "#CFE3FC",
        fontSize: 12,
      },
      itemWidth: 12,
      itemHeight: 12,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: "rgba(9, 24, 48, 0.5)",
      borderColor: "rgba(75, 253, 238, 0.4)",
      textStyle: {
        color: "#CFE3FC",
      },
      borderWidth: 1,
      formatter: function (params: any) {
        if (params && params.length > 0) {
          const param = params[0];
          if (chartData[param.dataIndex]?.isEmpty) {
            return "";
          }
          return `${param.name}: ${param.value}件`;
        }
        return "";
      },
    },
    // 🎬 动画配置
    animation: true,
    animationDuration: 800,
    animationEasing: "cubicOut",
    animationDelay: 0,
    grid: {
      top: "15%",
      left: "12%", // 增加左边距，给小柱子更多空间
      bottom: "10%",
      right: "12%", // 增加右边距，让布局更均衡
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartNames,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#3e6f8e",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
        margin: 10,
        color: "white",
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      name: "货位",
      type: "value",
      nameTextStyle: {
        color: "white",
        fontSize: 14,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#3e6f8e",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "white",
        fontSize: 12,
        margin: 10,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#ffffff",
          opacity: 0.1,
          width: 1,
        },
      },
      nameGap: 20,
    },
    series: [
      {
        //  数值标签层
        name: "库存总量",
        type: "bar",
        label: {
          show: true,
          position: "top",
          fontSize: 14,
          color: "#fff",
          offset: [0, -15],
          formatter: function (params: any) {
            // 如果是空数据，不显示标签
            return chartData[params.dataIndex]?.isEmpty ? "" : params.value;
          },
        },
        tooltip: {
          show: false,
        },
        itemStyle: {
          color: "transparent",
        },
        data: chartValues,
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 200,
      },
      {
        // 3D立方体
        name: "库存总量",
        type: "custom",
        renderItem: (params: any, api: any) => {
          // 如果是空数据，不渲染
          if (chartData[params.dataIndex]?.isEmpty) {
            return { type: "group", children: [] };
          }

          const location: number[] = api.coord([api.value(0), api.value(1)]);
          const xlocation: number[] = api.coord([api.value(0), 0]);

          return {
            type: "group",
            children: [
              {
                type: "ClothCubeLeft",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: xlocation,
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#0064FF",
                    },
                    {
                      offset: 1,
                      color: "#0064FF",
                    },
                  ]),
                },
              },
              {
                type: "ClothCubeRight",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: xlocation,
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#254193",
                    },
                    {
                      offset: 1,
                      color: "#254193",
                    },
                  ]),
                },
              },
              {
                type: "ClothCubeTop",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: xlocation,
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#005DFFD4",
                    },
                    {
                      offset: 1,
                      color: "#005DFFD4",
                    },
                  ]),
                },
              },
            ],
          };
        },
        data: chartValues,
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 0,
      },
    ] as any,
  };

  return <ChartBase option={option} id="cloth_stock_detail_bar" {...restProps} />;
};

export default ClothStockDetailBar;
