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
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormData from "form-data";

function FamilyChildCards({ kid }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const updatedMyKid = {
    childId: kid.id || "",
    first_name: kid.first_name || "",
    last_name: kid.last_name || "",
    allergies: kid.allergies || "",
    potty_trained: kid.potty_trained,
    family_id: kid.family_id,
  };

  const [updatedChild, setUpdatedChild] = useState(updatedMyKid);

  const [edit, setEdit] = useState(false);

  const editChild = (event) => {
    event.preventDefault();
    console.log(updatedChild);
    dispatch({ type: "UPDATE_CHILD", payload: updatedChild });
    setEdit(!edit);

    setUpdatedChild(updatedMyKid);
    console.log("updated child is", updatedChild);
  };

  const makeUpdatedChild = (kid) => {
    console.log("MAKE UPDATED CHILD", kid);
    setUpdatedChild({ ...updatedChild, childId: kid.id });
    setUpdatedChild({ ...updatedChild, first_name: kid.first_name });
    setUpdatedChild({ ...updatedChild, last_name: kid.last_name });
    setUpdatedChild({ ...updatedChild, allergies: kid.allergies });
    setUpdatedChild({ ...updatedChild, potty_trained: kid.potty_trained });
    setUpdatedChild({ ...updatedChild, family_id: kid.family_id });
  };

  const deleteKid = (childId) => {
    console.log("Clicked delete", childId);
    dispatch({
      type: "DELETE_CHILD",
      payload: { id: childId, familyId: user.family_id },
    });
  };

  // console.log('NEW CHILD OBJECT', newChild);
  console.log("updated CHILD", updatedChild);

  const calculateAge = (birthdate) => {
    // Convert birthdate string to a Date object
    const birthdateObj = new Date(birthdate);

    // Calculate the difference between current date and birthdate
    const currentDate = new Date();
    const exactAge = currentDate - birthdateObj;

    // Calculate years and months
    const ageInYears = Math.floor(exactAge / (365 * 24 * 60 * 60 * 1000));
    const ageInMonths = Math.floor(
      (exactAge % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)
    );

    // Format the result as a string
    // const childAge =   `${ageInYears} yrs\n ${ageInMonths} mos`
    const childAge =
      ageInYears > 0
        ? `${ageInYears} yr \n${ageInMonths} mo`
        : `${ageInMonths} mo`;

    return childAge;
  };

  // console.log('NEW CHILD OBJECT', newChild);
  console.log('updated CHILD', updatedChild);


  const setAllergy = (event) => {
    event.preventDefault();
    const presetAllergy = "strawberries";

    // Populate the form inputs with the pre-set values
    setUpdatedChild({
      ...updatedChild,
      allergies: presetAllergy,
    });
  }
  return (
    <Container
      maxWidth={"sm"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}

    >
      {/* <Typography variant="h7" sx={{ mb: 1 }}>
                All My Children
            </Typography> */}
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {!edit ? (
                    
                    ) : */}

          <Card
            sx={{
              width: "100%",
              m: 1,
              borderRadius: 2,
            }}
            raised
            key={kid.id}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h7">
                <b>
                  {kid.first_name} {kid.last_name}
                </b>
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid sx={{ width: "30%" }}>
                  <CardMedia
                    component="img"
                    sx={{ objectFit: "contain", height: 90, borderRadius: 2 }}
                    image={kid.photo_url}
                    alt={"profile picture"}
                  />
                </Grid>
                <Grid sx={{ width: "60%" }}>
                  <Typography>
                    <b>Age: </b>
                    {calculateAge(kid.birthdate)}
                  </Typography>
                  <Typography
                  onClick={setAllergy}>
                    <b>Allergies: </b> {kid.allergies}
                  </Typography>
                  <Typography>
                    <b>Potty trained: </b>
                    {kid.potty_trained ? " yes" : " no"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>

            {/* <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ m: 2 }}
              onClick={() => deleteKid(kid.id)}
            >
              Delete
            </Button> */}

            {!edit ? (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                sx={{ m: 2 }}
                onClick={() => {
                  makeUpdatedChild(kid), setEdit(!edit);
                }}
              >
                Edit
              </Button>
            ) : (
              <Box component="form" onSubmit={editChild} autoComplete="off">
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ m: 2 }}
                  color="secondary"
                  onClick={() => setEdit(!edit)}
                >
                  Cancel
                </Button>
                <br />
                <TextField
                  placeholder="First Name"
                  name="first_name"
                  sx={{ bgcolor: "white", m: 2 }}
                  type="text"
                  label="First Name"
                  value={updatedChild.first_name}
                  onChange={(event) =>
                    setUpdatedChild({
                      ...updatedChild,
                      first_name: event.target.value,
                    })
                  }
                />
                <TextField
                  placeholder="Last Name"
                  name="last name"
                  sx={{ bgcolor: "white", m: 2 }}
                  type="text"
                  label="last name"
                  value={updatedChild.last_name}
                  onChange={(event) =>
                    setUpdatedChild({
                      ...updatedChild,
                      last_name: event.target.value,
                    })
                  }
                />
                <div onClick={setAllergy}></div>
                {/* <TextField
                                placeholder="YYYY/MM/DD"
                                required
                                name="birthdate"
                                sx={{ bgcolor: "white" }}
                                type="date"
                                margin="normal"
                                fullWidth
                                label=""
                                value={kid.birthdate}
                                onChange={(event) =>
                                    setUpdatedChild({
                                        ...updatedChild,
                                        birthdate: event.target.value,
                                    })
                                }
                            /> */}
                <TextField
                  placeholder="allergies"
                  name="allergies"
                  sx={{ bgcolor: "white", m: 2 }}
                  type="text"
                  label="allergies"
                  value={updatedChild.allergies}
                  onChange={(event) =>
                    setUpdatedChild({
                      ...updatedChild,
                      allergies: event.target.value,
                    })
                  }
                />
                <FormControl>
                  <FormGroup>
                    <FormControlLabel
                      label="Potty Trained"
                      labelPlacement="end"
                      sx={{ m: 1 }}
                      control={
                        <Checkbox
                          checked={updatedChild.potty_trained}
                          onClick={() =>
                            setUpdatedChild({
                              ...updatedChild,
                              potty_trained: true,
                            })
                          }
                        />
                      }
                    />
                  </FormGroup>
                </FormControl>
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
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
    // <div className="container">
    //     <h2>Child Card</h2>
    //     <p>This component will be mapped over to create child cards
    //         for each child within the family</p>
    //     <p>Included info: name, age, potty training status, allergies, misc info.</p>
    //     <p>The page owner should also be able to edit each card. </p>
    // </div>
  );
}

export default FamilyChildCards;
