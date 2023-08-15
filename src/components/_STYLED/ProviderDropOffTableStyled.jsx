import {
	TableContainer,
	TableBody,
	Table,
	TableRow,
	TableCell,
    TableHead,
    Button,
    Paper
} from "@mui/material";

const headWide = {
	width: ".5",
	pr: 1.5,
	backgroundColor: "purple",
	color: "white",
};
const headLeft = {pl:0.75, backgroundColor:'purple', color:'white' }
const headRight = { backgroundColor: "purple", color: "white" };

const wideRow ={ width: ".5", pr:1.5 }
const leftRow ={pl:0.75}
const rightRow ={pr:0.75 }





<>

		<Paper sx={{ height:'100%', overflow: "auto" }} elevation={6}>
				<TableContainer sx={{ maxHeight: "385px" }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell sx={headLeft}>Child</TableCell>
								<TableCell sx={headRight} align="right">
									Date
								</TableCell>
								<TableCell sx={headWide} align="right">
									Family
								</TableCell>
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
									<TableCell
										component="th"
										scope="row"
										sx={leftRow}
									>
										{booked.child_first_name}
									</TableCell>
									<TableCell align="right" sx={rightRow}>
										{booked.service_date}
									</TableCell>
									<TableCell align="right" sx={wideRow}>
										<Button
											variant="outlined"
											color="secondary"
											sx={{ fontSize: ".75em", mr: 0 }}
											component={Link}
											to={`/details/family/${booked.family_id}`}
										>
											{booked.family_name}
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
</>
