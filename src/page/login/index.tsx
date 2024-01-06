import { Box, Button, Link, TextField, Typography } from "@mui/material";
import "./index.css";

function Login() {
  return (
    <Box component={"section"} className="login-container">
      <Typography className="login-title" variant="h2">
        로그인
      </Typography>

      <Box component={"form"} className="login-form">
        <TextField
          className="input-email"
          id="Email"
          label="Email"
          variant="outlined"
        />
        <TextField
          className="input-pw"
          id="Password"
          label="Password"
          variant="outlined"
        />
        <Button className="login-btn" variant="contained">
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
