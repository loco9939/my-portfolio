import { IAssets } from "@/page/registerAssets";
import axios from "axios";

const PORT = 5050;

interface PostSignup {
  email: string;
  password: string;
}

export const postSignUp = async ({ email, password }: PostSignup) =>
  await axios.post(`http://localhost:${PORT}/signup`, {
    email,
    password,
  });

export const postSignIn = async ({ email, password }: PostSignup) =>
  await axios.post(`http://localhost:${PORT}/signin`, {
    email,
    password,
  });

interface MonthlyAssets {
  userId: string;
  lastUpdate: string;
  monthlyAssets: { [monthlyYear: string]: IAssets };
}
type AssetsParams = {
  userId: string;
} & MonthlyAssets;

export const postAssets = async (params: AssetsParams) => {
  await axios.post(`http://localhost:${PORT}/save-financial-data`, params);
};

export const putAssets = async (params: AssetsParams) => {};
