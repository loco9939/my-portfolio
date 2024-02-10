import { postAssets } from "@/apis";
import { getUserId } from "@/utils/getUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { IAssets } from "../registerAssets";
import styles from "./editAssets.module.css";

const schema = yup.object({
  cashWon: yup.number().min(0).required(),
  saving: yup.number().min(0).required(),
  stock: yup.number().min(0).required(),
  realEstate: yup.number().min(0).required(),
  debt: yup.number().min(0).required(),
});

function EditAssets() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const userId = getUserId();

  const handleAssets = async (data: IAssets) => {
    const params = { userId: userId ?? "", ...data };
    try {
      await postAssets(params);
      window.localStorage.setItem("user", JSON.stringify({ userId, ...data }));
      alert("자산이 저장되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error in Saving Finacial Data: ", error);
    }
  };

  const onSubmit = (data: IAssets) => {
    handleAssets(data);
  };

  return (
    <Box component={"section"} className={styles.wrapper}>
      <Typography className={styles.title} variant="h2">
        나의 자산 수정하기
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
          {...register("saving")}
          label="저축"
          variant="outlined"
          error={Boolean(errors.saving)}
          helperText={
            errors.saving
              ? "0이상의 숫자를 입력해주세요."
              : "예·적금을 입력해주세요."
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
              : "국내 및 해외주식(ETF포함)을 입력해주세요."
          }
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

        <TextField
          {...register("debt")}
          label="부채"
          variant="outlined"
          error={Boolean(errors.debt)}
          helperText={
            errors.debt
              ? "0이상의 숫자를 입력해주세요."
              : "부채 금액을 입력해주세요."
          }
        />

        <Button variant="contained" type="submit" className={styles.submitBtn}>
          제출하기
        </Button>
      </Box>
    </Box>
  );
}

export default EditAssets;
