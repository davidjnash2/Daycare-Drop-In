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


function ProviderAvailabilityTable({ provider }) {
  const dispatch = useDispatch();
  const provider_id = provider.id;
  const availabilityArray = useSelector((store) => store.availability);

  console.log("Provider availability from reducer:", availabilityArray);

  //Use states for availability form input
  const [dateOptions, setDateOptions] = useState([]);
  const [date, setDate] = useState("");
  const [infant, setInfant] = useState(0);
  const [toddler, setToddler] = useState(0);
  const [preschool, setPreschool] = useState(0);
  const [schoolage, setSchoolage] = useState(0);

  //Empty form state for provider availability
  const availabilityForm = {
    provider_id: provider_id,
    date: date,
    infant: infant,
    toddler: toddler,
    pre_k: preschool,
    schoolage: schoolage,
  };

  // populates date input dropdown menu from the present date until a month in the future
  useEffect(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setMonth(currentDate.getMonth() + 1);

    const datesArray = [];
    while (currentDate <= futureDate) {
      datesArray.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDateOptions(datesArray);
  }, []);



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

  //DELETE AN AVAILABILITY TABLE ROW

  const handleDelete = (id) => {
    const deletePayload = {
      id: id,
      provider_id: provider_id,
    };
    console.log("Handle delete triggered, payload is:", deletePayload);
    dispatch({ type: "DELETE_AVAILABILITY", payload: deletePayload });
  };

  // formats date so it displays cleanly on table
  const formattedDate = (availableDate) => {
    return new Date(availableDate).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
		<>
			
			<Paper sx={{ height: "100%" }} elevation={6}>
				<TableContainer sx={{ maxHeight: "385px" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow sx={{ fontSize: ".55em" }}>
								<TableCell
									align="left"
									sx={{
										pl: 1.5,
										pr: 0,
										fontSize: "1.5em",
										backgroundColor: "#390854",
										color: "white",
										mr: 0,
										width: 0.1,
									}}
								>
									Date
								</TableCell>
								<TableCell
									sx={{
										p: 0.5,
										fontSize: "1.5em",
										backgroundColor: "#390854",
										color: "white",
										width: 0.2,
									}}
									align="right"
								>
									Infant
								</TableCell>
								<TableCell
									sx={{
										pr: 0,
										fontSize: "1.5em",
										backgroundColor: "#390854",
										color: "white",
										width: 0.2,
									}}
									align="right"
								>
									Toddler
								</TableCell>
								<TableCell
									sx={{
										fontSize: "1.5em",
										backgroundColor: "#390854",
										color: "white",
										pr: 0.75,
										width: 0.2,
									}}
									align="right"
								>
									Pre-K
								</TableCell>
								<TableCell
									sx={{
										p: 0.75,
										fontSize: "1.5em",
										backgroundColor: "#390854",
										color: "white",
									}}
									align="right"
								>
									Schoolage
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{availabilityArray?.map((entryRow) => (
								<TableRow
									key={entryRow.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}

									// onClick={() => startBooking(entryRow.id)}
								>
									<TableCell sx={{ p: 1.25 }} align="left">
										{entryRow.date}
										<Button
											variant="outlined"
                      color="secondary"
											sx={{
                        
												fontSize: ".75em",
												padding: 0,
												mt: 0.55,
											}}
											onClick={() =>
												handleDelete(entryRow.id)
											}
										>
											Delete
										</Button>
									</TableCell>

									<TableCell align="right" sx={{ p: 1 }}>
										{entryRow.infant}
									</TableCell>

									<TableCell align="right" sx={{ pr: 0.75 }}>
										{entryRow.toddler}
									</TableCell>

									<TableCell
										align="right"
										sx={{ minWidth: "37px" }}
									>
										{entryRow.pre_k}
									</TableCell>

									<TableCell align="right">
										{entryRow.schoolage}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			{/* <Paper sx={{ height: "100%", overflow: "auto" }} elevation={6}>
        <TableContainer sx={{ maxHeight: "385px" }}>
          <Table stickyHeader sx={{ fontSize: "" }} aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ fontSize: ".55em" }}>
                <TableCell align="left" sx={{ fontSize: "1.5em" }}>
                  Date
                </TableCell>
                <TableCell
                  sx={{ p: 0, fontSize: "1.5em" }}
                  align="left"
                >
                  Infant
                </TableCell>
                <TableCell sx={{ fontSize: "1.5em" }} align="left">
                  Toddler
                </TableCell>
                <TableCell sx={{ fontSize: "1.5em" }} align="left">
                  Pre-K
                </TableCell>
                <TableCell
                  sx={{ p: 0, fontSize: "1.5em" }}
                  align="left"
                >
                  Schoolage
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availabilityArray?.map((entryRow) => (
                <TableRow
                  key={entryRow.id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{formattedDate(entryRow.date)}</TableCell>
                  <TableCell sx={{ p: 0 }}>
                    {entryRow.infant}
                  </TableCell>
                  <TableCell>{entryRow.toddler}</TableCell>
                  <TableCell sx={{ minWidth: "37px" }}>
                    {entryRow.pre_k}
                  </TableCell>
                  <TableCell>{entryRow.schoolage}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ fontSize: ".75em", mr: 0 }}
                      onClick={() => handleDelete(entryRow.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> */}
		</>
		// <div className="container">
		//   <table border="1">
		//     <thead>
		//     <tr>
		//       <th>Date</th>
		//       <th>Infant</th>
		//       <th>Toddler</th>
		//       <th>Preschooler</th>
		//       <th>School Age</th>
		//     </tr>
		//     </thead>
		//     <tbody>
		//     <tr>
		//       <td>
		//         <select onChange={handleDateChange}>
		//           {dateOptions.map((date) => (
		//             <option key={date} value={date}>
		//               {date}
		//             </option>
		//           ))}
		//         </select>
		//       </td>
		//       <td>
		//         <input
		//           type="number"
		//           value={infant}
		//           min="0"
		//           max="9"
		//           onChange={handleInfantChange}
		//         />
		//       </td>
		//       <td>
		//         <input
		//           type="number"
		//           value={toddler}
		//           min="0"
		//           max="9"
		//           onChange={handleToddlerChange}
		//         />
		//       </td>
		//       <td>
		//         <input
		//           type="number"
		//           value={preschool}
		//           min="0"
		//           max="9"
		//           onChange={handlePreschoolChange}
		//         />
		//       </td>
		//       <td>
		//         <input
		//           type="number"
		//           value={schoolage}
		//           min="0"
		//           max="9"
		//           onChange={handleSchoolageChange}
		//         />
		//       </td>
		//       <td>
		//         <button onClick={handleSubmit}>Submit</button>
		//       </td>
		//     </tr>
		//     {availabilityArray.map((entryRow) => (
		//       <tr key={entryRow.id}>
		//         <td>{formattedDate(entryRow.date)}</td>
		//         <td>{entryRow.infant}</td>
		//         <td>{entryRow.toddler}</td>
		//         <td>{entryRow.pre_k}</td>
		//         <td>{entryRow.schoolage}</td>
		//         <td>
		//           <button onClick={() => handleDelete(entryRow.id)}>Delete</button>
		//         </td>
		//       </tr>
		//     ))}
		//     </tbody>
		//   </table>
		// </div>
  );
}

export default ProviderAvailabilityTable;
