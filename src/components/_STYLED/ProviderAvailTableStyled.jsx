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
<>
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
					/>
					<Button
						variant="outlined"
						onClick={handleSubmit}
						sx={{ mx: 2, my: 3 }}
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Box>
	</Box>
	<Paper sx={{ height: "100%", overflow: "auto" }} elevation={6}>
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
							<TableCell>{entryRow.date}</TableCell>
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
	</Paper>
</>;
