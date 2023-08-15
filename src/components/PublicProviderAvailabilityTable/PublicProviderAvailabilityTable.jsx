import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link} from "react-router-dom";
import PublicProviderAvailabilityRow from "../PublicProviderAvailabilityRow/PublicProviderAvailabilityRow";
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
function PublicProviderAvailabilityTable() {

  const dispatch = useDispatch();
  const history = useHistory();
  const providerId = useParams();
  const availabilityArray = useSelector((store) => store.availability);
  const user = useSelector((store) => store.user);

  const formattedDate = (availableDate) => {
		return new Date(availableDate).toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
			year: "2-digit",
		});
  };
  // const startBooking = () => {
	// 	console.log(
	// 		"in startBooking function in ProviderAvailabilityTable, and providerId.id and user.family_id are:",
	// 		providerId.id,
	// 		user.family_id
	// 	);
	// 	history.push(
	// 		`/booking/${providerId.id}/${entryRow.id}/${user.family_id}`
	// 	);
  // };


  // console.log("Provider availability from reducer:", availabilityArray);
  // console.log("providerId from useParams:", providerId);



  useEffect(() => {
    //dispatches request for specific provider availability using id from useParams
    console.log("Dispatching request for data of familyId:", providerId);
    dispatch({ type: "GET_PROVIDER_AVAILABILITY", payload: providerId.id });
  }, []);

  // const formattedDate = (availableDate) => {
  //   return new Date(availableDate).toLocaleDateString('en-US', {
  //     month: '2-digit',
  //     day: '2-digit',
  //     year: 'numeric',
  //   });
  // };

  /* Notes for routing from public availability table to booking process:
  - each child td != 0 needs to render a booking button
  - booking button should collect the following information in a 'start booking' function and pass it to the booking process:
      - entryRow.id (=== availability.id)
      - entryRow.[age category] (=== number of available spots for that age category)
      - user.id (needed in order to get the user's associated family id, child ids, responsible adult ids)
  */

  // const startBooking = (entryRowId) => {
  //   console.log('in startBooking function in ProviderAvailabilityTable, and providerId and entryRow.id are:', providerId, entryRowId)
  //   history.push(`/booking/${providerId}/${entryRowId}`)
  // }

  return (
		<Paper sx={{ height: "100%"}} elevation={6}>
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
										component={Link}
										to={`/booking/${providerId.id}/${entryRow.id}/${user.family_id}`}
									>
										book
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
		// <div className="container">
		//   <table border="1">
		//     <thead>
		//     <tr>
		//       <th>Date</th>
		//       <th>Infant</th>
		//       <th>Toddler</th>
		//       <th>Pre-K</th>
		//       <th>School-Age</th>
		//     </tr>
		//     </thead>
		//     <tbody>
		//     {availabilityArray.map((entryRow) => (
		//       <PublicProviderAvailabilityRow key={entryRow.id} entryRow={entryRow}/>
		//     ))}
		//     </tbody>
		//   </table>
		// </div>
  );
}

export default PublicProviderAvailabilityTable;
