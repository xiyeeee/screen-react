import * as echarts from "echarts";
import "echarts-gl";
import { useEffect, useRef } from "react";
import styles from "./index.less";

const ChartBase = (props: any) => {
  const {
    option = {},
    className = "",
    style = {},
    onChartReady = () => {},
    id = `chart_${Math.random().toString(36).substr(2, 9)}`,
  } = props;

  const chartRef = useRef(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  // 初始化图表
  useEffect(() => {
    if (chartRef.current) {
      // 如果已经有实例，先销毁
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      // 先调用 onChartReady，确保地图注册等准备工作完成
      onChartReady(null);
      // 创建新实例
      chartInstance.current = echarts.init(chartRef.current);

      // 设置配置项
      if (option && Object.keys(option).length > 0) {
        chartInstance.current.setOption(option, true);
      }

      // 再次调用 onChartReady，传入图表实例
      onChartReady(chartInstance.current);
    }

    return () => {
      // 组件卸载时销毁图表实例
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 当option变化时更新图表
  useEffect(() => {
    if (chartInstance.current && option && Object.keys(option).length > 0) {
      chartInstance.current.setOption(option, true);
    }
  }, [option]);

  // 窗口大小变化时，重新调整图表大小
  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 确保图表在DOM完全渲染后调整大小
  useEffect(() => {
    const timer = setTimeout(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${styles.chartBase} ${className}`} style={style}>
      <div className={styles.chartContainer} id={id} ref={chartRef} />
    </div>
  );
};

export default ChartBase;
