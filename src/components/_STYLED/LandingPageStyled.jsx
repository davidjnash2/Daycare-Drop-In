import {
	Button,
	Grid,
	Box,
	Typography,
	Container,
} from "@mui/material";
<Grid container spacing={1} sx={{ mt: 2 }}>
	<Grid
		item
		xs={12}
		sm={12}
		md={4}
		lg={6}
		xl={6}
		sx={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<Box sx={{ width: "75%" }}>
			<Typography variant="h6" sx={{ textAlign: "center" }}>
				Lorem ipsum dolor sit amet,
			</Typography>
		</Box>
	</Grid>
	<Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
		<Container
			maxWidth="xs"
			sx={{ display: "flex", flexDirection: "column" }}
		>
			<Container
				maxWidth="xs"
				sx={{ display: "flex", flexDirection: "column" }}
			>
				<Typography sx={{ mt: 5, mb: 3 }} align="center" variant="h6">
					New User?
				</Typography>
				<Button
					component={Link}
					to="/registration"
					color="secondary"
					variant="contained"
					sx={{ p: 1 }}
				>
					Register for an account
				</Button>
				<Typography sx={{ mt: 5, mb: 3 }} align="center" variant="h6">
					Already a Member?
				</Typography>
				<Button
					component={Link}
					to="/login"
					color="secondary"
					variant="contained"
					sx={{ p: 1 }}
				>
					Login
				</Button>
			</Container>
		</Container>
	</Grid>
</Grid>;
