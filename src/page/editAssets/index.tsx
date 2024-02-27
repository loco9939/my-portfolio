import { postAssets } from "@/apis";
import { getUserFinancial, getUserId } from "@/utils/getUser";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

function EditAssets() {
  const navigate = useNavigate();
  const userId = getUserId();
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
  });
  const { fields } = useFieldArray({ control, name: "financialData" });

  console.log("converted: ", converted);
  // const [data, setData] = useState<TableFinancialData["financialMonthly"]>([]);
  // const table = useReactTable({
  //   columns,
  //   data,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  const handleAssets = async (data: FormValues) => {
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    handleAssets(data);
  };

  const addAssets = () => {
    const newData: TableFinancialData = {
      date: "",
      cashWon: 0,
      debt: 0,
      realEstate: 0,
      saving: 0,
      stock: 0,
    };
    setData([...data, newData]);
  };

  // useEffect(
  //   () =>
  //     setData(
  //       Object.entries(financialData ?? {}).map(([key, value]) => ({
  //         ...value,
  //         date: key,
  //       }))
  //     ),
  //   []
  // );

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
        <Box mt={4}>
          {fields.map((field, index) => {
            console.log("===field", field);
            return (
              <div key={field.id}>
                <TextField
                  {...register(`financialData.${index}.date`)}
                  variant="outlined"
                  label="날짜"
                  // error={Boolean(errors[field.id as keyof IAssets])}
                />
                <TextField
                  {...register(`financialData.${index}.cashWon`)}
                  variant="outlined"
                  label="현금"
                  // error={Boolean(errors[field.id as keyof IAssets])}
                />
                <TextField
                  {...register(`financialData.${index}.saving`)}
                  variant="outlined"
                  label="저축"
                  // error={Boolean(errors[field.id as keyof IAssets])}
                />
                <TextField
                  {...register(`financialData.${index}.stock`)}
                  variant="outlined"
                  label="주식"
                  // error={Boolean(errors[field.id as keyof IAssets])}
                />
                <TextField
                  {...register(`financialData.${index}.debt`)}
                  variant="outlined"
                  label="부채"
                  // error={Boolean(errors[field.id as keyof IAssets])}
                />
                <TextField
                  {...register(`financialData.${index}.realEstate`)}
                  variant="outlined"
                  label="부동산"
                  // error={Boolean(errors[field.id as keyof IAssets])}
                />
              </div>
            );
          })}

          {/* TODO: 자산 추가하면 행 추가하기 */}
          <Button variant="outlined" startIcon="+" onClick={addAssets}>
            자산 추가하기
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
