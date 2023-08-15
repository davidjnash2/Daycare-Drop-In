import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import PublicProviderPhotoItem from "../PublicProviderPhotoItem/PublicProviderPhotoItem";
import "./PublicProviderPhotoGallery.css";
import { Card, CardContent, CardMedia, CardActionArea, IconButton, Typography, Button, Container, Grid, Box, CardHeader, CardActions, TextField, Dialog, DialogContent, DialogTitle } from '@mui/material';


function PublicProviderPhotoGallery() {
  const dispatch = useDispatch();
  const providerId = useParams();
  const provider_id = useSelector((store) => store.provider.id);
  const photoArray = useSelector((store) => store.photo);

  // console.log('in PublicProviderPhotoGallery, and providerId is:', providerId);
  // console.log('in PublicProviderPhotoGallery, and photos are:', photoArray);

  useEffect(() => {
      dispatch({
        type: "GET_PHOTOS",
        payload: providerId.id,
      });
  }, []);

  //LOADING STATE

  if (!provider_id) {
    return <div>Loading...</div>;
  }

  return (
    provider_id && (
      <>
        <Typography variant="h6" mt={3}>Check out our spaces</Typography>
        <Grid container columns={{ xs: 12 }} spacing={1}>
        <Grid item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: "center",
                        justifyContent: 'center',
                    }}
                >
          {photoArray.map((photo) => (
            <PublicProviderPhotoItem key={photo.id} photo={photo} />
          ))}

        </Grid>
        </Grid>
      </>
    )
  );
}

export default PublicProviderPhotoGallery;
