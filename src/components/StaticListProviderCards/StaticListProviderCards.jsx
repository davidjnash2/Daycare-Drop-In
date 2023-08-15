import React from "react";
import { useHistory } from 'react-router-dom';
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	CardMedia,
	Chip,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	CardActionArea,
} from "@mui/material";

function StaticListProviderCards({choice}) {
	const history = useHistory();

  	const bioItem = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		ml: -1.5,
	};
	const availItem = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		ml: -2,
	};
	const availItem2 = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	};
	const notChip = {
		mb: 0.5,
		border: "1px solid purple",
		borderRadius: 8,
		width: "100%",
		mx: 2,
		display: "flex",
		flexDirection: "column",
		bgcolor: "purple",
		color: "white",
	};
  return (
		<Container maxWidth="xs">
			<Card
				sx={{
					width: "107%",
					mb: 1.5,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					borderRadius: 4,
					ml: -1,
				}}
				raised
				onClick={() => history.push(`/details/provider/${choice.id}`)}
			>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
						mb: -3,
						mt: -1,
					}}
				>
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-start",
							mb: -3,
							ml: -2.5,
						}}
					>
						<CardMedia
							component="img"
							sx={{ objectFit: "contain", height: 55 }}
							image={choice.prov_pic}
							alt={"profile picture"}
						/>
						<Typography variant="h7" align="left">
							{choice.business_name}
						</Typography>
						<Typography
							variant="caption"
							align="left"
							sx={{ mt: 0.25 }}
						>
							{choice.provider_open} to {choice.provider_close} - {choice.zip}
						</Typography>
					</CardContent>
				</CardContent>
				{/* <CardContent
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					MAP
				</CardContent> */}

				{/* <Button
					sx={{ mx: 6, mb: 2.5, p: 1, mt: -1 }}
					variant="contained"
					onClick={() => visitProvider(choice.provider_id)}
				>
					See this provider's page
				</Button> */}
			</Card>
		</Container>
  );
}

export default StaticListProviderCards;
