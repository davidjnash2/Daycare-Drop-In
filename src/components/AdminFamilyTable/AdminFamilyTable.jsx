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

function AdminFamilyTable() {

  const dispatch = useDispatch();
  const history = useHistory();
  const families = useSelector(store => store.family);
  // console.log(families);
  const MySwal = withReactContent(Swal);

  const columns = [
    { id: "family", label: "Family", minWidth: 150 },
    { id: "parent", label: "Primary Parent", minWidth: 150 },
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
      type: "GET_ALL_FAMILIES",
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


  const deleteFamilyData = (familyId) => {
    event.preventDefault();
    console.log('in deleteFamilyData and familyId is:', familyId);
    MySwal.fire({
      title: "Please confirm you want to remove this family.",
      text: "Click confirm to complete removal.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Family removed.", {
          icon: "success",
          timer: 1000,
          buttons: false,
        });
        dispatch({
          type: 'DELETE_FAMILY',
          payload: familyId
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
          Families
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
              {families.map((family) => (
                <TableRow key={family.id}>
                  <TableCell
                  onClick={() => history.push(`/details/family/${family.id}`)}
                  >
                    {family.family_name}
                    <br />
                    {family.street_address} {family.unit}
                    <br />
                    {family.city}, {family.state} {family.zip}
                  </TableCell>
                  <TableCell
                  onClick={() => history.push(`/details/family/${family.id}`)}
                  >
                    {family.parent_first_name}
                    <br />
                    {formatPhoneNumber(family.parent_number)}
                    <br />
                    {family.parent_email}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      name="delete"
                      value={family.id}
                      startIcon={<DeleteIcon />}
                      sx={{
                        p: 1,
                      }}
                      onClick={() => deleteFamilyData(family.id)}
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

export default AdminFamilyTable;
