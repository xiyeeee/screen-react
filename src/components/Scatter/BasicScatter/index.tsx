import { useState, useEffect } from 'react'
import * as echarts from 'echarts'
import ChartBase from '@/components/ChartBase'

interface Props {
  [key: string]: any;
}

const BasicScatter: React.FC<Props> = (props) => {
  const {
    chartData = {
      series: [
        {
          name: '系列1',
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68],
          ],
        },
        {
          name: '系列2',
          data: [
            [9.0, 9.04],
            [7.0, 8.95],
            [15.0, 8.58],
            [8.0, 7.81],
            [10.0, 6.33],
            [12.0, 8.96],
            [5.0, 6.24],
            [3.0, 3.26],
            [14.0, 9.84],
            [6.0, 5.82],
            [4.0, 4.68],
          ],
        },
      ],
    },
    showLegend = true,
    showTrendLine = false,
    showBubbleSize = false,
    symbolSize = 10,
    colorConfig = [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc',
    ],
    title = '基础散点图',
    xAxisName = 'X轴',
    yAxisName = 'Y轴',
    ...restProps
  } = props

  // 计算趋势线数据
  const calculateTrendLine = (data) => {
    if (!data || !data.length) return []

    // 计算线性回归
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumX2 = 0
    let n = data.length

    for (let i = 0; i < n; i++) {
      sumX += data[i][0]
      sumY += data[i][1]
      sumXY += data[i][0] * data[i][1]
      sumX2 += data[i][0] * data[i][0]
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    // 找到x的最小值和最大值
    const minX = Math.min(...data.map((item) => item[0]))
    const maxX = Math.max(...data.map((item) => item[0]))

    // 返回趋势线的两个点
    return [
      [minX, slope * minX + intercept],
      [maxX, slope * maxX + intercept],
    ]
  }

  const series = []

  chartData.series.forEach((item, index) => {
    // 添加散点
    series.push({
      name: item.name,
      type: 'scatter',
      data: item.data,
      symbolSize:
        showBubbleSize && item.symbolSize
          ? (value) => value[2] || symbolSize
          : symbolSize,
      itemStyle: {
        color: colorConfig[index % colorConfig.length],
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
    })

    // 添加趋势线
    if (showTrendLine) {
      const trendLineData = calculateTrendLine(item.data)
      if (trendLineData.length) {
        series.push({
          name: `${item.name} 趋势线`,
          type: 'line',
          data: trendLineData,
          showSymbol: false,
          lineStyle: {
            color: colorConfig[index % colorConfig.length],
            type: 'dashed',
          },
        })
      }
    }
  })

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.seriesType === 'scatter') {
          return `${params.seriesName}<br/>${xAxisName}: ${
            params.value[0]
          }<br/>${yAxisName}: ${params.value[1]}${
            params.value[2] ? '<br/>大小: ' + params.value[2] : ''
          }`
        } else {
          return `${params.seriesName}<br/>${xAxisName}: ${params.value[0]}<br/>${yAxisName}: ${params.value[1]}`
        }
      },
    },
    legend: {
      data: chartData.series.map((item) => item.name),
      show: showLegend,
      right: 10,
      top: 10,
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: xAxisName,
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: '#fff',
      },
      axisLine: {
        lineStyle: {
          color: '#2867a8',
        },
      },
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: yAxisName,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        color: '#fff',
      },
      axisLine: {
        lineStyle: {
          color: '#2867a8',
        },
      },
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    series: series,
    color: colorConfig,
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5
    },
  }

  return (
    <ChartBase
      title={title}
      option={option}
      id="chart_scatter"
      {...restProps}
    />
  )
}

export default BasicScatter



