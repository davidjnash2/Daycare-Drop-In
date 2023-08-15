import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminHomePage from "../AdminHomePage/AdminHomePage";
import ProviderHomePage from "../ProviderHomePage/ProviderHomePage";
import FamilyHomePage from "../FamilyHomePage/FamilyHomePage";
import {Container} from '@mui/material'

function UserHomePage() {
  const user = useSelector((store) => store.user);
  const userType = user.user_type;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userType === "provider") {
  //     //dispatches request for provider info based on userID
  //     console.log("Dispatching request for data of provider-user ID:", user.id);
  //     dispatch({ type: "GET_PROVIDER_USER", payload: user.id });

  //   }
  // }, []);

  // const provider = useSelector((store) => store.provider);

  console.log("Inside user home page for user: ", user);
  console.log("user type is:", userType);

  let homePage;

  if (userType === "admin") {
    homePage = <AdminHomePage />;
  } else if (userType === "family") {
    homePage = <FamilyHomePage />;
  } else if (userType === "provider") {
    homePage = <ProviderHomePage />;
  }
  return <Container maxWidth='xs'>{homePage}</Container>;
}

export default UserHomePage;
