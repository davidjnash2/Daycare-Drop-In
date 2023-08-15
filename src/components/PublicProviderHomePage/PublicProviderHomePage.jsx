import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import {
	Button,
	TextField,
	Grid,
	Box,
	Container,
	TableContainer,
	TableBody,
	Table,
	TableRow,
	TableCell,
	TableHead,
	Paper,
	Typography,
	Divider
} from "@mui/material";

//COMPONENT IMPORTS
import PublicProviderPhotoGallery from "../PublicProviderPhotoGallery/PublicProviderPhotoGallery";
import PublicProviderAvailabilityTable from "../PublicProviderAvailabilityTable/PublicProviderAvailabilityTable";

function PublicProviderHomePage() {
  const dispatch = useDispatch();
  const providerId = useParams();

  useEffect(() => {
    //dispatches request for provider info based on ID in url
    console.log("Dispatching request for data of provider ID:", providerId.id);
    dispatch({ type: "GET_PROVIDER", payload: providerId.id});
    dispatch({ type: "GET_PROVIDER_AVAILABILITY", payload: providerId.id });
  }, []);

  const provider = useSelector((store) => store.provider);
  const availabilityArray = useSelector((store) => store.availability);
  const user = useSelector((store) => store.user);

  console.log("THESE ARE THE PROVIDER DETAILS:", provider);

  // const goToBooking = () => {
  //   return <ProviderBookingProcess />;
  // };



  return (
		<Container maxWidth="xs">
			<div className="provider-header">
				<div className="provider-business-name">
					<Typography mb variant="h5">
						{provider.business_name}
					</Typography>
				</div>
				<div className="provider-name"></div>
			</div>

			<div className="provider-profile-photo">
				<Box
					component="img"
					sx={{
						height: 200,
						boxShadow: "4",
						borderRadius: 2,
					}}
					alt="Profile Picture"
					src={provider.provider_pic}
				/>
			</div>

			<div className="provider-contact-info">
				<Typography sx={{ mt: 2 }}>
					{`Provider Name: ${provider.first_name} ${provider.last_name}`}
				</Typography>
				<Typography sx={{ mt: 2 }}>
					{`License #: ${provider.license}`}
				</Typography>
				<Typography sx={{ mt: 2 }}>
					{provider.unit
						? `Address: ${provider.street_address} ${provider.unit}, ${provider.city}, ${provider.state}
					${provider.zip}`
						: `Address: ${provider.street_address}, ${provider.city}, ${provider.state}
					${provider.zip} `}
				</Typography>
				<Typography sx={{ mt: 2 }}>
					{`Email: ${provider.email}`}
				</Typography>

				{/* <p>
					<b>Provider Name:</b> {provider.first_name}{" "}
					{provider.last_name}
				</p> */}
				{/* <p>
					<b>License:</b> {provider.license}{" "}
				</p>
				<p>
					<b>Address:</b> {provider.street_address} {provider.unit}{" "}
					{provider.city} {provider.state}
					{provider.zip}
				</p> */}
				{/* <p>
					<b>Email:</b> {provider.email}
				</p> */}
			</div>
			<Divider sx={{ mt: 2, mb:1 }} variant="middle" />

			<Grid
				container
				spacing={0}
				sx={{ display: "flex", flexDirection: "row" }}
			>
				<Grid item xs={12}>
					<Typography mt={1} variant="h5">
						Provider Bio:
					</Typography>
				</Grid>
				<Grid ite xs={12} sx={{ mt: 1 }}>
					<Typography variant="body">
						{provider.personal_description}
					</Typography>
				</Grid>
				{/* <h2>About Me:</h2>
				<p>{provider.personal_description}</p> */}
			</Grid>

			<div className="daycare-details">
				<Grid
					container
					spacing={0}
					sx={{ display: "flex", flexDirection: "row" }}
				>
					<Grid item xs={12} sx={{ mt: 3 }}>
						<Typography variant="h5">
							{`About ${provider.business_name}:`}
						</Typography>
					</Grid>

					<Grid ite xs={12} sx={{ my: 1 }}>
						<Typography variant="body">
							{`Hours: ${provider.hours_start} - ${provider.hours_end}`}
						</Typography>
					</Grid>
					<Grid ite xs={12} sx={{ my: 1 }}>
						<Typography variant="body">
							{provider.meals
								? `Meals provided? Yes`
								: `Meals provided? No`}
						</Typography>
					</Grid>
					<Grid ite xs={12} sx={{ my: 1 }}>
						<Typography sx={{ my: 5 }} variant="body">
							{provider.business_description}
						</Typography>
					</Grid>
					{/* <h2>About Me:</h2>
				<p>{provider.personal_description}</p> */}
				</Grid>

				{/* <h2>About {provider.business_name}:</h2> */}

				{/* <p>
					<b>Hours:</b> {provider.hours_start}
					{provider.hours_end}
				</p>
				<p>
					<b>Meals provided? </b>
					{provider.meals ? "Yes" : "No"}{" "}
				</p>
				<Typography variant="body">
					{provider.business_description}
				</Typography> */}
				{/* <p>{provider.business_description}</p> */}
			</div>

			{/* <div className="booking-button">
        <button onClick={goToBooking}>Book a spot!</button>
      </div> */}
			<Divider sx={{ my: 1 }} variant="middle" />
			<Typography variant="h6" sx={{ my: 1 }}>
				{`Book with ${provider.first_name}`}
			</Typography>



			<PublicProviderAvailabilityTable />

			<Divider sx={{ mt: 4 }} variant="middle" />

			<PublicProviderPhotoGallery />

			{/* <LogOutButton className="btn" /> */}
		</Container>
  );
}


export default PublicProviderHomePage;
