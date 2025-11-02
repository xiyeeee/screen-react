import ResponsiveTemplate from "@/layouts/ResponsiveTemplate";
import LeftMenu from "@/pages/preview/components/LeftMenu";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Pagination, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";

// 接口定义
interface ChartComponent {
  key: string;
  name: string;
  description: string;
  category: string;
  position: string;
  component: React.FC<any>;
}

interface TemplateComponent {
  key: string;
  name: string;
  description: string;
  category: string;
  position: string;
  url: string;
  previewImg: string;
}

type ComponentItem = ChartComponent | TemplateComponent;

interface CategoryStats {
  [category: string]: {
    count: number;
    [key: string]: any;
  };
}

interface CategoryEnglishMap {
  [category: string]: string;
}

import {
  allChartList,
  categoryEnglishMap,
  categoryList,
  getCategoryStats,
  getChartsByCategory,
  searchCharts,
} from "@/components";
import { history } from "umi";

const { TabPane } = Tabs;
const { Search } = Input;

const ComponentPreview = () => {
  const [searchText, setSearchText] = useState("");
  const [currentCategory, setCurrentCategory] = useState(() => {
    // 从 localStorage 读取保存的分类，默认为"全部"
    return localStorage.getItem("currentCategory") || "全部";
  });
  const [displayedComponents, setDisplayedComponents] = useState<ComponentItem[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<ComponentItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // 每页显示数量，可修改

  // 构建分类选项（包含全部选项）
  const categories = [
    { id: "全部", name: "全部" },
    ...categoryList.map((cat) => ({ id: cat, name: cat })),
  ];

  useEffect(() => {
    filterComponents();
  }, [searchText, currentCategory]);

  useEffect(() => {
    // 当过滤结果改变时，重置到第一页并更新显示的组件
    setCurrentPage(1);
    updateDisplayedComponents(filteredComponents, 1);
  }, [filteredComponents]);

  useEffect(() => {
    // 当页码或页面大小改变时，更新显示的组件
    updateDisplayedComponents(filteredComponents, currentPage);
  }, [currentPage, pageSize]);

  const filterComponents = () => {
    let result = allChartList;

    // 先按分类筛选
    if (currentCategory !== "全部") {
      result = getChartsByCategory(currentCategory);
    }

    // 再按搜索文本筛选
    if (searchText) {
      result = searchCharts(searchText).filter(
        (chart: ComponentItem) =>
          currentCategory === "全部" ||
          getChartsByCategory(currentCategory).some((c: ComponentItem) => c.key === chart.key),
      );
    }

    setFilteredComponents(result);
  };

  const updateDisplayedComponents = (components: ComponentItem[], page: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedComponents(components.slice(startIndex, endIndex));
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleCategoryChange = (key: string) => {
    setCurrentCategory(key);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1); // 重置到第一页
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 为左侧菜单准备的数据
  const categoryStats = getCategoryStats();
  const menuDataList = [
    {
      key: "全部",
      name: "全部",
      englishName: "All Charts",
      count: allChartList.length,
      category: "chart",
    },
    ...categoryList.map((category) => ({
      key: category,
      name: category,
      englishName: (categoryEnglishMap as CategoryEnglishMap)[category] || category,
      count: (categoryStats as CategoryStats)[category]?.count || 0,
      category: "chart",
    })),
  ];

  const handleSelectItem = (item: { key: string; [key: string]: any }) => {
    setCurrentCategory(item.key);
    // 保存到本地存储
    localStorage.setItem("currentCategory", item.key);
    // console.log("选中分类:", item);
  };

  // 复制路径到剪贴板
  const handleCopyPath = async (path: string) => {
    try {
      await navigator.clipboard.writeText(path);
      message.success("路径已复制到剪贴板！");
    } catch (err) {
      // 如果 clipboard API 不可用，使用旧的方法
      const textArea = document.createElement("textarea");
      textArea.value = path;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      message.success("路径已复制到剪贴板！");
    }
  };

  // 区分模板和普通组件的渲染方式
  const renderPreview = (item: ComponentItem) => {
    if (item.category === "template") {
      // 模板：显示预览图 + 跳转按钮
      const templateItem = item as TemplateComponent;
      return (
        <div className={styles.templatePreview}>
          <div className={styles.templatePlaceholder}>
            <img
              onClick={() => history.push(templateItem.url)}
              src={templateItem.previewImg}
              alt={item.name}
              className={styles.templateImage}
            />
          </div>
          <button onClick={() => history.push(templateItem.url)} className={styles.templateButton}>
            查看完整模板
          </button>
        </div>
      );
    } else {
      // 普通组件：直接渲染预览
      const chartItem = item as ChartComponent;
      return React.createElement(chartItem.component);
    }
  };

  return (
    <div className={styles.componentPreview}>
      <ResponsiveTemplate>
        <div className={styles.menu}>
          <div className={styles.controls}>
            <Search
              placeholder="搜索组件..."
              allowClear
              enterButton
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchBox}
            />

            <LeftMenu
              dataList={menuDataList}
              handleSelectItem={handleSelectItem}
              selectedKey={currentCategory}
            />
          </div>

          <div className={styles.componentsContainer}>
            {displayedComponents.length > 0 ? (
              <>
                <div className={styles.componentsGrid}>
                  {displayedComponents.map((component, index) => (
                    <div key={component.key} className={styles.componentItem}>
                      <div className={styles.componentPreviewBox}>{renderPreview(component)}</div>
                      <div className={styles.componentName}>{component.name}</div>
                      <div className={styles.componentPosition}>
                        路径: {component.position}
                        <Button
                          style={{ color: "#CCC" }}
                          type="text"
                          size="small"
                          icon={<CopyOutlined />}
                          onClick={() => handleCopyPath(component.position)}
                          title="复制路径"
                        >
                          复制
                        </Button>
                      </div>
                      <div className={styles.componentDescription}>
                        <span>{component.description}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {
                  <div className={styles.paginationContainer}>
                    <Pagination
                      current={currentPage}
                      total={filteredComponents.length}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                      showSizeChanger={true}
                      onShowSizeChange={handlePageSizeChange}
                      showQuickJumper
                      showTotal={(total, range) =>
                        `第 ${range[0]}-${range[1]} 条，共 ${total} 个组件`
                      }
                      pageSizeOptions={["6", "9", "12", "18", "24"]}
                    />
                  </div>
                }
              </>
            ) : (
              <Empty
                description={searchText ? `没有找到包含"${searchText}"的组件` : "该分类下暂无组件"}
              />
            )}
          </div>
        </div>
      </ResponsiveTemplate>
    </div>
  );
};

export default ComponentPreview;
