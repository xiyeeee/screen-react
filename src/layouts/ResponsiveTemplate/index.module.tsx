import ResponsiveLayout from "@/layouts/ResponsiveLayout";
import { ConfigProvider, Popover } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./index.module.less";

interface ResponsiveTemplateProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  backgroundColor?: string;
  showHeader?: boolean;
  title?: string;
  headerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

const ResponsiveTemplate: React.FC<ResponsiveTemplateProps> = (props) => {
  const {
    children,
    width = 1920,
    height = 1080,
    backgroundColor = "#0e1c47",
    showHeader = true,
    title = "数据可视化平台",
    headerStyle = {},
    contentStyle = {},
  } = props;

  // 获取当前时间
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // 更新时间
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const referenceLinks = [
    { label: "MCChart", url: "https://echarts.zhangmuchen.top/#/index" },
    { label: "makeapie 社区", url: "https://www.makeapie.cn/echarts_7.html" },
    { label: "isqqw.com", url: "https://www.isqqw.com/" },
    { label: "chart.majh.top", url: "http://chart.majh.top/" },
  ];

  return (
    <ConfigProvider locale={zhCN}>
      <ResponsiveLayout width={width} height={height} backgroundColor={backgroundColor}>
        <div className={styles.templateContainer}>
          {showHeader && (
            <div className={styles.header} style={headerStyle}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>{title}</div>
                <Popover
                  content={
                    <div>
                      {referenceLinks.map((link) => (
                        <div key={link.url} style={{ marginBottom: 4 }}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  }
                  trigger="hover"
                  placement="bottomLeft"
                >
                  <span style={{ cursor: "pointer", color: "#1890ff" }}>参考链接</span>
                </Popover>
              </div>
              <div className={styles.time}>{currentTime}</div>
            </div>
          )}
          <div
            className={styles.content}
            style={{
              height: showHeader ? "calc(100% - 60px)" : "100%",
              ...contentStyle,
            }}
          >
            {children}
          </div>
        </div>
      </ResponsiveLayout>
    </ConfigProvider>
  );
};

ResponsiveTemplate.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  showHeader: PropTypes.bool,
  title: PropTypes.string,
  headerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
};

export default ResponsiveTemplate;
