import React, { useState, useEffect } from "react";
import bugImg from "./assets/xsgztj.png";
import styles from "./index.module.less";

// 测试数据
const mockData = [
  {
    faultName: "前胶辊损伤",
    capacity: 12,
  },
  {
    faultName: "上销弹簧失压  ",
    capacity: 26,
  },
  {
    faultName: "锭尖磨损",
    capacity: 6,
  },
  {
    faultName: "卷布辊停转",
    capacity: 9,
  },
  {
    faultName: "盘运输卡顿",
    capacity: 32,
  },
  {
    faultName: "抓管器损坏",
    capacity: 17,
  },
  {
    faultName: "锭子断锭杆",
    capacity: 17,
  },
  {
    faultName: "锭脚漏油",
    capacity: 17,
  },
  {
    faultName: "集体落纱卡管",
    capacity: 17,
  },
  {
    faultName: "气架定位偏差",
    capacity: 17,
  },
  {
    faultName: "罗拉头断裂",
    capacity: 17,
  },
  {
    faultName: "油污纱",
    capacity: 17,
  },
];
// 固定的位置数据
const staticPositionList = [
  {
    top: "37px",
    left: "19px",
  },
  {
    top: "67px",
    left: "-12px",
  },
  {
    bottom: "19px",
    left: "20px",
  },
  {
    top: "37px",
    right: "19px",
  },
  {
    top: "67px",
    right: "-12px",
  },
  {
    bottom: "19px",
    right: "20px",
  },
];

const FrameBugStatistics = ({
  data = mockData.map((item) => ({ name: item.faultName, value: item.capacity })),
}) => {
  const itemsPerPage = 6; // 每页显示6个数据
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const [isLeaving, setIsLeaving] = useState(false);

  // 获取当前显示的数据，并为每个数据项分配位置
  const getCurrentPageData = (startIndex) => {
    const actualData = data.slice(startIndex, startIndex + itemsPerPage);
    // 如果数据不足itemsPerPage，补充空数据
    const filledData = [...actualData];
    while (filledData.length < itemsPerPage) {
      filledData.push({
        name: "",
        value: 0,
        isEmpty: true,
      });
    }
    // 为每个数据项分配对应的位置
    return filledData.map((item, index) => ({
      ...item,
      position: staticPositionList[index],
    }));
  };

  // 初始化数据和自动轮播
  useEffect(() => {
    if (!data || data.length === 0) return;

    // 设置初始数据
    setCurrentData(getCurrentPageData(0));
    setCurrentIndex(0);

    const interval = setInterval(() => {
      // 开始离开动画
      setIsLeaving(true);

      // 0.6秒后更新数据并开始进入动画
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + itemsPerPage;
          const actualNextIndex = nextIndex >= data.length ? 0 : nextIndex;
          const newData = getCurrentPageData(actualNextIndex);
          setCurrentData(newData);
          setIsLeaving(false);
          return actualNextIndex;
        });
      }, 600);
    }, 2000); // 8秒切换一次

    return () => {
      clearInterval(interval);
    };
  }, [data.length]);

  // 当 data 变化时更新显示的数据
  useEffect(() => {
    if (!data || data.length === 0) return;
    setCurrentData(getCurrentPageData(currentIndex));
  }, [currentIndex]);

  return (
    <div className={styles.frameBugStatistics} style={{ backgroundImage: `url(${bugImg})` }}>
      {currentData.map(
        (item, index) =>
          !item.isEmpty && (
            <div
              className={`${styles.bugItem} ${isLeaving ? styles.leaving : ""}`}
              key={index}
              style={{ ...item.position }}
            >
              <div className={styles.bugItemValue}>{item.value}</div>
              <div className={styles.bugItemName}>{item.name}</div>
            </div>
          ),
      )}
    </div>
  );
};

export default FrameBugStatistics;


