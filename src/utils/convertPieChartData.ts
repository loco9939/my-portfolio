import { MonthlyAssets } from "./getUser";

const KEY_DISPLAY: { [key: string]: string } = {
  cashWon: "현금",
  saving: "저축",
  stock: "주식",
  realEstate: "부동산",
  debt: "부채",
};

const COLOR: { [key: string]: string } = {
  cashWon: "#27B2AF",
  saving: "#2E96FF",
  stock: "#B820D8",
  realEstate: "yellow",
  debt: "red",
};

export const convertPieChartData = (data: MonthlyAssets) => {
  // TODO: 월별 자산 총합이 아닌 최신 날짜를 기준으로 비중 노출
  const totalFinancialData = Object.values(data ?? {}).reduce(
    (acc, cur) => {
      const { cashWon, saving, stock, realEstate, debt } = cur;
      return {
        cashWon: acc.cashWon + cashWon,
        saving: acc.saving + saving,
        stock: acc.stock + stock,
        realEstate: acc.realEstate + realEstate,
        debt: acc.debt + debt,
      };
    },
    { cashWon: 0, saving: 0, stock: 0, realEstate: 0, debt: 0 }
  );

  const chartData = Object.entries(totalFinancialData)
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
