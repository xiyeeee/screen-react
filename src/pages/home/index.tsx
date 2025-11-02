import { Button, Space, Typography } from "antd";
import { history } from "umi";
import styles from "./index.module.less";

const { Title, Paragraph } = Typography;

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title level={1} className={styles.title}>
          数据可视化组件库
        </Title>
        <Paragraph className={styles.description}>
          基于React和ECharts构建的数据可视化组件库，提供丰富的图表组件。
        </Paragraph>
        <Space size="large">
          <Button type="primary" size="large" onClick={() => history.push("/preview")}>
            组件预览
          </Button>
        </Space>
      </div>
    </div>
  );
};
