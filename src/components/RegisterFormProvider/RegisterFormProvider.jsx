import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	TextField,
	Box,
	Typography,
	Container,
	InputAdornment,
} from "@mui/material";


function RegisterFormProvider() {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    console.log("New provider submitted:", newProvider);

    dispatch({
		type: "REGISTER_PROVIDER",
		payload: newProvider,
	});
  };

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

  const providerData = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    photo_url: "",
    license: "",
    business_name: "",
    street_address: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    hours_open: "07:00",
    hours_close: "17:00",
    rates: "",
    meals: false,
    business_description: "",
    personal_description: "",
    contract_language: "",
  };

  const [newProvider, setNewProvider] = useState(providerData);
  console.log(newProvider);

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
		Register as a provider
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
      color="secondary"
			sx={{ mt: 3, mb: 2, p: 2 }}
		>
			Register
		</Button>
	</Box>
</Box>
    // <form className="formPanel" onSubmit={registerUser}>
    //   <h2>Register New Provider</h2>
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
    //         name="username"
    //         placeholder="youremail@example.com"
    //         value={newProvider.username}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({ ...newProvider, username: event.target.value })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="password">
    //       Password
    //       <input
    //         type="text"
    //         name="password"
    //         value={newProvider.password}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({ ...newProvider, password: event.target.value })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="first_name">
    //       First Name
    //       <input
    //         type="text"
    //         name="first_name"
    //         value={newProvider.first_name}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({ ...newProvider, first_name: event.target.value })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="last_name">
    //       Last Name
    //       <input
    //         type="text"
    //         name="last_name"
    //         value={newProvider.last_name}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({ ...newProvider, last_name: event.target.value })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="phone_number">
    //       Phone Number
    //       <input
    //         type="text"
    //         name="phone_number"
    //         value={newProvider.phone_number}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             phone_number: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="photo_url">
    //       Photo URL
    //       <input
    //         type="text"
    //         name="photo_url"
    //         value={newProvider.photo_url}
    //         onChange={(event) =>
    //           setNewProvider({ ...newProvider, photo_url: event.target.value })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="license">
    //       License Number
    //       <input
    //         type="text"
    //         name="license"
    //         value={newProvider.license}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({ ...newProvider, license: event.target.value })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="business_name">
    //       Business Name
    //       <input
    //         type="text"
    //         name="business_name"
    //         value={newProvider.business_name}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             business_name: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="street_address">
    //       Street Address
    //       <input
    //         type="text"
    //         name="street_address"
    //         value={newProvider.street_address}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             street_address: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="unit">
    //       Unit
    //       <input
    //         type="text"
    //         name="unit"
    //         value={newProvider.unit}
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             unit: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="city">
    //       City
    //       <input
    //         type="text"
    //         name="city"
    //         value={newProvider.city}
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             city: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="state">
    //       State
    //       <input
    //         type="text"
    //         name="state"
    //         value={newProvider.state}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             state: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="zip">
    //       Zip Code
    //       <input
    //         type="text"
    //         name="zip"
    //         value={newProvider.zip}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             zip: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="hours_open">
    //       Start time
    //       <input
    //         type="time"
    //         name="hours_open"
    //         value={newProvider.hours_open}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             hours_open: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="hours_close">
    //       End time
    //       <input
    //         type="time"
    //         name="hours_close"
    //         value={newProvider.hours_close}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             hours_close: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="rates">
    //       Drop-in Rate $
    //       <input
    //         type="text"
    //         name="rates"
    //         value={newProvider.rates}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             rates: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="meals">
    //       Are meals/snacks provided?
    //       <input
    //         type="checkbox"
    //         name="meals"
    //         checked={newProvider.meals}
    //         onChange={(event) =>
    //           setNewProvider({ ...newProvider, meals: event.target.checked })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="business_description">
    //       Business Description
    //       <textarea
    //         rows="4"
    //         cols="50"
    //         name="business_description"
    //         placeholder="Tell us about your daycare! What makes it special? Anything you particularly want parents to know?"
    //         value={newProvider.business_description}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             business_description: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="personal_description">
    //       Personal Description
    //       <textarea
    //         rows="4"
    //         cols="50"
    //         name="personal_description"
    //         placeholder="Tell us about yourself! Who are you? What do you love about childcare?"
    //         value={newProvider.personal_description}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             personal_description: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label htmlFor="contract_language">
    //       Drop-Off Contract
    //       <textarea
    //         rows="4"
    //         cols="50"
    //         name="contract_language"
    //         placeholder="This is a sample drop-off contract agreement. Please review it and edit/add anything specific to your business."
    //         value={newProvider.contract_language}
    //         required
    //         onChange={(event) =>
    //           setNewProvider({
    //             ...newProvider,
    //             contract_language: event.target.value,
    //           })
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <input className="btn" type="submit" name="submit" value="Register" />
    //   </div>
    // </form>
  );
}

export default RegisterFormProvider;
