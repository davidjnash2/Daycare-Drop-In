import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@mui/material";

function ProviderAvailabilityForm({ provider }) {
	const dispatch = useDispatch();
	const provider_id = provider.id;
	
	const [dateOptions, setDateOptions] = useState([]);
	const [date, setDate] = useState("");
	const [infant, setInfant] = useState(0);
	const [toddler, setToddler] = useState(0);
	const [preschool, setPreschool] = useState(0);
	const [schoolage, setSchoolage] = useState(0);

	//set current date in order to restrict date selector from making past dates available to select
	const currentDate = new Date().toISOString().split('T')[0];


	//Empty form state for provider availability
	const availabilityForm = {
		provider_id: provider_id,
		date: date,
		infant: infant,
		toddler: toddler,
		pre_k: preschool,
		schoolage: schoolage,
	};

	//Handle change functions for form inputs
	const handleDateChange = (event) => {
		setDate(event.target.value);
	};
	const handleInfantChange = (event) => {
		setInfant(parseInt(event.target.value));
	};
	const handleToddlerChange = (event) => {
		setToddler(parseInt(event.target.value));
	};
	const handlePreschoolChange = (event) => {
		setPreschool(parseInt(event.target.value));
	};
	const handleSchoolageChange = (event) => {
		setSchoolage(parseInt(event.target.value));
	};

	//SUBMIT NEW AVAILABILITY

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("New availability being submitted!", availabilityForm);

		dispatch({ type: "ADD_AVAILABILITY", payload: availabilityForm });

		//Reset input fields
		setDate("");
		setInfant(0);
		setToddler(0);
		setPreschool(0);
		setSchoolage(0);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Box component="form" onSubmit={handleSubmit} autoComplete="off">
				<Grid container spacing={1}>
					<Grid item xs={2.5}>
						<TextField
							margin="normal"
							name="infant"
							value={infant}
							label="Infant"
							type="number"
							id="infant"
							onChange={handleInfantChange}
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={2.5}>
						<TextField
							margin="normal"
							fullWidth
							name="toddler"
							value={toddler}
							label="Toddler"
							type="number"
							id="toddler"
							onChange={handleToddlerChange}
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={2.5}>
						<TextField
							margin="normal"
							fullWidth
							name="pre-k"
							value={preschool}
							label="Pre-k"
							type="number"
							id="pre-k"
							onChange={handlePreschoolChange}
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={3.5}>
						<TextField
							margin="normal"
							fullWidth
							name="schoolage"
							value={schoolage}
							label="School age"
							type="number"
							id="schoolage"
							onChange={handleSchoolageChange}
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							margin="normal"
							name="date"
							value={date}
							label="Date"
							type="date"
							id="date"
							onChange={handleDateChange}
							InputLabelProps={{ shrink: true }}
							inputProps={{ min: currentDate }}
						/>
						<Button
								variant="outlined"
								color="secondary"
								sx={{ fontSize: ".55em", mr: 0 }}
							onClick={handleSubmit}
							sx={{ mx: 2, my: 3 }}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
export default ProviderAvailabilityForm;