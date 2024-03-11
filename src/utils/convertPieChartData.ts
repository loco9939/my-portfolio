import { MonthlyAssets } from "./getUser";

const KEY_DISPLAY: { [key: string]: string } = {
  cashWon: "현금",
  saving: "저축",
  stock: "주식",
  realEstate: "부동산",
  debt: "부채",
};

const COLOR: { [key: string]: string } = {
  cashWon: "#1876D2",
  saving: "#009DE6",
  stock: "#00BED8",
  realEstate: "#00D9B1",
  debt: "#8DEE86",
};

export const convertPieChartData = (data: MonthlyAssets) => {
  const sortedKeys = Object.keys(data ?? {}).sort((a, b) => b.localeCompare(a));
  const latestFinancialData = data[sortedKeys[0]];

  const chartData = Object.entries(latestFinancialData ?? {})
    .map(([key, value]) => {
      if (value === 0 || key === "date") return;
      return {
        id: Math.floor(Math.random() * 1000),
        value,
        label: KEY_DISPLAY[key],
        color: COLOR[key],
      };
    })
    .filter((d) => d) as { id: number; value: number; label: string }[];

  return chartData;
};
