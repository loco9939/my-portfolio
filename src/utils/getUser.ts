export interface FinancialData {
  cashWon: number;
  saving: number;
  stock: number;
  realEstate: number;
  debt: number;
  date: string;
}
interface User {
  email: string;
  financialData?: FinancialData;
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
  return user?.financialData;
};
