import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography, Container } from "@mui/material";

function RegisterFormJoinFamily() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [access_code, setAccessCode] = useState("");
  const [relationship, setRelationship] = useState("");

  const errors = useSelector((store) => store.errors);
  const code = useSelector((store) => store.accessCodeReducer);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER_JOIN_FAMILY",
      payload: {
        username: username,
        password: password,
        family_id: code.family_id,
        relationship: relationship,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      },
    });
  }; // end registerUser

  const validateAccessCode = (event) => {
    event.preventDefault();
    dispatch({
      type: "SUBMIT_CODE",
      payload: {
        access_code: access_code,
      },
    });
  };
  function fileSelected(event) {
    console.log("IN FILE SELECTED");
    const selectedFile = event.target.files[0];
    console.log("selectedFile", selectedFile);
    dispatch({
      type: "AWS_REG_PHOTO",
      payload: {
        file: selectedFile,
      },
    });
  }


  const fillAccessCode = (event) => {
    event.preventDefault();
    const presetAccessCode = "baby shark";

    // Populate the form inputs with the pre-set value
    setAccessCode(presetAccessCode);
  }

  const fillPresetUser = (event) => {
    event.preventDefault();
    const presetUsername = "ismail@gmail.com";
    const presetPassword = "family1";
    const presetFirstName = "Ismail";
    const presetLastName = "Ali";
    const presetPhoneNumber = "612-555-4321";
    const presetRelationship = "Parent";

    // Populate the form inputs with the pre-set values
    setUsername(presetUsername);
    setPassword(presetPassword);
    setFirstName(presetFirstName);
    setLastName(presetLastName);
    setPhoneNumber(presetPhoneNumber);
    setRelationship(presetRelationship);
  }

  console.log("this is code", code);
  return (
    <>
      {code.hide ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography 
          component="h1" 
          variant="h5"
          onClick={fillAccessCode}
          >
            Enter your family's access code
          </Typography>
          <Box
            component="form"
            onSubmit={validateAccessCode}
            sx={{ mt: 1 }}
            autoComplete="off"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="access_code"
              value={access_code}
              label="Access Code"
              name="access_code"
              autoFocus
              onChange={(event) => setAccessCode(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 8, p: 2 }}
            >
              Validate
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography 
          component="h1" 
          variant="h5"
          onClick={fillPresetUser}>
            Register your account
          </Typography>
          <Box
            component="form"
            onSubmit={registerUser}
            sx={{ mt: 1 }}
            autoComplete="off"
            encType="multipart/form-data"
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="first_name"
              value={firstName}
              label="First Name"
              type="text"
              id="first_name"
              onChange={(event) => setFirstName(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="last_name"
              value={lastName}
              label="Last Name"
              type="text"
              id="last_name"
              onChange={(event) => setLastName(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="phone_number"
              value={phoneNumber}
              label="Primary Contact Number"
              type="text"
              id="phone_number"
              onChange={(event) => setPhoneNumber(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="relationship"
              value={relationship}
              label="Relationship to children"
              type="text"
              id="relationship"
              onChange={(event) => setRelationship(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="photo_url"
              label="Profile Picture"
              type="file"
              id="photo"
              onChange={fileSelected}
              InputLabelProps={{ shrink: true }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 6, p: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default RegisterFormJoinFamily;
