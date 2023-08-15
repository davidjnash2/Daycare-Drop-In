import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea, IconButton, Typography, Button, Container, Grid, Box, CardHeader, CardActions, TextField, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function AdminProviderTable() {

  const dispatch = useDispatch();
  const history = useHistory();
  const providers = useSelector(store => store.provider) || [];
  // console.log("in AdminProviderTable, and providers are:", providers);
  const MySwal = withReactContent(Swal);

  const columns = [
    { id: "business", label: "Daycare", minWidth: 150 },
    { id: "provider", label: "Provider", minWidth: 150 },
    { id: "delete_button", label: "", minWidth: 75 }
  ]

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  useEffect(() => {
    dispatch({
      type: "GET_ALL_PROVIDERS",
    });
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an asynchronous API call to fetch book details
    setTimeout(() => {
      // Set isLoading to false once the data is fetched
      setIsLoading(false);
    }, 75);
  }, []); // Empty dependency array to run the effect only once

  if (isLoading) {
    // Render a loading state or a placeholder component
    return <div>Loading...</div>;
  }

  const deleteProviderData = (providerId) => {
    event.preventDefault();
    console.log('in deleteProviderData and providerId is:', providerId);
    MySwal.fire({
      title: "Please confirm you want to remove this provider.",
      text: "Click confirm to complete removal.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Provider removed.", {
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        dispatch({
          type: 'DELETE_PROVIDER',
          payload: providerId
        });
      } else {
        MySwal.fire("Canceled!", {
          icon: "info",
          timer: 1500,
          buttons: false,
        })
      }
    })
  };

  return (
    // <div className="container">
    //   <Container maxWidth={"xs"}>
    <Grid container spacing={1} >
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Typography
          sx={{
            mt: 10,
            fontSize: "2rem",
          }}
          variant="h4"
          align="center"
        >
          Providers
        </Typography>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.label}
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      backgroundColor: "#390854",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell
                  onClick={() => history.push(`/details/provider/${provider.id}`)}
                  >
                    {provider.business_name}
                    <br />
                    {provider.street_address} {provider.unit}
                    <br />
                    {provider.city}, {provider.state} {provider.zip}
                  </TableCell>
                  <TableCell
                  onClick={() => history.push(`/details/provider/${provider.id}`)}
                  >
                    {provider.prov_first_name} {provider.prov_last_name}
                    <br />
                    {formatPhoneNumber(provider.prov_number)}
                    <br />
                    {provider.prov_email}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      name="delete"
                      startIcon={<DeleteIcon />}
                      sx={{
                        p: 1,
                      }}
                      onClick={() => deleteProviderData(provider.id)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Grid>
    </Grid>
    //   </Container>
    // </div>
  );
}

export default AdminProviderTable;
