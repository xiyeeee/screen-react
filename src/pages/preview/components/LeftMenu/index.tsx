import { Badge, List } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";

// 接口定义
interface MenuItem {
  key: string;
  name: string;
  englishName: string;
  count: number;
  [key: string]: any;
}

interface CategoryProps {
  dataList: MenuItem[];
  handleSelectItem: (item: MenuItem) => void;
  loading?: boolean;
}

const Category: React.FC<CategoryProps> = ({ dataList, handleSelectItem, loading = false }) => {
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (dataList.length) {
      setSelectedItem(dataList[0].key);
      handleSelectItem(dataList[0]);
    }
  }, []);

  const handleItemClick = (key: string, item: MenuItem) => {
    setSelectedItem(key);
    handleSelectItem(item);
  };

  return (
    <div className={styles.category}>
      <List
        className={styles.list}
        itemLayout="horizontal"
        dataSource={dataList}
        key="id"
        renderItem={(item: MenuItem) => {
          const isActive = item.key === selectedItem;
          const itemClassName = classNames({
            [styles.listItem]: true,
            [styles.listItemActive]: isActive,
          });
          return (
            <List.Item className={itemClassName} onClick={() => handleItemClick(item.key, item)}>
              <div className={styles.itemContent}>
                <div className={styles.nameContainer}>
                  <div className={styles.chineseName}>{item.name}</div>
                  <div className={styles.englishName}>{item.englishName}</div>
                </div>
                <Badge
                  count={item.count}
                  showZero
                  className={styles.countBadge}
                  color={isActive ? "#1890ff" : "#8c8c8c"}
                />
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
export default Category;
