import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

function RegistrationLanding() {
  const history = useHistory();

  return (
    <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/registration_newprovider"
        sx={{ p: 3, my: 1.5, fontWeight: "bolder" }}
      >
        Register as a New Provider
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/registration_newfamily"
        sx={{ p: 3, my: 1.5, fontWeight: "bolder" }}
      >
        Register a New Family
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/registration_joinfamily"
        sx={{ p: 3, my: 1.5, fontWeight: "bolder" }}
      >
        Join an existing family
      </Button>
    </Container>
  );
}

export default RegistrationLanding;
