import React from "react";
import { Container, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import RegisterFormProvider from "../RegisterFormProvider/RegisterFormProvider";

function RegisterPageProvider() {
  const history = useHistory();

  return (
    <Container maxWidth="xs">
      <RegisterFormProvider />

      <center>
        <Button
          type="button"
          color="secondary"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </Button>
      </center>
    </Container>
  );
}

export default RegisterPageProvider;
