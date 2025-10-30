import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
interface ResponsiveLayoutProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

/**
 * 响应式布局容器
 */
const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = (props) => {
  const { children, width = 1920, height = 1080, backgroundColor = "#0e1c47", style = {} } = props;

  const layoutRef = useRef(null);
  const [transform, setTransform] = useState("");

  // 计算缩放比例
  const calculateScale = () => {
    if (!layoutRef.current) return;

    const currentWidth = document.documentElement.clientWidth;
    const currentHeight = document.documentElement.clientHeight;

    // 计算宽高比例
    const widthScale = currentWidth / width;
    const heightScale = currentHeight / height;

    // 取最小的缩放比例，确保内容完全展示
    const scale = Math.min(widthScale, heightScale);

    // 计算居中偏移
    const translateX = (currentWidth - width * scale) / 2;
    const translateY = (currentHeight - height * scale) / 2;

    setTransform(`translate(${translateX}px, ${translateY}px) scale(${scale})`);
  };

  // 监听窗口大小变化
  useEffect(() => {
    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, [width, height]);

  return (
    <div className={styles.responsiveLayoutContainer} style={{ backgroundColor, ...style }}>
      <div
        ref={layoutRef}
        className={styles.responsiveLayoutContent}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform,
          transformOrigin: "left top",
        }}
      >
        {children}
      </div>
    </div>
  );
};

ResponsiveLayout.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};

export default ResponsiveLayout;
