import { Button, TextField, Box, Typography, Container } from "@mui/material";

// WE CAN GET RID OF photo_url USE STATE AND REMOVE IT FROM THE OBJECT BEING DISPATCHED.

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
<>
	<Box
		sx={{
			marginTop: 8,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		}}
	>
		<Typography component="h1" variant="h5">
			Register for an account
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
				name="family_name"
				value={familyName}
				label="Family Name"
				type="text"
				id="familyName"
				onChange={(event) => setFamilyName(event.target.value)}
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
				name="address"
				value={address}
				label="Street Address"
				type="text"
				id="address"
				onChange={(event) => setAddress(event.target.value)}
				InputLabelProps={{ shrink: true }}
			/>
			<TextField
				margin="normal"
				fullWidth
				name="unit"
				value={unit}
				label="Unit"
				type="text"
				id="unit"
				onChange={(event) => setUnit(event.target.value)}
				InputLabelProps={{ shrink: true }}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="city"
				value={city}
				label="City"
				type="text"
				id="city"
				onChange={(event) => setCity(event.target.value)}
				InputLabelProps={{ shrink: true }}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="state"
				value={state}
				label="State (abbr.)"
				type="text"
				id="state"
				onChange={(event) => setState(event.target.value)}
				inputProps={{ maxLength: 2 }}
				InputLabelProps={{ shrink: true }}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="zip"
				value={zip}
				label="Zip Code"
				type="number"
				id="zip_code"
				onChange={(event) => setZip(event.target.value)}
				inputProps={{ maxLength: 5 }}
				InputLabelProps={{ shrink: true }}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="photo_url"
				label="Photo"
				type="file"
				id="photo"
				onChange={fileSelected}
				InputLabelProps={{ shrink: true }}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="access_code"
				value={accessCode}
				label="Family Access Code"
				type="text"
				id="access_code"
				onChange={(event) => setAccessCode(event.target.value)}
				InputLabelProps={{ shrink: true }}
			/>

			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2, p: 2 }}
			>
				Register
			</Button>
		</Box>
	</Box>
</>;
