import {
	Button,
	TextField,
	Box,
	Typography,
	Container,

} from "@mui/material";
<Box
	sx={{
		marginTop: 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	}}
>
	<Typography component="h1" variant="h5">
		Login
	</Typography>
	<Box component="form" onSubmit={login} sx={{ mt: 1 }} autoComplete="off">
		<TextField
			margin="normal"
			required
			fullWidth
			id="username"
			value={username}
			label="Email"
			name="username"
			autoFocus
			onChange={(event) => setUsername(event.target.value)}
			InputLabelProps={{ shrink: true }}
		/>
		<TextField
			margin="normal"
			required
			fullWidth
			name="password"
			value={password}
			label="Password"
			type="password"
			id="password"
			onChange={(event) => setPassword(event.target.value)}
			InputLabelProps={{ shrink: true }}
		/>
		<Button
			type="submit"
			fullWidth
			variant="contained"
			sx={{ mt: 3, mb: 2, p: 2 }}
		>
			Login
		</Button>
	</Box>
</Box>;
