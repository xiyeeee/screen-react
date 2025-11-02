import ResponsiveTemplate from "@/layouts/ResponsiveTemplate";
import { useEffect, useState } from "react";
import changeSecondTitleImg from "./assets/changeSecondTitle.png";
import ChartCard from "./components/ChartCard";
import CylinderBarChart from "./components/CylinderBarChart/index";
import GlobalBusinessMap from "./components/GlobalBusinessMap";
import HorizontalBarChart from "./components/HorizontalBarChart/index";
import LoomCapacityTrend from "./components/LoomCapacityTrend";
import LoomRuntimeRatio from "./components/LoomRuntimeRatio";
import LoomStatusPie from "./components/LoomStatusPie";
import ModelRatioPie3d from "./components/ModelRatioPie3d";
import NumberCard from "./components/NumberCard";
import PageHeader from "./components/PageHeader";
import PowerStackBar from "./components/PowerStackBar";
import styles from "./index.module.less";
import { initScreenData } from "./static";
const ScreenOne = () => {
  const [screenData, setScreenData] = useState(initScreenData);
  useEffect(() => {
    getScreenData();
  }, []);
  const getScreenData = async () => {
    try {
      // 报错兜底
      setScreenData(initScreenData);
    } catch (error) {
      // console.log(error);
      setScreenData(initScreenData);
    }
  };
  return (
    <ResponsiveTemplate showHeader={false} width={1440} height={900}>
      <div className={styles.screenContainer}>
        {/* 使用PageHeader组件 */}
        <PageHeader title="xx有限公司" />

        {/* 主体内容区 */}
        <div className={styles.mainContent}>
          {/* 左侧内容 */}
          <div className={styles.leftSection}>
            <ChartCard title="运行时长占比">
              <LoomRuntimeRatio data={screenData.loomRuntimes} />
            </ChartCard>

            <ChartCard title="状态占比统计">
              <LoomStatusPie data={screenData.statusDist} />
            </ChartCard>
            <ChartCard className={styles.bottomDiv} title="各产量">
              <HorizontalBarChart data={screenData.loomProduction} />
            </ChartCard>
          </div>

          {/* 中间内容 */}
          <div className={styles.centerSection}>
            <div className={styles.statsCards}>
              {screenData.statusDist.map((item, index) => {
                return <NumberCard title={item.state} number={item.count} unit="个" key={index} />;
              })}
            </div>

            <ChartCard
              className={styles.bottomDiv}
              title="产能变化趋势"
              secondTitleImage={changeSecondTitleImg}
            >
              <LoomCapacityTrend data={screenData.capacityTrend} />
            </ChartCard>
          </div>

          {/* 右侧内容 */}
          <div className={styles.rightSection}>
            <ChartCard title="故障统计">
              <CylinderBarChart data={screenData.faultStatistics} />
            </ChartCard>
            <ChartCard title="各型号占比">
              <ModelRatioPie3d data={screenData.loomModelDistribution} />
            </ChartCard>
            <ChartCard className={styles.bottomDiv} title="各型号产能对比">
              <PowerStackBar data={screenData.capacityTrend} />
            </ChartCard>
          </div>
        </div>
        <div className={styles.worldMap}>
          <GlobalBusinessMap />
        </div>
        <div className={styles.worldMapBg} />
        <div className={styles.topBlack} />
        <div className={styles.rightBlack} />
        <div className={styles.bottomBlack} />
        <div className={styles.leftBlack} />
      </div>
    </ResponsiveTemplate>
  );
};

export default ScreenOne;
