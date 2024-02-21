import { postAssets } from "@/apis";
import { getUserFinancial, getUserId } from "@/utils/getUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { IAssets } from "../registerAssets";
import styles from "./editAssets.module.css";

interface TableFinancialData {
  date: string;
  cashWon: number;
  debt: number;
  realEstate: number;
  saving: number;
  stock: number;
}

const schema = yup.object({
  cashWon: yup.number().min(0).required(),
  saving: yup.number().min(0).required(),
  stock: yup.number().min(0).required(),
  realEstate: yup.number().min(0).required(),
  debt: yup.number().min(0).required(),
});

const columnHelper = createColumnHelper<TableFinancialData>();

const columns = [
  columnHelper.accessor("date", { cell: (info) => info.getValue() }),
  columnHelper.accessor("cashWon", { cell: (info) => info.getValue() }),
  columnHelper.accessor("debt", { cell: (info) => info.getValue() }),
  columnHelper.accessor("realEstate", { cell: (info) => info.getValue() }),
  columnHelper.accessor("saving", { cell: (info) => info.getValue() }),
  columnHelper.accessor("stock", { cell: (info) => info.getValue() }),
];

function EditAssets() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const userId = getUserId();
  const financialData = getUserFinancial();
  const [data, setData] = useState<TableFinancialData[]>(
    Object.entries(financialData ?? {}).map(([key, value]) => ({
      ...value,
      date: key,
    }))
  );
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

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
    console.log(data);
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
        <Box mt={4}>
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    console.log("===cell", cell.getValue());
                    return (
                      <td key={cell.id}>
                        {/* {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )} */}
                        <TextField
                          {...register(`${cell.column.id as keyof IAssets}`)} // Use register with the column ID
                          variant="outlined"
                          defaultValue={cell.getValue()}
                          error={Boolean(
                            errors[cell.column.id as keyof IAssets]
                          )}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        {/* <Stack direction={"row"} justifyContent={"space-between"} gap={8}>
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
        </Stack> */}

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
