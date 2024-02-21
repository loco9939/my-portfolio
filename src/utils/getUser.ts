export interface FinancialData {
  cashWon: number;
  saving: number;
  stock: number;
  realEstate: number;
  debt: number;
}
interface User {
  email: string;
  lastUpdate: string;
  monthlyAssets: { [key: string]: FinancialData };
}

export const getUserId = () => {
  const localUser = localStorage.getItem("user");
  if (!localUser) return;

  const user: User = JSON.parse(localUser);
  return user.email;
};

export const getUserFinancial = () => {
  const localUser = localStorage.getItem("user");
  if (!localUser) return;

  const user: User = JSON.parse(localUser);
  return user.monthlyAssets;
};

export const getLastUpdateDate = () => {
  const localUser = localStorage.getItem("user");
  if (!localUser) return;

  const user: User = JSON.parse(localUser);
  return user.lastUpdate;
};
