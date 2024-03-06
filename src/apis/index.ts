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
  email: string;
  lastUpdate: string;
  monthlyAssets: { [monthlyYear: string]: IAssets };
}

export const postAssets = async (params: MonthlyAssets) => {
  await axios.post(`http://localhost:${PORT}/save-financial-data`, params);
};

// TODO: 첫 등록한 데이터에 업데이트한 것 DB에 저장하기.
// NOTE: searchParams에 인자를 넣어줄 땐, :빼고 넣는다. 콜론은 해당 자리에 어떤 자리든 들어갈 수 있다는 의미이다.
export const updateAssets = async (params: MonthlyAssets) => {
  await axios.patch(
    `http://localhost:${PORT}/update-financial-data/${params.email}`,
    params
  );
};
