export const convertYaxis = (value: number) => {
  if (value >= 100000000) {
    return `${(value / 100000000).toLocaleString("ko-KR")} 억원`;
  } else if (value >= 1000000) {
    return `${(value / 10000).toLocaleString("ko-KR")} 만원`;
  } else if (value < 1000000) {
    return 0;
  }
};
