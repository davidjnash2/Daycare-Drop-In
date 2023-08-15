import {
	Box,
	IconButton,
	Container,
	Paper,
	Stack,
	Button,
} from "@mui/material";

import { Link} from 'react-router-dom'
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ReorderIcon from "@mui/icons-material/Reorder";
import MapIcon from "@mui/icons-material/Map";
import ViewListIcon from '@mui/icons-material/ViewList';

function BottomNav(){

   const icon = {
		fontSize: ".8rem",
		color: "#F2F2F2",
		display: "flex",
		flexDirection: "column",
		mt: 0.1,
   };

   const text = { marginTop: 3.75 };

   return (
		<>
			<Box
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 999,
				bgcolor: "#390854",
				padding: 0.25,
			  }}
				elevation={10}
			>
				<Stack
					direction="row"
					justifyContent="space-around"
					alignItems="center"
					spacing={0}
					sx={{ my: 0.75 }}
				>
					<IconButton
						size="small"
						sx={icon}
						component={Link}
						to={"/user"}
					>
						<AccountBoxIcon />
						<div style={text}> My Account</div>
					</IconButton>
					<IconButton
						size="small"
						sx={icon}
						component={Link}
						to={"/provider_list"}
					>
						<EventAvailableIcon />
						<div style={text}> Availabilities</div>
					</IconButton>
					<IconButton
						size="small"
						sx={icon}
						component={Link}
						to={"/static_list"}
					>
						<ViewListIcon />
						{/* <MapIcon /> */}
						<div style={text}> Providers</div>
					</IconButton>
				</Stack>
			</Box>
		</>
   );
}

export default BottomNav;