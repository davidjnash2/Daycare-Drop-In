import {
	Button,
	Container,
} from "@mui/material";
<Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column" }}>
	<Button
		variant="contained"
		component={Link}
		to=""
		color="secondary"
		sx={{ p: 3, my: 1.5 }}
	>
		Register as a New Provider
	</Button>
	<Button
		variant="contained"
		component={Link}
		to=""
		color="secondary"
		sx={{ p: 3, my: 1.5 }}
	>
		Register a New Family
	</Button>
	<Button
		variant="contained"
		component={Link}
		to=""
		color="secondary"
		sx={{ p: 3, my: 1.5 }}
	>
		Join an existing family
	</Button>
</Container>
