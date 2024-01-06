import { Box, Link, Typography } from "@mui/material";
import { ErrorResponse, useRouteError } from "react-router-dom";
import "./index.css";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <Box id="error-page" className="error-container">
      <Typography variant="h1">Oops!</Typography>
      <Typography>Sorry, an unexpected error has occurred.</Typography>
      <Typography>
        {error.status} {error.statusText}
      </Typography>
      <Link href="/">메인으로</Link>
    </Box>
  );
}
