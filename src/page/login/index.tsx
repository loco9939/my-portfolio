import { postSignIn } from "@/apis";
import { UserContext } from "@/context/user";
import { useLogin } from "@/routes/root.hooks";
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
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./index.css";

interface LoginSchema {
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
  const { setUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  const handleSignIn = async (data: LoginSchema) => {
    const { email, password } = data;

    try {
      const { data } = await postSignIn({ email, password });

      setUser({ email, ...data });
      window.localStorage.setItem("user", JSON.stringify({ email, ...data }));

      alert("로그인에 성공했습니다!");

      if (data.financialData) {
        return navigate("/");
      }
      navigate("/register-assets");
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      if (response?.status === 401) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    }
  };

  const onSubmit = (data: LoginSchema) => {
    handleSignIn(data);
  };

  const isLoggedIn = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
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
