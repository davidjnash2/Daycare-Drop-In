import React from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";

import { useHistory } from "react-router-dom";
import RegisterFormJoinFamily from "../RegisterFormJoinFamily/RegisterFormJoinFamily";

function RegisterPageJoinFamily() {
  const history = useHistory();

  return (
    <Container maxWidth="xs">
      <RegisterFormJoinFamily />

      <center>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
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

export default RegisterPageJoinFamily;
