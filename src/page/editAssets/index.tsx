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
  financialData: {
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
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: 12,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "inline-flex",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            height: 248,
            paddingTop: 4,
            paddingBottom: 4,
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: 4,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              justifyContent: "flex-start",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                height: 48,
                padding: 12,
                borderRadius: 4,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 8,
                display: "flex",
              }}
            >
              <div style={{ width: 20, height: 20, position: "relative" }}>
                <div
                  style={{
                    width: 11.67,
                    height: 1.67,
                    left: 4.17,
                    top: 9.17,
                    position: "absolute",
                    background: "rgba(255, 255, 255, 0.80)",
                  }}
                ></div>
              </div>
              <div
                style={{
                  flex: "1 1 0",
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Spoqa Han Sans Neo",
                  fontWeight: "400",
                  lineHeight: 20.01,
                  wordWrap: "break-word",
                }}
              >
                depth1
              </div>
            </div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              justifyContent: "flex-start",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                height: 48,
                padding: 12,
                borderRadius: 4,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 8,
                display: "flex",
              }}
            >
              <div style={{ width: 20, alignSelf: "stretch", padding: 12 }} />
              <div style={{ width: 20, height: 20, position: "relative" }}>
                <div
                  style={{
                    width: 11.67,
                    height: 1.67,
                    left: 4.17,
                    top: 9.17,
                    position: "absolute",
                    background: "rgba(255, 255, 255, 0.80)",
                  }}
                ></div>
              </div>
              <div
                style={{
                  flex: "1 1 0",
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Spoqa Han Sans Neo",
                  fontWeight: "400",
                  lineHeight: 20.01,
                  wordWrap: "break-word",
                }}
              >
                depth2
              </div>
            </div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              justifyContent: "flex-start",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                height: 48,
                padding: 12,
                borderRadius: 4,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 8,
                display: "flex",
              }}
            >
              <div style={{ width: 20, alignSelf: "stretch", padding: 12 }} />
              <div style={{ width: 20, alignSelf: "stretch", padding: 12 }} />
              <div style={{ width: 20, height: 20, position: "relative" }}>
                <div
                  style={{
                    width: 11.67,
                    height: 1.67,
                    left: 4.17,
                    top: 9.17,
                    position: "absolute",
                    background: "rgba(255, 255, 255, 0.80)",
                  }}
                ></div>
              </div>
              <div
                style={{
                  flex: "1 1 0",
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Spoqa Han Sans Neo",
                  fontWeight: "400",
                  lineHeight: 20.01,
                  wordWrap: "break-word",
                }}
              >
                depth3
              </div>
            </div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              justifyContent: "flex-start",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                height: 48,
                padding: 12,
                borderRadius: 4,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 8,
                display: "flex",
              }}
            >
              <div style={{ width: 20, alignSelf: "stretch", padding: 12 }} />
              <div style={{ width: 20, alignSelf: "stretch", padding: 12 }} />
              <div style={{ width: 20, alignSelf: "stretch", padding: 12 }} />
              <div style={{ width: 20, height: 20, position: "relative" }}>
                <div
                  style={{
                    width: 3.33,
                    height: 3.33,
                    left: 8.33,
                    top: 8.33,
                    position: "absolute",
                    background: "rgba(255, 255, 255, 0.80)",
                  }}
                ></div>
              </div>
              <div
                style={{
                  flex: "1 1 0",
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Spoqa Han Sans Neo",
                  fontWeight: "400",
                  lineHeight: 20.01,
                  wordWrap: "break-word",
                }}
              >
                depth4
              </div>
            </div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              background: "rgba(255, 255, 255, 0.04)",
              justifyContent: "flex-start",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                height: 48,
                padding: 12,
                borderRadius: 4,
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  height: 24,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 8,
                  display: "flex",
                }}
              >
                <div style={{ width: 20, height: 24, padding: 12 }} />
                <div style={{ width: 20, height: 20, position: "relative" }}>
                  <div
                    style={{
                      width: 11.67,
                      height: 11.67,
                      left: 4.17,
                      top: 4.17,
                      position: "absolute",
                      background: "rgba(255, 255, 255, 0.80)",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    flex: "1 1 0",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "Spoqa Han Sans Neo",
                    fontWeight: "500",
                    lineHeight: 20.01,
                    wordWrap: "break-word",
                  }}
                >
                  고양이 용품
                </div>
              </div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  padding: 1.67,
                  background: "rgba(255, 255, 255, 0.04)",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: 16.67,
                    height: 16.67,
                    position: "relative",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: 12.5,
                      height: 12.5,
                      background: "rgba(255, 255, 255, 0.80)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default EditAssets;
