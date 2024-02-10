import { FinancialData } from "./getUser";

const KEY_DISPLAY: { [key: string]: string } = {
  cashWon: "현금",
  saving: "저축",
  stock: "주식",
  realEstate: "부동산",
  debt: "부채",
};

export const convertPieChartData = (data?: FinancialData) => {
  if (!data) return [];

  const chartData = Object.entries(data)
    .map(([key, value]) => {
      if (value === 0 || key === "date") return;
      return {
        id: Math.floor(Math.random() * 1000),
        value,
        label: KEY_DISPLAY[key],
      };
    })
    .filter((d) => d) as { id: number; value: number; label: string }[];

  return chartData;
};
