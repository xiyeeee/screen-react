import ChartBase from "@/components/ChartBase";
import { useEffect, useState } from "react";
import { initScreenData } from "@/components/Template/SanMao/ScreenOne/static";

// 类型定义
interface ProductionByCapacityVO {
  loomName: string;
  num: number;
  percentage: number;
}

interface CapacityTrendItem {
  timePoint: string;
  productionByCapacityVOS: ProductionByCapacityVO[];
}

interface MonthGroup {
  name: string;
  months: string[];
}

interface GroupedDataItem {
  name: string;
  data: CapacityTrendItem[];
}

interface ChartSeriesItem {
  name: string;
  data: number[];
}

interface ChartData {
  categories: string[];
  series: ChartSeriesItem[];
}

interface PowerStackBarProps {
  data?: CapacityTrendItem[];
  title?: boolean;
  [key: string]: any;
}

const PowerStackBar: React.FC<PowerStackBarProps> = (props) => {
  const { data = initScreenData.capacityTrend } = props;
  const [currentPage, setCurrentPage] = useState<number>(0);

  // 🎯 数据分组逻辑：将数据按月份分组
  const groupDataByMonths = (capacityData: CapacityTrendItem[] | undefined): GroupedDataItem[] => {
    if (!capacityData || !Array.isArray(capacityData)) {
      return [];
    }

    // 按月份分组：1-4月、5-8月、9-12月
    const monthGroups: MonthGroup[] = [
      { name: "1-4月", months: ["01", "02", "03", "04"] },
      { name: "5-8月", months: ["05", "06", "07", "08"] },
      { name: "9-12月", months: ["09", "10", "11", "12"] },
    ];

    const validGroups: GroupedDataItem[] = [];

    monthGroups.forEach((group) => {
      const groupData: CapacityTrendItem[] = [];
      let hasRealData = false; // 标记是否有真实数据

      // 为每个月份生成数据，没有数据的月份用空数据填充
      group.months.forEach((month) => {
        const monthData = capacityData.find((item) => {
          const itemMonth = item.timePoint.split("/")[1];
          return itemMonth === month;
        });

        if (monthData) {
          groupData.push(monthData);
          hasRealData = true; // 发现真实数据
        } else {
          // 没有数据的月份，创建空数据
          const year = capacityData[0]?.timePoint.split("/")[0] || "2025";
          groupData.push({
            timePoint: `${year}/${month}`,
            productionByCapacityVOS: [
              { loomName: "型号01", num: 0, percentage: 0 },
              { loomName: "型号02", num: 0, percentage: 0 },
              { loomName: "型号03", num: 0, percentage: 0 },
            ],
          });
        }
      });

      // 只有包含真实数据的分组才加入到结果中
      if (hasRealData) {
        validGroups.push({
          name: group.name,
          data: groupData,
        });
      }
    });

    return validGroups;
  };

  // 🎯 自动轮播逻辑
  useEffect(() => {
    const groupedData = groupDataByMonths(data);
    if (groupedData.length === 0) return;

    // 如果当前页面超出了新的分组数量，重置为0
    if (currentPage >= groupedData.length) {
      setCurrentPage(0);
    }

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % groupedData.length);
    }, 1000); // 每1秒切换一次

    return () => clearInterval(interval);
  }, [data, currentPage]);

  // 🎯 将嵌套数组格式转换成堆叠柱状图所需格式
  const transformDataToStackBarData = (capacityData: CapacityTrendItem[] | null): ChartData => {
    if (!capacityData || !Array.isArray(capacityData)) {
      return {
        categories: ["2025/01", "2025/02", "2025/03", "2025/04"],
        series: [
          {
            name: "类型01",
            data: [0, 0, 0, 0],
          },
          {
            name: "类型02",
            data: [0, 0, 0, 0],
          },
          {
            name: "类型03",
            data: [0, 0, 0, 0],
          },
        ],
      };
    }

    // 提取所有时间点
    const categories: string[] = capacityData.map((item) => item.timePoint);

    // 获取所有型号名称（从第一个有数据的时间点获取）
    const loomNames: string[] =
      capacityData
        .find((item) => item.productionByCapacityVOS.length > 0)
        ?.productionByCapacityVOS?.map((item) => item.loomName) || [];

    // 为每个型号构建数据系列（使用percentage字段，确保总和为100%）
    const series: ChartSeriesItem[] = loomNames.map((loomName, loomIndex) => ({
      name: loomName,
      data: capacityData.map((timeItem, timeIndex) => {
        const production = timeItem.productionByCapacityVOS.find((p) => p.loomName === loomName);

        if (!production || production.percentage === 0) return 0;

        // 如果是最后一个型号，用100减去前面所有型号的总和
        if (loomIndex === loomNames.length - 1) {
          // 计算前面所有型号在这个时间点的百分比总和
          let sumOfPrevious = 0;
          for (let i = 0; i < loomIndex; i++) {
            const prevProduction = timeItem.productionByCapacityVOS.find(
              (p) => p.loomName === loomNames[i],
            );
            if (prevProduction) {
              sumOfPrevious += Math.round(prevProduction.percentage);
            }
          }
          return Math.max(0, 100 - sumOfPrevious); // 确保不为负数
        } else {
          return Math.round(production.percentage); // 四舍五入保留整数
        }
      }),
    }));

    return { categories, series };
  };

  // 🎯 获取当前分组的数据
  const getGroupedData = (): GroupedDataItem | null => {
    const groupedData = groupDataByMonths(data);
    if (groupedData.length === 0) return null;
    // 确保 currentPage 在有效范围内
    const validPage = currentPage >= groupedData.length ? 0 : currentPage;
    return groupedData[validPage];
  };

  const currentGroupData: GroupedDataItem | null = getGroupedData();
  const chartData = currentGroupData
    ? transformDataToStackBarData(currentGroupData.data)
    : transformDataToStackBarData(null);

  const { title = false, ...restProps } = props;

  const option = {
    legend: {
      show: true,
      data: chartData.series.map((item) => item.name),
      top: "1%", // 图例位置保持不变
      left: "center",
      padding: [10, 0, 15, 0], // 专门增加图例下方15px间距
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 25,
      icon: "rect",
    },

    grid: {
      top: "20%", // 增加顶部距离，让图例和图表分离更远
      left: "5%",
      right: "5%",
      bottom: "0%",
      containLabel: true,
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        let result = `<div style="background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.2);padding:8px;border-radius:4px;">
          <div style="color:#fff;margin-bottom:6px;">${params[0].axisValue}</div>`;

        params.forEach((param) => {
          result += `<div style="margin-bottom:3px;">
            <span style="display:inline-block;width:10px;height:10px;background:${
              param.color.colorStops ? param.color.colorStops[0].color : param.color
            };margin-right:8px;"></span>
            <span style="color:#fff;">${param.seriesName}: ${param.value}%</span>
          </div>`;
        });

        result += "</div>";
        return result;
      },
    },

    xAxis: {
      type: "category",
      data: chartData.categories,
      axisLabel: {
        color: "#fff",
        fontSize: 11,
        margin: 12,
        rotate: 0,
        interval: 0,
        overflow: "none",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

    yAxis: {
      type: "value",
      max: 100,
      axisLabel: {
        color: "#fff",
        fontSize: 12,

        formatter: "{value}%",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.1)",
          type: "dashed",
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

    series: chartData.series.map((seriesItem, index) => {
      const colors = [
        { start: "#42FF38", end: "rgba(76, 255, 45, 0)" }, // 绿色系
        { start: "#FCB717", end: "rgba(255, 251, 45, 0)" }, // 黄色系
        { start: "#384CFF", end: "rgba(45, 129, 255, 0)" }, // 蓝色系
      ];

      return {
        name: seriesItem.name, // 使用动态名称
        type: "bar",
        stack: "total",
        barWidth: 30,
        barCategoryGap: "40%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: colors[index % colors.length].start,
              },
              {
                offset: 1,
                color: colors[index % colors.length].end,
              },
            ],
          },
        },
        label: {
          show: true,
          position: "inside",
          color: "#fff",
          fontSize: 12,
          fontWeight: 400,
          formatter: function (params: any) {
            // 只有当值大于0时才显示标签
            return params.value > 0 ? `${params.value}%` : "";
          },
        },
        data: seriesItem.data,
      };
    }),

    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicOut",
  };

  return <ChartBase title={title} option={option} id="chart_power_stackbar" {...restProps} />;
};

export default PowerStackBar;