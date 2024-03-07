// interface Props {
//     data
// }

import { STACKED_BAR_COLOR } from "@/utils/convertStackedBarChartData";
import { BarChart } from "@mui/x-charts";

export interface MyStackedBarData {
  xLabels: string[]; // 날짜
  cashWon: number[];
  saving: number[];
  stock: number[];
  realEstate: number[];
  debt: number[];
}

interface Props {
  data: MyStackedBarData;
}

function MyStackedBarchart({ data }: Props) {
  const { xLabels, cashWon, saving, stock, realEstate, debt } = data;
  return (
    <BarChart
      width={900}
      height={600}
      margin={{ left: 100, bottom: 90 }} // Legend와의 마진
      series={[
        {
          data: cashWon,
          label: "현금",
          id: "cashWon",
          stack: "total",
          color: STACKED_BAR_COLOR["cashWon"],
          valueFormatter: (item) => `${item.toLocaleString("ko-KR")} 원`,
        },
        {
          data: saving,
          label: "저축",
          id: "saving",
          stack: "total",
          color: STACKED_BAR_COLOR["saving"],
          valueFormatter: (item) => `${item.toLocaleString("ko-KR")} 원`,
        },
        {
          data: stock,
          label: "주식",
          id: "stock",
          stack: "total",
          color: STACKED_BAR_COLOR["stock"],
          valueFormatter: (item) => `${item.toLocaleString("ko-KR")} 원`,
        },
        {
          data: realEstate,
          label: "부동산",
          id: "realEstate",
          stack: "total",
          color: STACKED_BAR_COLOR["realEstate"],
          valueFormatter: (item) => `${item.toLocaleString("ko-KR")} 원`,
        },
        {
          data: debt,
          label: "부채",
          id: "debt",
          stack: "total",
          color: STACKED_BAR_COLOR["debt"],
          valueFormatter: (item) => `${item.toLocaleString("ko-KR")} 원`,
        },
      ]}
      xAxis={[
        {
          data: xLabels,
          scaleType: "band",
          tickLabelStyle: { fontSize: "1rem" },
        },
      ]}
      yAxis={[
        {
          tickLabelStyle: { fontSize: "1rem" },
          valueFormatter: (value) => `${value.toLocaleString("ko-KR")}원`,
        },
      ]}
      slotProps={{
        legend: {
          itemMarkWidth: 20,
          itemMarkHeight: 20,
          itemGap: 20,
          position: { horizontal: "middle", vertical: "bottom" },
        },
      }}
    />
  );
}

export default MyStackedBarchart;
