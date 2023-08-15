import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link} from "react-router-dom";

import {
  Button,
  Container,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  Divider
} from "@mui/material";


function ProviderBookingsTable({ provider }) {
  const dispatch = useDispatch();
  const provider_id = provider.id

  useEffect(() => {
    // provider_id &&
      console.log(
        "Dispatching request for bookings data of provider:",
        provider_id
      );
    // dispatch({ type: "GET_PROVIDER_BOOKINGS", payload: provider_id });
  }, []);

  const bookingsArray = useSelector((store) => store.bookings);
  console.log("HERE ARE THE BOOKINGSSSSSS:", bookingsArray);

  const calculateAge = (birthdate) => {
    // Convert birthdate string to a Date object
    const birthdateObj = new Date(birthdate);

    // Calculate the difference between current date and birthdate
    const currentDate = new Date();
    const exactAge = currentDate - birthdateObj;

    // Calculate years and months
    const ageInYears = Math.floor(exactAge / (365 * 24 * 60 * 60 * 1000));
    const ageInMonths = Math.floor(
      (exactAge % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)
    );

    // Format the result as a string
    // const childAge =   `${ageInYears} yrs\n ${ageInMonths} mos`
    const childAge =  (ageInYears > 0 ? `${ageInYears} yr \n${ageInMonths} mo` : `${ageInMonths} mo`)

    return childAge;
  };

  const color = { backgroundColor: "#390854", color: "white" };
  const headWide = {
		width: ".6",
		pr: 1.5,
		backgroundColor: "#390854",
		color: "white",
  };
  const headLeft = { backgroundColor: "#390854", color: "white", width: ".2" };
  const headCenter = {
		width: ".4",
		pl: 3.2,
		backgroundColor: "#390854",
		color: "white",
  };

  const wideRow = { pl: 0, pr: 0.9 };
  const rightRow = { pr: 0.55, pl:0, fontSize: ".5em" };


  return (
		<>
			<Paper sx={{ height: "100%", overflow: "auto" }} elevation={6}>
				<TableContainer sx={{ maxHeight: "385px" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell sx={color} align="left">
									Date
								</TableCell>
								<TableCell sx={color} align="center">
									Child
								</TableCell>
                <TableCell sx={color} align="center">
									Age
								</TableCell>
								<TableCell sx={color} align="center">
									Family
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{bookingsArray?.map((booked) => (
								<TableRow
									key={booked.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell
									sx={{pr:0}}

									>{booked.booked_day}</TableCell>
									<TableCell>
										<center>{booked.child_first_name}<br />
										</center>
									</TableCell>

                  <TableCell>
                    <center>{calculateAge(booked.child_age)}</center>
                  </TableCell>

									<TableCell sx={rightRow} align="center">
										<Button
											variant="outlined"
											color="secondary"
											sx={{ fontSize: ".55em", mr: 0 }}
											component={Link}
											to={`/details/family/${booked.parent_fam_id}`}
											// onClick={() =>
											// 	console.log(booked.parent_fam_id)
											// 	// dispatch({
											// 	// 	type: "GET_FAMILY",
											// 	// 	payload:
											// 	// 		booked.parent_fam_id,
											// 	// })
											// }
										>
											Info
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
		// <div className="container">
		//   <table border="1">
		//     <thead>
		//       <tr>
		//         <th>Service Date</th>
		//         <th>Family Name</th>
		//         <th>Child Name</th>
		//         <th>Age</th>
		//         <th>Drop-Off/Pickup</th>
		//       </tr>
		//     </thead>
		//     <tbody>
		//       {bookingsArray?.map((booking) => (
		//         <tr key={booking.booking_id}>
		//           <td>{booking.booked_day}</td>
		//           <td>{booking.fam_account_name}</td>
		//           <td>{booking.child_first_name}</td>
		//           <td>{calculateAge(booking.child_age)}</td>
		//           <td>
		//             {booking.adult_first_name} ({booking.adult_relationship})
		//           </td>
		//         </tr>
		//       ))}
		//     </tbody>
		//   </table>
		// </div>
  );
}

export default ProviderBookingsTable;
