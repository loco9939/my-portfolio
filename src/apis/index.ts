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

export const postAssets = async (params: MonthlyAssets) => {
  await axios.post(`http://localhost:${PORT}/save-financial-data`, params);
};

// TODO: 첫 등록한 데이터에 업데이트한 것 DB에 저장하기.
export const updateAssets = async (params: MonthlyAssets) => {
  await axios.patch(
    `http://localhost:${PORT}/update-financial-data/:${params.userId}`,
    params
  );
};
