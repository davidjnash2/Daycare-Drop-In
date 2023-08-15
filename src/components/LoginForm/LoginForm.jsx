import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, TextField, Box, Typography, Container } from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  // const signIn = (event) => {
  //   event.preventDefault();
    // const presetUserName = "anna@gmail.com";
    // const presetPassword = "family1";
    // Populate the form inputs with the pre-set value
  //   setUsername(presetUserName);
  //   setPassword(presetPassword);
  // };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Typography component="h1" variant="h5" >
        Login
      </Typography> */}
        <Box
          component="form"
          onSubmit={login}
          sx={{ mt: 1 }}
          autoComplete="off"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            value={username}
            label="Email"
            name="username"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          {/* <div
            id="preset-username-login-info"
            onClick={signIn}
          ></div> */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            label="Password"
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            InputLabelProps={{ shrink: true }}
            // onClick={signIn}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, p: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;
