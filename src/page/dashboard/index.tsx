import MyPiechart from "@/components/chart/MyPiechart";
import MyStackedBarchart from "@/components/chart/MyStackedBarchart";
import { convertPieChartData } from "@/utils/convertPieChartData";
import { convertStackedBarChartData } from "@/utils/convertStackedBarChartData";
import { getLastUpdateDate, getUserFinancial } from "@/utils/getUser";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./dashboard.module.css";

type Tab = "monthly" | "proportion";

function Dashboard() {
  const monthlyAssets = getUserFinancial();
  const lastUpdate = getLastUpdateDate();

  const [tab, setTab] = useState<Tab>("proportion");

  const onClickTab = (tab: Tab) => setTab(tab);

  const pieChartData = convertPieChartData(monthlyAssets ?? {});
  const assetsSum = pieChartData.reduce((acc, data) => acc + data.value, 0);

  const stackedBarChartData = convertStackedBarChartData(monthlyAssets ?? {});

  return (
    <Box component={"section"} className={styles.wrapper}>
      <Typography className={styles.title} variant="h2">
        나의 자산 통계
      </Typography>

      <Box component={"section"} className={styles.buttonWrapper}>
        <Button
          variant={tab === "proportion" ? "contained" : "outlined"}
          onClick={() => onClickTab("proportion")}
        >
          비중별 보기
        </Button>
        <Button
          variant={tab === "monthly" ? "contained" : "outlined"}
          onClick={() => onClickTab("monthly")}
        >
          월별 보기
        </Button>
      </Box>

      <Box component={"section"} className={styles.chartWrapper}>
        {tab === "proportion" ? (
          <Box component={"div"}>
            <MyPiechart data={pieChartData} assetsSum={assetsSum} />
            <Typography margin={4} variant="body2">
              {lastUpdate} 기준
            </Typography>
          </Box>
        ) : (
          <Box component={"div"}>
            <MyStackedBarchart data={stackedBarChartData} />
            <Typography margin={4} variant="body2">
              {lastUpdate} 기준
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
