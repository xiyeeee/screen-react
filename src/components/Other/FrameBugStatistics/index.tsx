import { useEffect, useState } from "react";
import bugImg from "./assets/xsgztj.png";
import styles from "./index.module.less";

// 测试数据
const mockData = [
  {
    faultName: "问题1",
    capacity: 12,
  },
  {
    faultName: "问题2",
    capacity: 26,
  },
  {
    faultName: "问题3",
    capacity: 6,
  },
  {
    faultName: "问题4",
    capacity: 9,
  },
  {
    faultName: "问题5",
    capacity: 32,
  },
  {
    faultName: "问题6",
    capacity: 17,
  },
  {
    faultName: "问题7",
    capacity: 17,
  },
  {
    faultName: "问题8",
    capacity: 17,
  },
  {
    faultName: "问题9",
    capacity: 17,
  },
  {
    faultName: "问题10",
    capacity: 17,
  },
  {
    faultName: "问题11",
    capacity: 17,
  },
  {
    faultName: "问题12",
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

// 类型定义
interface BugDataItem {
  name: string;
  value: number;
  isEmpty?: boolean;
  position?: {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
  };
}

interface FrameBugStatisticsProps {
  data?: BugDataItem[];
}

const FrameBugStatistics: React.FC<FrameBugStatisticsProps> = ({
  data = mockData.map((item) => ({ name: item.faultName, value: item.capacity })),
}) => {
  const itemsPerPage = 6; // 每页显示6个数据
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentData, setCurrentData] = useState<BugDataItem[]>([]);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);

  // 获取当前显示的数据，并为每个数据项分配位置
  const getCurrentPageData = (startIndex: number): BugDataItem[] => {
    const actualData = data.slice(startIndex, startIndex + itemsPerPage);
    // 如果数据不足itemsPerPage，补充空数据
    const filledData: BugDataItem[] = [...actualData];
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
