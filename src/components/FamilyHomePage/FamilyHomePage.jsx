import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { Container, Typography, Box, Grid, Divider } from "@mui/material";

//Component Imports
import LogOutButton from "../LogOutButton/LogOutButton";
import FamilyContactCards from "../FamilyContactCards/FamilyContactCards";
import FamilyChildCards from "../FamilyChildCards/FamilyChildCards";
import FamilyDropOffs from "../FamilyDropOffs/FamilyDropOffs";
import AddChildForm from "../AddChildForm/AddChildForm";
import AddAdultForm from "../AddAdultForm/AddAdultForm";


function FamilyHomePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const rAdult = useSelector((store) => store.responsibleAdults)
  const children = useSelector((store => store.children))
//   const families = useSelector((store) => store.families)


  useEffect(() => {
    //dispatches request for family info based on userID
    console.log("Dispatching request for data of family-user ID:", user.id);
    dispatch({ type: "GET_FAMILY_USER", payload: user.id });
    dispatch({type: "GET_CHILDREN", payload: user.family_id })
    dispatch({ type: "GET_ADULTS", payload: user.family_id });
  }, []);

  console.log('these are the children of this family', children);

  const family = useSelector((store) => store.family);

  console.log("THESE ARE THE FAMILY DETAILS:", family);

  return (
		<>
			<Grid
				container
				spacing={0}
				direction="row"
				alignItems="flex-end"
				justifyContent="center"
				sx={{ mb: 5 }}
			>
				<Box
					component="img"
					sx={{
						height: 50,
						boxShadow: "4",
						borderRadius: 2,
            mx:1
					}}
					alt="Profile Picture"
					src={user.photo_url}
				/>
				<Typography variant="h6">
					Welcome, {user.first_name} {user.last_name}!{" "}
				</Typography>
			</Grid>

			<Typography sx={{ mb: 2 }} variant="h5">
				{family.family_name} Details
			</Typography>

			{/* <div className="family-photo">
				<center>
					{" "}
					<img src={family.photo_url} height="200" />
				</center>
			</div> */}
			{/* <div className="family-bio"></div> */}
			<Box>
				<Typography>Primary Address:</Typography>
				<Typography>
					{family.unit
						? `${family.street_address} ${family.unit}`
						: `${family.street_address}`}
				</Typography>
				<Typography>
					{`${family.city}, ${family.state} ${family.zip}`}
				</Typography>
				<Divider sx={{ my: 2 }} variant="middle" />
			</Box>


			<Typography sx={{ mb: 2 }} variant="h6">
				Our Kids
			</Typography>

			
			{children?.map((kid) => (
				<FamilyChildCards key={kid.id} kid={kid} />
			))}
			<AddChildForm />
			<Divider sx={{ my: 2 }} variant="middle" />

			<Typography sx={{ mb: 2 }} variant="h6">
				Responsible Adults
			</Typography>

			{rAdult?.map((adult) => (
				<FamilyContactCards key={adult.id} adult={adult} />
			))}


			<AddAdultForm />
			<Divider sx={{ my: 2 }} variant="middle" />

			<Typography sx={{ mb: 2 }} variant="h6">
				Upcoming Drop Offs
			</Typography>

			<FamilyDropOffs />
		</>
  );
}

// this allows us to use <App /> in index.js
export default FamilyHomePage;
