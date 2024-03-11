import { postSignUp } from "@/apis";
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
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./index.css";

interface SignUpSchema {
  email: string;
  password: string;
  "password-confirm": string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "패스워드는 최소 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "숫자와 특수문자를 포함해야 합니다."
    )
    .required(),
  "password-confirm": yup
    .string()
    .oneOf([yup.ref("password")])
    .required(),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  const handleToggleShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const onSubmit = (data: SignUpSchema) => {
    console.log(data);
    handleSignUp(data);
  };

  const handleSignUp = async (data: SignUpSchema) => {
    const { email, password } = data;

    try {
      await postSignUp({ email, password });
      alert("회원가입에 성공했습니다!");
      navigate("/signin");
    } catch (error) {
      console.error("Error signup in: ", error);
    }
  };

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
          {...register("email")}
          className="input-email"
          label="email"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={
            Boolean(errors.email) && "이메일 형식이 올바르지 않습니다."
          }
        />
        <TextField
          {...register("password")}
          className="input-pw"
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          error={Boolean(errors.password)}
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
          {...register("password-confirm")}
          className="input-pw"
          type={showPasswordConfirm ? "text" : "password"}
          label="Password Confirm"
          variant="outlined"
          error={Boolean(errors["password-confirm"])}
          helperText={
            errors["password-confirm"]
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
