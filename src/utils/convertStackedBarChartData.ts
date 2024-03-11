import { MyStackedBarData } from "@/components/chart/MyStackedBarchart";
import dayjs from "dayjs";
import { MonthlyAssets } from "./getUser";

export const STACKED_BAR_COLOR: { [key: string]: string } = {
  cashWon: "#1876D2",
  saving: "#009DE6",
  stock: "#00BED8",
  realEstate: "#00D9B1",
  debt: "#8DEE86",
};

export const convertStackedBarChartData = (monthlyAssets?: MonthlyAssets) => {
  //   if (!monthlyAssets) return {};

  return Object.entries(monthlyAssets ?? {}).reduce(
    (acc, cur) => {
      const [date, financialObj] = cur;
      const { cashWon, stock, debt, realEstate, saving } = financialObj;

      return {
        xLabels: [...acc.xLabels, dayjs(date).format("YYYY년 MM월")],
        cashWon: [...acc.cashWon, cashWon],
        stock: [...acc.stock, stock],
        debt: [...acc.debt, debt],
        realEstate: [...acc.realEstate, realEstate],
        saving: [...acc.saving, saving],
      };
    },
    {
      xLabels: [], // 날짜
      cashWon: [],
      saving: [],
      stock: [],
      realEstate: [],
      debt: [],
    } as MyStackedBarData
  );
};
