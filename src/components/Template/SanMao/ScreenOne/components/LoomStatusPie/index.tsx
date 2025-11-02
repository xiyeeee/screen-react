import React from "react";
import CustomLegendPie3d from "../CustomLegendPie3d";
import styles from "./index.module.less";

interface Props {
  [key: string]: any;
}

const LoomStatusPie: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <div className={styles.statusPieContainer}>
      <CustomLegendPie3d data={data} />
    </div>
  );
};

export default LoomStatusPie;


