import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";


function LogOutButton(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = () => {
    dispatch({ type: 'LOGOUT' });
    history.push(`/home`)
  }

  return (
    <>
      <Button
        color="secondary"
        onClick={logOut}
      >
        <LogoutIcon />
        Log Out
      </Button>
    </>

  );
}

export default LogOutButton;
