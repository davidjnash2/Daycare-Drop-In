import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterFormNewFamily from '../RegisterFormNewFamily/RegisterFormNewFamily';
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { useDispatch } from 'react-redux';


function RegisterPageNewFamily() {
  const history = useHistory();
  const dispatch = useDispatch();


  return (
		<Container maxWidth="xs">
			

			<RegisterFormNewFamily />

			<center>
				<Button
					type="button"
					color="secondary"
					className="btn btn_asLink"
					onClick={() => {
						history.push("/login");
					}}
				>
					Login
				</Button>
			</center>
		</Container>
  );
}

export default RegisterPageNewFamily;
