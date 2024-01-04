import emotionStyled from "@emotion/styled";
import { Button, ButtonBase, Link, TextField, Typography } from "@mui/material";

function Login() {
  return (
    <Section>
      <Typography style={{ marginBottom: "12px" }} variant="h2">
        Login
      </Typography>

      <Form>
        <TextField
          style={{ marginBlock: "12px" }}
          id="Email"
          label="Email"
          variant="outlined"
        />
        <TextField
          style={{ marginBlock: "12px" }}
          id="Password"
          label="Password"
          variant="outlined"
        />
        <Button style={{ marginBlock: "12px" }} variant="contained">
          Login
        </Button>
        <Link href="#">Sign Up</Link>
      </Form>
    </Section>
  );
}

export default Login;

const Section = emotionStyled.section`
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #1976D2;
  border-radius: 8px;
  padding: 48px 24px;
  text-align: center;
`;

const Form = emotionStyled.form`
   display: flex;
   flex-direction: column;
   margin: 0 auto;
`;
