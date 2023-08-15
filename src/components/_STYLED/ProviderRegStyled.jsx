import {
	Button,
	TextField,
	Box,
	Typography,
	Container,
	InputAdornment,
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
			value={newProvider.username}
			label="Email"
			type="text"
			name="username"
			autoFocus
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					username: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			required
			fullWidth
			name="password"
			value={newProvider.password}
			label="Password"
			type="password"
			id="password"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					password: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>

		<TextField
			margin="normal"
			required
			fullWidth
			name="first_name"
			value={newProvider.first_name}
			label="First Name"
			type="text"
			id="first_name"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					first_name: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>

		<TextField
			margin="normal"
			required
			fullWidth
			name="last_name"
			value={newProvider.last_name}
			label="Last Name"
			type="text"
			id="last_name"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					last_name: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>

		<TextField
			margin="normal"
			required
			fullWidth
			name="phone_number"
			value={newProvider.phone_number}
			label="Primary Contact Number"
			type="text"
			id="phone_number"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					phone_number: event.target.value,
				})
			}
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
			name="license"
			value={newProvider.license}
			label="License Number"
			type="text"
			id="license"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					license: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			required
			fullWidth
			name="business_name"
			value={newProvider.business_name}
			label="Business Name"
			type="text"
			id="business_name"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					business_name: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			required
			fullWidth
			name="street_address"
			value={newProvider.street_address}
			label="Street Address"
			type="text"
			id="street_address"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					street_address: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>

		<TextField
			margin="normal"
			fullWidth
			name="unit"
			value={newProvider.unit}
			label="Unit"
			type="text"
			id="unit"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					unit: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			fullWidth
			required
			name="city"
			value={newProvider.city}
			label="City"
			type="text"
			id="city"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					city: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>

		<TextField
			margin="normal"
			required
			fullWidth
			name="state"
			value={newProvider.state}
			label="State (abbr.)"
			type="text"
			id="state"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					state: event.target.value,
				})
			}
			inputProps={{ maxLength: 2 }}
			InputLabelProps={{ shrink: true }}
		/>

		<TextField
			margin="normal"
			required
			fullWidth
			name="zip"
			value={newProvider.zip}
			label="Zip Code"
			type="number"
			id="zip_code"
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					zip: event.target.value,
				})
			}
			inputProps={{ maxLength: 5 }}
			InputLabelProps={{ shrink: true }}
		/>

		<TextField
			margin="normal"
			required
			fullWidth
			name="hours_open"
			label="Start Time"
			type="time"
			id="hours_open"
			value={newProvider.hours_open}
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					hours_open: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			required
			fullWidth
			name="hours_close"
			label="End Time"
			type="time"
			id="hours_close"
			value={newProvider.hours_close}
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					hours_close: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			required
			fullWidth
			name="rates"
			label="Daily Rate"
			type="text"
			id="rates"
			value={newProvider.rates}
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					rates: event.target.value,
				})
			}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">$</InputAdornment>
				),
			}}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			required
			fullWidth
			name="meals"
			label="Meal Provided?"
			type="checkbox"
			id="meals"
			checked={newProvider.meals}
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					meals: event.target.checked,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			fullWidth
			multiline
			rows={4}
			name="business_description"
			label="Business Description"
			type="text"
			id="business_description"
			value={newProvider.business_description}
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					business_description: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			fullWidth
			multiline
			rows={4}
			name="personal_description"
			label="Personal Description"
			type="text"
			id="personal_description"
			value={newProvider.personal_description}
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					personal_description: event.target.value,
				})
			}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			fullWidth
			multiline
			rows={4}
			name="contract_language"
			label="Drop-in Contract"
			type="text"
			id="contract_language"
			value={newProvider.contract_language}
			onChange={(event) =>
				setNewProvider({
					...newProvider,
					contract_language: event.target.value,
				})
			}
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
</Box>;
