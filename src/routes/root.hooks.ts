import { User } from "..";

export const useLogin = () => {
  const userString = window.localStorage.getItem("user");
  const user = userString ? (JSON.parse(userString) as User) : null;

  return Boolean(user);
};
