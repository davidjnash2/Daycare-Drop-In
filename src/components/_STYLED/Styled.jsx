import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	Button,
// 	TextField,
// 	FormControlLabel,
// 	Grid,
// 	Box,
// 	Typography,
// 	Container,
// 	InputAdornment,
// 	Alert,
// 	TableContainer,
// 	TableBody,
// 	Table,
// 	TableRow,
// 	TableCell,
// 	TableHead,
// 	Paper,
// 	Select,
// 	FormControl,
// 	InputLabel,
// 	MenuItem,
// 	FormHelperText,

// } from "@mui/material";

// import {Link} from 'react-router-dom'

// // import logo from './Logo/drop.png'

function Styled() {
// 	const user = useSelector((store) => store.user);
// 	const provider_id = useSelector((store) => store.provider.id);
// 	// const availabilityArray = useSelector((store) => store.availability);
// 	// 	const dispatch = useDispatch();

// 	const registerUser = (event) => {
// 		event.preventDefault();

// 		console.log("New provider submitted:", newProvider);

// 		dispatch({
// 			type: "REGISTER_PROVIDER",
// 			payload: newProvider,
// 		});
// 	};

// 	// const providerData = {
// 	// 	username: "",
// 	// 	password: "",
// 	// 	first_name: "",
// 	// 	last_name: "",
// 	// 	email: "",
// 	// 	phone_number: "",
// 	// 	photo_url: "",
// 	// 	license: "",
// 	// 	business_name: "",
// 	// 	street_address: "",
// 	// 	unit: "",
// 	// 	city: "",
// 	// 	state: "",
// 	// 	zip: "",
// 	// 	hours_open: "",
// 	// 	hours_close: "",
// 	// 	rates: "",
// 	// 	meals: false,
// 	// 	business_description: "",
// 	// 	personal_description: "",
// 	// 	contract_language: "",
// 	// };

// 	// const [newProvider, setNewProvider] = useState(providerData);

// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	  const [firstName, setFirstName] = useState("");
// 	  const [lastName, setLastName] = useState("");
// 	  const [familyName, setFamilyName] = useState("");
// 	  const [phoneNumber, setPhoneNumber] = useState("");
// 	  const [address, setAddress] = useState("");
// 	  const [unit, setUnit] = useState("");
// 	  const [city, setCity] = useState("");
// 	  const [state, setState] = useState("");
// 	  const [zip, setZip] = useState("");
// 	  const [photo_Url, setPhoto_Url] = useState("");
// 	  const [accessCode, setAccessCode] = useState("");
// 	  const [code, setCode] = useState(true)

// 	//   const registerUser = (event) => {
// 	//     event.preventDefault();
// 	//     dispatch({
// 	// 		type: "REGISTER_FAMILY",
// 	// 		payload: {
// 	// 			username: username,
// 	// 			password: password,
// 	// 			first_name: firstName,
// 	// 			last_name: lastName,
// 	// 			email: username,
// 	// 			family_name: familyName,
// 	// 			phone_number: phoneNumber,
// 	// 			address: address,
// 	// 			unit: unit,
// 	// 			city: city,
// 	// 			state: state,
// 	// 			zip: zip,
// 	// 			photo_url: photo_Url,
// 	// 			access_code: accessCode,
// 	// 		}
// 	// 	});
// 	// }

// 	// const validateAccessCode = ()=>{
// 	//     console.log('Validated');
// 	//     setCode(!code)
// 	// }

// 	const headWide = {
// 		width: ".5",
// 		pr: 1.5,
// 		backgroundColor: "purple",
// 		color: "white",
// 	};
// 	const headLeft = { pl: 0.75, backgroundColor: "purple", color: "white" };
// 	const headRight = { backgroundColor: "purple", color: "white" };

// 	const wideRow = { width: ".5", pr: 1.5 };
// 	const leftRow = { pl: 0.75 };
// 	const rightRow = { pr: 0.75 };

// 	const booking = [
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/4/23",
// 			biz_name: "Small Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/5/23",
// 			biz_name: "Medium Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 		{
// 			id: 1,
// 			service_date: "8/2/23",
// 			biz_name: "Big Vibez",
// 			child_first_name: "Zackaria",
// 		},
// 	];

// 	const availabilityArray = [
// 		{
// 			id: 1,
// 			date: "8/2/23",
//             infant:1,
//             toddler:1,
//             pre_k:0,
//             schoolage:0,
// 		},
// 		{
// 			id: 1,
// 			date: "8/2/23",
//             infant:1,
//             toddler:1,
//             pre_k:0,
//             schoolage:0,
// 		},
// 		{
// 			id: 1,
// 			date: "8/2/23",
//             infant:1,
//             toddler:1,
//             pre_k:0,
//             schoolage:0,
// 		},
// 		{
// 			id: 1,
// 			date: "8/2/23",
//             infant:1,
//             toddler:1,
//             pre_k:0,
//             schoolage:0,
// 		},
// 		{
// 			id: 1,
// 			date: "8/2/23",
//             infant:1,
//             toddler:1,
//             pre_k:0,
//             schoolage:0,
// 		},

// 	];
// 	const login = () => {};

// 	//Use states for availability form input
// 	const [dateOptions, setDateOptions] = useState([]);
// 	const [date, setDate] = useState("");
// 	const [infant, setInfant] = useState(0);
// 	const [toddler, setToddler] = useState(0);
// 	const [preschool, setPreschool] = useState(0);
// 	const [schoolage, setSchoolage] = useState(0);

// 	//Empty form state for provider availability
// 	const availabilityForm = {
// 		provider_id: provider_id,
// 		date: date,
// 		infant: infant,
// 		toddler: toddler,
// 		pre_k: preschool,
// 		schoolage: schoolage,
// 	};

// 	//Handle change functions for form inputs
// 	const handleDateChange = (event) => {
// 		setDate(event.target.value);
// 		console.log(date);
// 	};
// 	const handleInfantChange = (event) => {
// 		setInfant(parseInt(event.target.value));
// 	};
// 	const handleToddlerChange = (event) => {
// 		setToddler(parseInt(event.target.value));
// 	};
// 	const handlePreschoolChange = (event) => {
// 		setPreschool(parseInt(event.target.value));
// 	};
// 	const handleSchoolageChange = (event) => {
// 		setSchoolage(parseInt(event.target.value));
// 	};

// 	//SUBMIT NEW AVAILABILITY

// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		console.log("New availability being submitted!", availabilityForm);

// 		dispatch({ type: "ADD_AVAILABILITY", payload: availabilityForm });

// 		//Reset input fields
// 		setDate("");
// 		setInfant(0);
// 		setToddler(0);
// 		setPreschool(0);
// 		setSchoolage(0);
// 	};

// 	//DELETE AN AVAILABILITY TABLE ROW

// 	const handleDelete = (id) => {
// 		const deletePayload = {
// 			id: id,
// 			provider_id: provider_id,
// 		};
// 		console.log("Handle delete triggered, payload is:", deletePayload);
// 		dispatch({ type: "DELETE AVAILABILITY", payload: deletePayload });
// 	};

// 	const drop = { mx: 0.75, width: 75, my: 1 };

	return (
<></>
// 		<Container maxWidth="sm">
// 			<Container
// 				maxWidth="xs"
// 				sx={{ display: "flex", flexDirection: "column" }}
// 			>
// 				<Button
// 					variant="contained"
// 					component={Link}
// 					to=""
// 					color="secondary"
// 					sx={{ p: 2, my: 1.5 }}
// 				>
// 					Register as a New Provider
// 				</Button>
// 				<Button
// 					variant="contained"
// 					component={Link}
// 					to=""
// 					color="secondary"
// 					sx={{ p: 2, my: 1.5 }}
// 				>
// 					Register a New Family
// 				</Button>
// 				<Button
// 					variant="contained"
// 					component={Link}
// 					to=""
// 					color="secondary"
// 					sx={{ p: 2, my: 1.5 }}
// 				>
// 					Join an existing family
// 				</Button>
// 			</Container>
// 			<Box
// 				sx={{
// 					marginTop: 8,
// 					display: "flex",
// 					flexDirection: "column",
// 					alignItems: "center",
// 				}}
// 			>
// 				<Typography component="h1" variant="h5">
// 					Register for an account
// 				</Typography>
// 				<Box
// 					component="form"
// 					onSubmit={registerUser}
// 					sx={{ mt: 1 }}
// 					autoComplete="off"
// 				>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						id="username"
// 						value={username}
// 						label="Email"
// 						name="username"
// 						autoFocus
// 						onChange={(event) => setUsername(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="password"
// 						value={password}
// 						label="Password"
// 						type="password"
// 						id="password"
// 						onChange={(event) => setPassword(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="first_name"
// 						value={firstName}
// 						label="First Name"
// 						type="text"
// 						id="first_name"
// 						onChange={(event) => setFirstName(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="last_name"
// 						value={lastName}
// 						label="Last Name"
// 						type="text"
// 						id="last_name"
// 						onChange={(event) => setLastName(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="family_name"
// 						value={familyName}
// 						label="Family Name"
// 						type="text"
// 						id="familyName"
// 						onChange={(event) => setFamilyName(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>

// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="phone_number"
// 						value={phoneNumber}
// 						label="Primary Contact Number"
// 						type="text"
// 						id="phone_number"
// 						onChange={(event) => setPhoneNumber(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="address"
// 						value={address}
// 						label="Street Address"
// 						type="text"
// 						id="address"
// 						onChange={(event) => setAddress(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						fullWidth
// 						name="unit"
// 						value={unit}
// 						label="Unit"
// 						type="text"
// 						id="unit"
// 						onChange={(event) => setUnit(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="city"
// 						value={city}
// 						label="City"
// 						type="text"
// 						id="city"
// 						onChange={(event) => setCity(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="state"
// 						value={state}
// 						label="State (abbr.)"
// 						type="text"
// 						id="state"
// 						onChange={(event) => setState(event.target.value)}
// 						inputProps={{ maxLength: 2 }}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="zip"
// 						value={zip}
// 						label="Zip Code"
// 						type="number"
// 						id="zip_code"
// 						onChange={(event) => setZip(event.target.value)}
// 						inputProps={{ maxLength: 5 }}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="photo_url"
// 						value={photo_Url}
// 						label="Photo"
// 						type="url"
// 						id="url"
// 						onChange={(event) => setPhoto_Url(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="access_code"
// 						value={accessCode}
// 						label="Family Access Code"
// 						type="text"
// 						id="access_code"
// 						onChange={(event) => setAccessCode(event.target.value)}
// 						InputLabelProps={{ shrink: true }}
// 					/>

// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						sx={{ mt: 3, mb: 2, p: 2 }}
// 					>
// 						Register
// 					</Button>
// 				</Box>
// 			</Box>
// 		</Container>
	);
}

export default Styled;

// //