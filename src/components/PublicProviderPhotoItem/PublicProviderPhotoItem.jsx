import { useParams, useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { IconButton, Grid, Collapse, CardActions } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";


function PublicProviderPhotoItem({ photo, handleDelete }) {

  // const providerId = useParams();


   const [expanded, setExpanded] = useState(false)
  const flip = {
		open: {
			transform: "rotate(180deg)",
		},
		close: {
			transform: "rotate(0)",
		},
  };
  return (
		<Card
			sx={{
				width: "100%",
				my: 0.5,
			}}
			elevation={4}
		>

				<CardMedia
					component="img"
					image={photo.photo_url}
					sx={{
						objectFit: "fit",
						height: 250,
						borderRadius: 2,
					}}
				/>

			<CardActions
				disableSpacing
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
				}}
			>
				<IconButton onClick={() => setExpanded(!expanded)}>
					{!expanded ? (
						<Typography variant="caption"> Description</Typography>
					) : (
						<Typography variant="caption"> Close </Typography>
					)}
					<ExpandMoreIcon sx={!expanded ? flip.close : flip.open} />
				</IconButton>
			</CardActions>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph variant="caption" align="left">
						{photo.description}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
  );
}

export default PublicProviderPhotoItem;
