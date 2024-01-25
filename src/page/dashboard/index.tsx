import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styles from "./dashboard.module.css";

/** 자산 종류
 * 현금(원화)
 * 달러
 * 저축(예금 및 적금 또는 비상금 등)
 * 주식
 * 채권
 * 금
 * 부동산
 */
interface Schema {
  cashWon: number;
  cashDollar: number;
  saving: number;
  stock: number;
  bond: number;
  gold: number;
  realEstate: number;
}

const schema = yup.object({
  cashWon: yup.number().min(0).required(),
  cashDollar: yup.number().min(0).required(),
  saving: yup.number().min(0).required(),
  stock: yup.number().min(0).required(),
  bond: yup.number().min(0).required(),
  gold: yup.number().min(0).required(),
  realEstate: yup.number().min(0).required(),
});

function Dashboard() {
  // TODO: User 데이터가 있으면 데이터 바로 띄워주고 없다면, 데이터 입력하기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const handleAssets = async (data: Schema) => {
    const { cashWon, cashDollar, saving, stock, bond, gold, realEstate } = data;

    // try {
    //   await axios.post("http://localhost:5000/signin", {
    //     email,
    //     password,
    //   });
    //   window.localStorage.setItem("user", JSON.stringify({ email }));
    //   alert("로그인에 성공했습니다!");
    //   navigate("/dashboard");
    // } catch (error) {
    //   const { response } = error as unknown as AxiosError;

    //   if (response?.status === 401) {
    //     alert("아이디 또는 비밀번호를 확인해주세요.");
    //   }
    // }
  };

  const onSubmit = (data: Schema) => {
    handleAssets(data);
  };

  return (
    <Box component={"section"} className={styles.wrapper}>
      <Typography className={styles.title} variant="h2">
        나의 자산
      </Typography>

      <Box
        component={"form"}
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, (data) =>
          console.log("on Submit Error: ", data)
        )}
      >
        <TextField
          {...register("cashWon")}
          label="현금"
          variant="outlined"
          error={Boolean(errors.cashWon)}
          helperText={
            errors.cashWon
              ? "0이상의 숫자를 입력해주세요."
              : "현금(원화)를 입력해주세요."
          }
        />
        <TextField
          {...register("cashDollar")}
          type="text"
          label="달러"
          variant="outlined"
          error={Boolean(errors.cashDollar)}
          helperText={
            Boolean(errors.cashDollar) && "0이상의 숫자를 입력해주세요."
          }
        />

        <TextField
          {...register("saving")}
          label="저축"
          variant="outlined"
          error={Boolean(errors.saving)}
          helperText={
            errors.saving
              ? "0이상의 숫자를 입력해주세요."
              : "적금,비상금을 입력해주세요."
          }
        />
        <TextField
          {...register("stock")}
          type="text"
          label="주식"
          variant="outlined"
          error={Boolean(errors.stock)}
          helperText={
            errors.stock
              ? "0이상의 숫자를 입력해주세요."
              : "국내주식, 해외주식을 입력해주세요."
          }
        />

        <TextField
          {...register("bond")}
          label="채권"
          variant="outlined"
          error={Boolean(errors.bond)}
          helperText={errors.bond ? "0이상의 숫자를 입력해주세요." : ""}
        />

        <TextField
          {...register("gold")}
          label="금"
          variant="outlined"
          error={Boolean(errors.gold)}
          helperText={errors.gold ? "0이상의 숫자를 입력해주세요." : ""}
        />

        <TextField
          {...register("realEstate")}
          label="부동산"
          variant="outlined"
          error={Boolean(errors.realEstate)}
          helperText={
            errors.realEstate
              ? "0이상의 숫자를 입력해주세요."
              : "보유한 부동산 금액을 입력해주세요."
          }
        />

        <Button variant="contained" type="submit" className={styles.submitBtn}>
          제출하기
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;
