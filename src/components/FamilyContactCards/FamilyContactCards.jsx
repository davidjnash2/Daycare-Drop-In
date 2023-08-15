import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  CardActionArea,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch, useSelector } from "react-redux";

function FamilyContactCards({ adult }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const deleteAdult = (adultId) => {
    console.log("Clicked delete", adultId);
    dispatch({
      type: "DELETE_ADULT",
      payload: { id: adultId, familyId: user.family_id },
    });
  };

  return (
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
        {/* {rAdult?.map((adult) => ( */}

        <Card
          sx={{
            width: "90%",
            objectFit: "contain",
            mb: 1.5,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
          }}
          raised
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h7" sx={{ mb: 2 }}>
              <b>
                {adult.first_name} {adult.last_name}{" "}
              </b>
              {" ("}
              {adult.relationship_to_child}
              {")"}
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
                  sx={{
                    objectFit: "contain",
                    height: 90,
                    borderRadius: 2,
                  }}
                  image={adult.photo_url}
                  alt={"profile picture"}
                />
              </Grid>
              <Grid sx={{ width: "60%" }}>
                <Typography>{adult.phone_number}</Typography>
                <Typography>{adult.email}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Button size="small" color="secondary" variant="outlined" onClick={() => deleteAdult(adult.id)} sx={{ m: 2 }}>
            Delete
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FamilyContactCards;
