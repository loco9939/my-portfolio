import { useLogin } from "@/routes/root.hooks";

import { convertPieChartData } from "@/utils/convertPieChartData";
import { getUserFinancial } from "@/utils/getUser";
import { Box, Button, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

type Tab = "monthly" | "proportion";

function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = useLogin();
  const userFinancialData = getUserFinancial();

  const [tab, setTab] = useState<Tab>("proportion");

  const onClickTab = (tab: Tab) => setTab(tab);

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else if (!userFinancialData) {
      navigate("/register-assets");
    }
  }, [isLoggedIn, userFinancialData, navigate]);

  const pieChartData = convertPieChartData(Object.values(userFinancialData)[0]);
  const assetsSum = pieChartData.reduce((acc, data) => acc + data.value, 0);

  return (
    <Box component={"section"} className={styles.wrapper}>
      <Typography className={styles.title} variant="h2">
        나의 자산 통계
      </Typography>

      <Box component={"div"} className={styles.buttonWrapper}>
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

      <Box component={"div"} className={styles.chartWrapper}>
        <Box>
          <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius: 5,
                paddingAngle: 2,
                cornerRadius: 5,
                valueFormatter: (value) =>
                  `${value.value.toLocaleString("ko-KR")} 원`,
                arcLabel: (item) =>
                  `${((item.value / assetsSum) * 100).toFixed(2)} %`,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: "18px",
              },
            }}
            width={600}
            height={400}
          />
          <Typography margin={4} variant="body2">
            {userFinancialData?.date?.slice(0, 10)} 기준
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
