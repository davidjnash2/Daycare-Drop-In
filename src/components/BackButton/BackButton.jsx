import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton() {

    return (
		<>
			<IconButton
				aria-label="back"
				sx={{
					color: "white",
					mr: 1.75,
					size: "large",
				}}
				onClick={() => window.history.back()}
			>
				<ArrowBackIcon sx={{ fontSize: '1.3em' }} />
			</IconButton>
		</>
	);
}

export default BackButton;