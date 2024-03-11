// interface Props {
//     data
// }

import { STACKED_BAR_COLOR } from "@/utils/convertStackedBarChartData";
import { convertYaxis } from "@/utils/convertYaxis";
import { BarChart, BarSeriesType } from "@mui/x-charts";
import { MakeOptional } from "node_modules/@mui/x-charts/models/helpers";

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

  const series: MakeOptional<BarSeriesType, "type">[] = [
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
  ];

  return (
    <BarChart
      width={800}
      height={500}
      margin={{ left: 100, bottom: 90 }} // Legend와의 마진
      series={series.filter((s) => s.data?.some((value) => value !== 0))}
      xAxis={[
        {
          data: xLabels,
          scaleType: "band",
          tickLabelStyle: { fontSize: "1.2rem" },
        },
      ]}
      yAxis={[
        {
          tickLabelStyle: { fontSize: "1rem" },
          valueFormatter: (value) => `${convertYaxis(value)}`,
        },
      ]}
      slotProps={{
        legend: {
          itemMarkWidth: 20,
          itemMarkHeight: 20,
          itemGap: 20,
          position: { horizontal: "middle", vertical: "bottom" },
          labelStyle: { fontSize: "1.3rem" },
        },
      }}
    />
  );
}

export default MyStackedBarchart;
