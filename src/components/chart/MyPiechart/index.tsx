import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

interface Props {
  data: {
    id: number;
    value: number;
    label: string;
  }[];
  assetsSum: number;
}
function MyPiechart({ data, assetsSum }: Props) {
  return (
    <PieChart
      width={600}
      height={400}
      series={[
        {
          data,
          innerRadius: 5,
          paddingAngle: 2,
          cornerRadius: 5,
          valueFormatter: (item) =>
            `${item.value.toLocaleString("ko-KR")} 원 (${(
              (item.value / assetsSum) *
              100
            ).toFixed(2)} %)
      `,
          arcLabel: (item) =>
            `${((item.value / assetsSum) * 100).toFixed(2)} %`,
          arcLabelMinAngle: 35, // 45도 미만인 구간은 % 노출 안함(짤림이슈)
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontWeight: "bold",
          fontSize: "1rem",
        },
      }}
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: "1.3rem",
            paddingBlock: "8px",
          },
        },
      }}
    />
  );
}

export default MyPiechart;
