import ChartBase from "@/components/ChartBase";
import * as echarts from "echarts";
import React, { useEffect, useState } from "react";
const templateData = [
  { name: "迪士尼公主裙", value: 3567 },
  { name: "v领针织马甲", value: 1645 },
  { name: "格纹百褶裙", value: 2760 },
  { name: "Lolita", value: 2521 },
  { name: "泡泡刺绣上衣", value: 2344 },
  { name: "叶边防晒衫", value: 1676 },
  { name: "测试1", value: 16176 },
  { name: "测试2", value: 1676 },
  { name: "测试3", value: 166 },
  { name: "测试4", value: 676 },
  { name: "测试5", value: 1076 },
  { name: "测试6", value: 976 },
  { name: "测试122", value: 16176 },
  { name: "测试2", value: 1676 },
  { name: "测试32", value: 166 },
  { name: "测试43", value: 676 },
];
interface Props {
  [key: string]: any;
}

const BarCube: React.FC<Props> = (props) => {
  const {
    data = templateData,
    primaryColor = "25,155,172",
    offsetX = 15,
    offsetY = 8,
    backgroundColor = "transparent",
    itemsPerPage = 6, // 每页显示6个
    autoScroll = true, // 是否自动轮播
    scrollInterval = 5000, // 轮播间隔时间（毫秒）
    ...restProps
  } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [chartData, setChartData] = useState<{ name: string; value: number; isEmpty?: boolean }[]>(
    [],
  );

  // 获取当前显示的数据
  const getCurrentPageData = (startIndex: number) => {
    const endIndex = startIndex + itemsPerPage;
    const actualData = data.slice(startIndex, endIndex);

    // 如果数据不足itemsPerPage个，用空数据填充
    const filledData = [...actualData];
    while (filledData.length < itemsPerPage) {
      filledData.push({
        name: "",
        value: 0,
        isEmpty: true,
      });
    }

    return filledData;
  };

  // 初始化数据和自动滚动
  useEffect(() => {
    // 设置初始数据
    setChartData(getCurrentPageData(0));

    if (!autoScroll) return;

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

  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      const xAxisPoint = shape.xAxisPoint;
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - offsetX, shape.y - offsetY];
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });

  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
      const c4 = [shape.x + offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });

  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx: any, shape: any) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
      const c3 = [shape.x, shape.y - offsetX];
      const c4 = [shape.x - offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });

  // 注册三个面图形（使用唯一名称避免冲突）
  echarts.graphic.registerShape("BarCubeLeft", CubeLeft);
  echarts.graphic.registerShape("BarCubeRight", CubeRight);
  echarts.graphic.registerShape("BarCubeTop", CubeTop);

  const chartNames = chartData.map((item) => item.name);
  const chartValues = chartData.map((item) => item.value);

  // 计算当前页数据的最大值，用于背景
  const currentMaxValue = Math.max(
    ...chartValues.filter((value, index) => !chartData[index]?.isEmpty),
  );

  const option = {
    backgroundColor: backgroundColor,
    legend: {
      data: ["容量数", "存量数"],
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      itemGap: 10,
      itemWidth: 12,
      itemHeight: 12,
      icon: "rect",
      right: "10%",
      top: "8%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        const resultTooltip =
          "<div style='background:rgba(13,5,30,.3);border:1px solid rgba(255,255,255,.2);padding:5px 10px;border-radius:4px;'>" +
          "<div style='text-align:center;'>" +
          params[0].name +
          "</div>" +
          "<div style='padding-top:5px;'>" +
          "<span style='display:inline-block;border-radius:4px;width:20px;height:10px;background-color:rgba(61,187,255,.3);border: 2px solid #3eb6f5;'></span>" +
          "<span style=''> 当前值: </span>" +
          "<span style=''>" +
          params[0].value +
          "</span>" +
          "</div>" +
          "</div>";
        return resultTooltip;
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      top: "25%",
      bottom: "10%",
      containLabel: true,
    },
    animation: true,
    animationDuration: 800,
    animationEasing: "cubicOut",
    animationDelay: 0,
    xAxis: {
      type: "category",
      data: chartNames,
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: "#2B7BD6",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
        color: "#fff",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: "#2B7BD6",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#153D7D",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
        color: "#fff",
      },
    },
    series: [
      {
        // 最大高度背景
        name: "容量数",
        type: "custom",
        color: `rgba(${primaryColor}, .15)`, // 设置legend图标颜色
        renderItem: function (params: any, api: any) {
          // 如果是空数据，不渲染
          if (chartData[params.dataIndex]?.isEmpty) {
            return { type: "group", children: [] };
          }

          const location = api.coord([api.value(0), currentMaxValue]);
          return {
            type: "group",
            children: [
              {
                type: "BarCubeLeft",
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: `rgba(${primaryColor}, .15)`,
                },
              },
              {
                type: "BarCubeRight",
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: `rgba(${primaryColor}, .25)`,
                },
              },
              {
                type: "BarCubeTop",
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: `rgba(${primaryColor}, .35)`,
                },
              },
            ],
          };
        },
        data: chartData.map((item, index) => (item.isEmpty ? 0 : currentMaxValue)),
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 0,
        zlevel: 1,
      },
      {
        // 实际高度立方体
        name: "存量数",
        type: "custom",
        color: `rgba(${primaryColor},1)`, // 设置legend图标颜色
        renderItem: (params: any, api: any) => {
          // 如果是空数据，不渲染
          if (chartData[params.dataIndex]?.isEmpty) {
            return { type: "group", children: [] };
          }

          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: "group",
            children: [
              {
                type: "BarCubeLeft",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: `rgba(${primaryColor},1)`,
                    },
                    {
                      offset: 1,
                      color: `rgba(${primaryColor},1)`,
                    },
                  ]),
                },
              },
              {
                type: "BarCubeRight",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: `#46D9FA`,
                },
              },
              {
                type: "BarCubeTop",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: `#46D9FA`,
                },
              },
            ],
          };
        },
        data: chartValues,
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 100,
        zlevel: 2,
      },
      {
        // 数值标签层
        type: "bar",
        barWidth: 15, // 设置柱子宽度
        label: {
          show: true,
          position: "top",
          formatter: (e: any) => {
            // 如果是空数据，不显示标签
            return chartData[e.dataIndex]?.isEmpty ? "" : e.value + "";
          },
          fontSize: 16,
          color: "#43C4F1",
          offset: [0, -25],
        },
        itemStyle: {
          color: "transparent",
        },
        tooltip: {},
        data: chartValues,
        animationDuration: 800,
        animationEasing: "cubicOut",
        animationDelay: 200,
        zlevel: 3,
      },
    ].filter(Boolean), // 过滤掉 null 值
  };

  return <ChartBase option={option} id="chart_3d_cube" {...restProps} />;
};

export default BarCube;
