import React, { useEffect } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  CardHeader,
  CardActions,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormData from "form-data";

function addChildForm() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const now = new Date();

  const limitFuture = () => {
    now.setDate(now.getDate() - 42);
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
  };
  const sixWeeksAgo = limitFuture();

  const limitPast = () => {
    now.setFullYear(now.getFullYear() - 11);
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
  };
  const elevenYearsAgo = limitPast();

  const myKid = {
    family_id: user.family_id,
    first_name: "",
    last_name: "",
    birthdate: "2018-01-01",
    allergies: "",
    photo_url: "",
    potty_trained: false,
  };

  const [newChild, setNewChild] = useState(myKid);
  const [clicked, setClicked] = useState(false);

  const registerChild = (event) => {
    event.preventDefault();
    console.log("birthday", newChild.birthdate);
    console.log("this is new child", newChild);
    dispatch({ type: "POST_CHILD", payload: newChild });
    setClicked(!clicked);
    setNewChild(myKid);
    console.log("adding new child");
  };
  function fileSelected(event) {
    console.log("IN FILE SELECTED");
    const selectedFile = event.target.files[0];
    console.log("selectedFile", selectedFile);
    dispatch({
      type: "AWS_CHILD_PHOTO",
      payload: {
        file: selectedFile,
      },
    });
  }

  console.log("NEWCHILD", newChild);

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {!clicked ? (
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setClicked(!clicked)}
        >
          Add a child
        </Button>
      ) : (
        <Card
          elevation={8}
          sx={{
            mb: 2,
            bgcolor: "#F2F2F2",
            color: "#4b00a1",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mb: -2,
              }}
            >
              <Typography mt={2}>New Child</Typography>
              <IconButton size="large" onClick={() => setClicked(!clicked)}>
                <CloseOutlinedIcon />
              </IconButton>
            </CardContent>

            <Box
              component="form"
              onSubmit={registerChild}
              autoComplete="off"
              encType="multipart/form-data"
            >
              <TextField
                placeholder="First Name"
                required
                name="first_name"
                sx={{ bgcolor: "white" }}
                type="text"
                margin="normal"
                fullWidth
                label="First Name"
                value={newChild.first_name}
                onChange={(event) =>
                  setNewChild({
                    ...newChild,
                    first_name: event.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                placeholder="Last Name"
                required
                name="last name"
                sx={{ bgcolor: "white" }}
                type="text"
                margin="normal"
                fullWidth
                label="Last Name"
                value={newChild.last_name}
                onChange={(event) =>
                  setNewChild({
                    ...newChild,
                    last_name: event.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                // placeholder="YYYY/MM/DD"
                required
                name="birthdate"
                sx={{ bgcolor: "white" }}
                type="date"
                margin="normal"
                fullWidth
                label="Birthday"
                defaultValue={newChild.birthdate}
                onChange={(event) =>
                  setNewChild({
                    ...newChild,
                    birthdate: event.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: elevenYearsAgo, max: sixWeeksAgo }}
              />

              <TextField
                placeholder="Allergies"
                required
                name="allergies"
                sx={{ bgcolor: "white" }}
                type="text"
                margin="normal"
                fullWidth
                label="Allergies"
                value={newChild.allergies}
                onChange={(event) =>
                  setNewChild({
                    ...newChild,
                    allergies: event.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />

              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <FormControl>
                  <FormGroup>
                    <FormControlLabel
                      label="Potty Trained?"
                      labelPlacement="end"
                      control={
                        <Checkbox
                          // checked={newChild.potty_trained}
                          onClick={() =>
                            setNewChild({
                              ...newChild,
                              potty_trained: true,
                            })
                          }
                        />
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Container>
              <TextField
                fullWidth
                required
                name="photo_url"
                sx={{ bgcolor: "white" }}
                type="file"
                margin="normal"
                label="Picture"
                onChange={fileSelected}
                InputLabelProps={{ shrink: true }}
              />

              <Button
                type="submit"
                sx={{ m: 2 }}
                variant="outlined"
                size="small"
                color="secondary"
              >
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default addChildForm;
