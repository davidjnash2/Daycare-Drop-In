import {
	Button,
	TextField,
	Box,
	Typography,
	Container,
} from "@mui/material";
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

{
	code.hide ? (
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography component="h1" variant="h5">
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
					value={accessCode}
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
					sx={{ mt: 3, mb: 2, p: 2 }}
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
			<Typography component="h1" variant="h5">
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
					name="photo_url"
					label="Photo"
					type="file"
					id="photo"
					onChange={fileSelected}
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
	);
}
