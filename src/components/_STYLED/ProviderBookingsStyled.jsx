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
} from "@mui/material";
	<Paper sx={{ height: "100%", overflow: "auto" }} elevation={6}>
		<TableContainer sx={{ maxHeight: "385px" }}>
			<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
						<TableCell align="left">Date</TableCell>
						<TableCell align="left">Child</TableCell>
						<TableCell align="left">Age</TableCell>
						<TableCell align="left">Family</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{booking?.map((booked) => (
						<TableRow
							key={booked.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell>{booked.date}</TableCell>
							<TableCell>{booked.child_first_name}</TableCell>
							<TableCell>{booked.child_age}</TableCell>
							<TableCell>
								<Button
									variant="outlined"
									color="secondary"
									sx={{ fontSize: ".75em", mr: 0 }}
									component={Link}
									to={`/details/family/${booking.family_id}`}
								>
									{booked.family_name}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</Paper>;