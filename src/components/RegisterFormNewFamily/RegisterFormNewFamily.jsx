import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography, Container, Input } from "@mui/material";






function RegisterFormNewFamily() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [photo_Url, setPhoto_Url] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: "REGISTER_FAMILY",
      payload: {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        email: username,
        family_name: familyName,
        phone_number: phoneNumber,
        address: address,
        unit: unit,
        city: city,
        state: state,
        zip: zip,
        photo_url: photo_Url,
        accessCode: accessCode,
      }
    });
  }; // end registerUser

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

  return (
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography component="h1" variant="h5">
				Create your Family Profile
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
					color="secondary"
					sx={{ mt: 3, mb: 2, p: 2 }}
				>
					Register
				</Button>
			</Box>
		</Box>

		//   <form className="formPanel" onSubmit={registerUser}>
		//   <h2>Register New Family</h2>
		//   {errors.registrationMessage && (
		//     <h3 className="alert" role="alert">
		//       {errors.registrationMessage}
		//     </h3>
		//   )}
		//   <div>
		//     <label htmlFor="username">
		//       Email:
		//       <input
		//         type="text"
		//         placeholder="youremail@example.com"
		//         name="username"
		//         value={username}
		//         required
		//         onChange={(event) => setUsername(event.target.value)}
		//       />
		//     </label>
		//   </div>
		//   <div>
		//     <label htmlFor="password">
		//       Password:
		//       <input
		//         type="password"
		//         name="password"
		//         value={password}
		//         required
		//         onChange={(event) => setPassword(event.target.value)}
		//       />
		//     </label>
		//   </div>

		//   <div>
		//     <label htmlFor="first_name">
		//       First Name:
		//       <input
		//         type="text"
		//         name="first_name"
		//         value={firstName}
		//         required
		//         onChange={(event) => setFirstName(event.target.value)}
		//       />
		//     </label>
		//   </div>

		//   <div>
		//     <label htmlFor="last_name">
		//       Last Name:
		//       <input
		//         type="text"
		//         name="last_name"
		//         value={lastName}
		//         required
		//         onChange={(event) => setLastName(event.target.value)}
		//       />
		//     </label>
		//   </div>

		//   <div>
		//     <label htmlFor="family_name">
		//       Family Name:
		//       <input
		//         type="text"
		//         name="family name"
		//         placeholder="A nickname for your family"
		//         value={familyName}
		//         required
		//         onChange={(event) => setFamilyName(event.target.value)}
		//       />
		//     </label>
		//   </div>

		//   <div>
		//     <label htmlFor="phone_number">
		//       Phone Number:
		//       <input
		//         type="text"
		//         name="phone_number"
		//         placeholder="(123) 456-7890"
		//         value={phoneNumber}
		//         required
		//         onChange={(event) => setPhoneNumber(event.target.value)}
		//       />
		//     </label>
		//   </div>

		//   <div>
		//     <label htmlFor="street_address">
		//       Street Address:
		//       <input
		//         type="text"
		//         name="address"
		//         value={address}
		//         required
		//         onChange={(event) => setAddress(event.target.value)}
		//       />
		//     </label>
		//   </div>
		//   <div>
		//     <label htmlFor="unit">
		//       Unit:
		//       <input
		//         type="text"
		//         name="unit"
		//         value={unit}

		//         onChange={(event) => setUnit(event.target.value)}
		//       />
		//     </label>
		//   </div>
		//   <div>
		//     <label htmlFor="city">
		//       City:
		//       <input
		//         type="text"
		//         name="city"
		//         value={city}
		//         required
		//         onChange={(event) => setCity(event.target.value)}
		//       />
		//     </label>
		//   </div>
		//   <div>
		//     <label htmlFor="state">
		//       State:
		//       <input
		//         type="text"
		//         name="state"
		//         value={state}
		//         required
		//         onChange={(event) => setState(event.target.value)}
		//       />
		//     </label>
		//   </div>
		//   <div>
		//     <label htmlFor="zip">
		//       Zipcode:
		//       <input
		//         type="number"
		//         name="zip"
		//         value={zip}
		//         required
		//         onChange={(event) => setZip(event.target.value)}
		//       />
		//     </label>
		//   </div>
		//   <div>
		//     <label htmlFor="photo_url">
		//       Photo:
		//       <input
		//         type="url"
		//         name="photo_url"
		//         value={photo_Url}

		//         onChange={(event) => setPhoto_Url(event.target.value)}
		//       />
		//     </label>
		//   </div>
		//   <div>
		//     <label htmlFor="access_code">
		//       Family Access Code:
		//       <input
		//         type="text"
		//         name="photo"
		//         value={accessCode}
		//         required
		//         onChange={(event) => setAccessCode(event.target.value)}
		//       />
		//     </label>
		//   </div>

		//   <div>
		//     <input className="btn" type="submit" name="submit" value="Register" />
		//   </div>
		// </form>
  );


}

export default RegisterFormNewFamily;
