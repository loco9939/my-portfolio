import { updateAssets } from "@/apis";
import { getUserFinancial, getUserId } from "@/utils/getUser";
import { yupResolver } from "@hookform/resolvers/yup";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import styles from "./editAssets.module.css";

interface FormValues {
  financialData?: {
    date: string;
    cashWon: number;
    debt: number;
    realEstate: number;
    saving: number;
    stock: number;
  }[];
}

const schema = yup.object().shape({
  financialData: yup.array().of(
    yup.object().shape({
      date: yup
        .string()
        .required("날짜를 입력하세요.")
        .matches(/^\d{6}$/, "날짜 형식은 YYYYMM으로 입력하세요."),
      cashWon: yup
        .number()
        .required("현금을 입력하세요.")
        .min(0, "0 이상의 값을 입력하세요."),
      saving: yup
        .number()
        .required("저축을 입력하세요.")
        .min(0, "0 이상의 값을 입력하세요."),
      stock: yup
        .number()
        .required("주식을 입력하세요.")
        .min(0, "0 이상의 값을 입력하세요."),
      debt: yup
        .number()
        .required("부채를 입력하세요.")
        .min(0, "0 이상의 값을 입력하세요."),
      realEstate: yup
        .number()
        .required("부동산을 입력하세요.")
        .min(0, "0 이상의 값을 입력하세요."),
    })
  ),
});

function EditAssets() {
  const navigate = useNavigate();
  const email = getUserId();
  const financialData = getUserFinancial();
  const converted = Object.entries(financialData ?? {}).map(([key, value]) => {
    return { date: key, ...value };
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      financialData: converted,
    },
    resolver: yupResolver(schema), // yup 스키마를 resolver에 추가
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "financialData",
  });

  const handleAssets = async (data: FormValues) => {
    const monthlyAssets = Object.values(data)
      .flat()
      .reduce((acc, cur) => {
        const { date, ...rest } = cur;
        return { ...acc, [date]: { ...rest } };
      }, {});

    const params = {
      email: email ?? "",
      lastUpdate: dayjs().format("YYYY-MM"),
      monthlyAssets,
    };
    try {
      await updateAssets(params);
      // TODO: 로컬스토리지에서는 userId가 email로 저장되는데, 어딘가 userId로 사용되는 부분이 꼬이는 문제가 있다.
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          email: email ?? "",
          lastUpdate: dayjs().format("YYYY-MM"),
          monthlyAssets,
        })
      );
      alert("자산이 수정되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error in Saving Finacial Data: ", error);
    }
  };

  const onSubmit = (data: FormValues) => {
    handleAssets(data);
  };

  const addAsset = () => {
    const newData = {
      date: "",
      cashWon: 0,
      debt: 0,
      realEstate: 0,
      saving: 0,
      stock: 0,
    };
    append(newData);
  };

  const deleteAsset = (index: number) => {
    remove(index);
  };

  return (
    <Box component={"section"} className={styles.wrapper}>
      <Typography className={styles.title} variant="h2">
        월별 자산 수정하기
      </Typography>

      <Box
        component={"form"}
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, (data) =>
          console.log("on Submit Error: ", data)
        )}
      >
        <Box mt={4}>
          {fields.map((field, index) => (
            <Box key={field.id} className={styles.rowWrapper}>
              <Box className={styles.row}>
                <TextField
                  {...register(`financialData.${index}.date`)}
                  variant="outlined"
                  label="날짜"
                  helperText="YYYYMM 형식으로 입력해주세요."
                  error={Boolean(errors.financialData?.[index]?.date)}
                />
                <TextField
                  {...register(`financialData.${index}.cashWon`)}
                  variant="outlined"
                  label="현금"
                  error={Boolean(errors.financialData?.[index]?.cashWon)}
                />
                <TextField
                  {...register(`financialData.${index}.saving`)}
                  variant="outlined"
                  label="저축"
                  error={Boolean(errors.financialData?.[index]?.saving)}
                />
                <TextField
                  {...register(`financialData.${index}.stock`)}
                  variant="outlined"
                  label="주식"
                  error={Boolean(errors.financialData?.[index]?.stock)}
                />
                <TextField
                  {...register(`financialData.${index}.debt`)}
                  variant="outlined"
                  label="부채"
                  error={Boolean(errors.financialData?.[index]?.debt)}
                />
                <TextField
                  {...register(`financialData.${index}.realEstate`)}
                  variant="outlined"
                  label="부동산"
                  error={Boolean(errors.financialData?.[index]?.realEstate)}
                />
              </Box>
              {index !== 0 && (
                <Button
                  color="error"
                  onClick={() => deleteAsset(index)}
                  className={styles.removeBtn}
                >
                  <RemoveCircleIcon />
                </Button>
              )}
            </Box>
          ))}

          <Button
            variant="outlined"
            startIcon="+"
            onClick={addAsset}
            className={styles.addBtn}
          >
            추가하기
          </Button>
        </Box>

        <Stack direction={"row"} justifyContent={"center"} gap={4}>
          <Button variant="contained" type="submit">
            제출하기
          </Button>
          <Button
            variant="contained"
            type="button"
            color="error"
            onClick={() => navigate("/")}
          >
            취소
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default EditAssets;
