import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./index.css";

interface Schema {
  Email: string;
  Password: string;
  "Password-confirm": string;
}

const schema = yup.object({
  Email: yup.string().email().required(),
  Password: yup.string().required().min(8),
  "Password-confirm": yup
    .string()
    .oneOf([yup.ref("Password")])
    .required(),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  const handleToggleShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const onSubmit = (data: Schema) => console.log(data);

  return (
    <Box component={"section"} className="login-container">
      <Typography className="login-title" variant="h2">
        회원가입
      </Typography>

      <Box
        component={"form"}
        className="login-form"
        onSubmit={handleSubmit(onSubmit, (data) =>
          console.log("Error: ", data)
        )}
      >
        <TextField
          {...register("Email")}
          className="input-email"
          label="Email"
          variant="outlined"
          error={Boolean(errors.Email)}
          helperText={
            Boolean(errors.Email) && "이메일 형식이 올바르지 않습니다."
          }
        />
        <TextField
          {...register("Password")}
          className="input-pw"
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          error={Boolean(errors.Password)}
          helperText={"8자 이상 문자, 숫자, 특수문자를 포함해주세요."}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleToggleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          {...register("Password-confirm")}
          className="input-pw"
          type={showPasswordConfirm ? "text" : "password"}
          label="Password Confirm"
          variant="outlined"
          error={Boolean(errors["Password-confirm"])}
          helperText={
            errors["Password-confirm"]
              ? "패스워드가 일치하는지 확인해주세요."
              : "패스워드를 한번 더 입력해주세요."
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleToggleShowPasswordConfirm}
                >
                  {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button className="login-btn" variant="contained" type="submit">
          가입하기
        </Button>
        <Box>
          <Link marginRight={2} href="signup">
            회원가입
          </Link>
          <Link href="signin">로그인</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
