import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./index.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "@/routes/root.hooks";

interface Schema {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  const handleSignIn = async (data: Schema) => {
    const { email, password } = data;

    try {
      await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });
      window.localStorage.setItem("user", JSON.stringify({ email }));
      // TODO: 로그인 성공 시 <Dashboard /> 컴포넌트 렌더링 되지만, URL은 signin으로 유지되는 문제
      alert("로그인에 성공했습니다!");
      navigate("/dashboard");
    } catch (error) {
      const { response } = error as unknown as AxiosError;

      if (response?.status === 401) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    }
  };

  const onSubmit = (data: Schema) => {
    handleSignIn(data);
  };

  const isLoggedIn = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Box component={"section"} className="login-container">
      <Typography className="login-title" variant="h2">
        로그인
      </Typography>

      <Box
        component={"form"}
        className="login-form"
        onSubmit={handleSubmit(onSubmit, (data) =>
          console.log("on Submit Error: ", data)
        )}
      >
        <TextField
          {...register("email")}
          className="input-email"
          label="Email"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={Boolean(errors.email) && "이메일을 입력해주세요."}
        />
        <TextField
          {...register("password")}
          type={showPassword ? "text" : "password"}
          className="input-pw"
          label="Password"
          variant="outlined"
          error={Boolean(errors.password)}
          helperText={
            Boolean(errors.password) &&
            "비밀번호를 입력해주세요. 최소 8자리 이상"
          }
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
        <Button className="login-btn" variant="contained" type="submit">
          로그인
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

export default Login;
