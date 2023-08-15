import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Paper,
} from "@mui/material";

function FamilyDropOffs() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_FAMILY_BOOKINGS", payload: user.family_id });
  }, []);

  const bookingsArray = useSelector((store) => store.bookings);
  console.log("HERE ARE THE BOOKINGS:", bookingsArray);

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
  const leftRow = { p: 0, fontSize: ".5em" };
  const rightRow = { pr: 0.75, mx: 0 };

  return (
    <Paper sx={{ height: "100%", overflow: "auto" }} elevation={6}>
      <TableContainer sx={{ maxHeight: "385px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key="headRow">
              <TableCell sx={headLeft} align="center">
                Date
              </TableCell>
              <TableCell sx={headCenter} align="center">
                Child
              </TableCell>
              <TableCell sx={headWide} align="center">
                Provider
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
                <TableCell sx={{ fontSize: ".8em", p: 0 }} align="center">
                  {booked.booked_day}
                </TableCell>

                <TableCell
        
                  sx={{ leftRow }}
                  align="center"
                >
                  {booked.child_first_name}
                </TableCell>

                <TableCell align="center" sx={wideRow}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    component={Link}
                    to={`/details/provider/${booked.provider_id}`}
                  >
                    info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>

  );
}

export default FamilyDropOffs;
