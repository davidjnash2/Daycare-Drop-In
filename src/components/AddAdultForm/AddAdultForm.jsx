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

function AddAdultForm() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	const responsibleAdult = {
		family_id: user.family_id,
		first_name: "",
		last_name: "",
		phone_number: "",
		email: "",
		relationship_to_child: "",
		photo_url: "",
	};

	const [newAdult, setNewAdult] = useState(responsibleAdult);
	const [open, setOpen] = useState(false);

	const addNewAdult = () => {
		console.log("this is new adult", newAdult);
		dispatch({ type: "POST_ADULT", payload: newAdult });
		setOpen(!open);
		setNewAdult(responsibleAdult);
		console.log("Submitting");
	};

	function fileSelected(event) {
		console.log("IN FILE SELECTED");
		const selectedFile = event.target.files[0];
		console.log("selectedFile", selectedFile);
		dispatch({
			type: "AWS_ADULT_PHOTO",
			payload: {
				file: selectedFile,
			},
		});
	}

	const fillPresetAdult = (event) => {
		event.preventDefault();
		const presetFirstName = "Abdul";
		const presetLastName = "Ali";
		const presetPhoneNumber = "612-555-7890";
		const presetEmail = "abdul@gmail.com";
		const presetRelationship = "Uncle";

		// Populate the form inputs with the pre-set values
		setNewAdult({
			...newAdult,
			first_name: presetFirstName,
			last_name: presetLastName,
			phone_number: presetPhoneNumber,
			email: presetEmail,
			relationship_to_child: presetRelationship,
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
			{!open ? (
				<Button
					color="secondary"
					variant="contained"
					onClick={() => setOpen(!open)}
				>
					Add an adult
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
							<Typography
								mt={3}
								onClick={fillPresetAdult}
							>
								New Responsible Adult
							</Typography>
							<IconButton size="large" onClick={() => setOpen(!open)}>
								<CloseOutlinedIcon />
							</IconButton>
						</CardContent>

						<Box component="form" onSubmit={addNewAdult} autoComplete="off">
							<TextField
								placeholder="First Name"
								required
								name="first_name"
								sx={{ bgcolor: "white" }}
								type="text"
								margin="normal"
								fullWidth
								label="First Name"
								value={newAdult.first_name}
								onChange={(event) =>
									setNewAdult({
										...newAdult,
										first_name: event.target.value,
									})
								}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								placeholder="Last Name"
								required
								name="last_name"
								sx={{ bgcolor: "white" }}
								type="text"
								margin="normal"
								fullWidth
								label="Adult's Last Name"
								value={newAdult.last_name}
								onChange={(event) =>
									setNewAdult({
										...newAdult,
										last_name: event.target.value,
									})
								}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								placeholder="Phone Number"
								required
								name="phone_number"
								sx={{ bgcolor: "white" }}
								type="text"
								margin="normal"
								fullWidth
								label="Phone number"
								value={newAdult.phone_number}
								onChange={(event) =>
									setNewAdult({
										...newAdult,
										phone_number: event.target.value,
									})
								}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								placeholder="Email"
								required
								name="email"
								sx={{ bgcolor: "white" }}
								type="text"
								margin="normal"
								fullWidth
								label="email"
								value={newAdult.email}
								onChange={(event) =>
									setNewAdult({
										...newAdult,
										email: event.target.value,
									})
								}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								placeholder="Relationship"
								required
								name="relationship_to_child"
								sx={{ bgcolor: "white" }}
								type="text"
								margin="normal"
								fullWidth
								label="Relationship to child"
								value={newAdult.relationship_to_child}
								onChange={(event) =>
									setNewAdult({
										...newAdult,
										relationship_to_child: event.target.value,
									})
								}
								InputLabelProps={{ shrink: true }}
							/>

							<TextField
								// placeholder="Photo"
								required
								fullWidth
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

export default AddAdultForm;
