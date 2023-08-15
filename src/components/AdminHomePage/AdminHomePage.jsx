import React from "react";
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import AdminProviderTable from "../AdminProviderTable/AdminProviderTable";
import AdminFamilyTable from "../AdminFamilyTable/AdminFamilyTable";


function AdminHomePage() {

    const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h1>Admin Home Page</h1>
      <h2>Welcome, {user.username}!</h2>
      <AdminProviderTable />
      <AdminFamilyTable />
    </div>
  );
}

export default AdminHomePage;
