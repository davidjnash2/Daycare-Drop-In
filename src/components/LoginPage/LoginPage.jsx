import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { Container, Button } from "@mui/material";

function LoginPage() {
  const history = useHistory();

  return (
    <Container maxWidth="xs">
      <LoginForm />

      <center>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </Button>
      </center>
    </Container>
  );
}

export default LoginPage;
