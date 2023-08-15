import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import logo from './Logo/drop.png'


import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BackButton from '../BackButton/BackButton';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

function Nav() {
	const text = { marginTop: 3.75, marginLeft: 3, fontSize: '.75em' };
	const icon = {
		display: "flex",
		flexDirection: "row",
		justifyContent: 'space-between',
		my: 0.5,
		color: '#9c27b0'
	};
	const user = useSelector((store) => store.user);

	// const [open, setOpen] = useState(false);
	// const toggleDrawer = (open) => (event) => {
	//   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
	//     return;
	//   }
	//   setOpen(open);
	// };

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};



	return (
		<div className="nav">
			<BackButton />
			<Link to="/home">
				<div className="logo-title">
					<img id="logo" src={logo} alt="logo" height="25" />
					<h2 className="nav-title">Daycare Drop-in</h2>
				</div>
			</Link>
			{user.id && (
				<div>
					<IconButton
						aria-controls={open ? "basic-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						edge="start"
						color="white"
						aria-label="open drawer"
						onClick={handleClick}
						sx={{
							color: "white",
							ml: 1,
							mr: 1,
							display: { xs: "block", sm: "none" },
						}}
					>
						<MenuIcon />
					</IconButton>

					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
						sx={{ ml: 1.25 }}
					>
						<MenuItem onClick={handleClose}>
							<IconButton
								size="small"
								sx={icon}
								component={Link}
								to={"/user"}
								aria-label="FIND CARE"
							>
								<AccountBoxIcon />
								<div style={text}> ACCOUNT</div>
							</IconButton>

						</MenuItem>

						<MenuItem onClick={handleClose}>
							<IconButton
								size="small"
								sx={icon}
								component={Link}
								to={"/provider_list"}
								aria-label="FIND CARE"
							>
								<PersonSearchIcon />
								<div style={text}> FIND CARE</div>
							</IconButton>
						</MenuItem>

						<MenuItem onClick={handleClose}>
							<LogOutButton />
						</MenuItem>
					</Menu>
				</div>
			)}
		</div>
	);

}

export default Nav;