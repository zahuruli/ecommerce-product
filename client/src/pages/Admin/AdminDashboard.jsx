import React from "react";
import Layout from "../../components/Layout/Layout";
import Aminmenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Aminmenu />
          </div>

          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>Amin Name :{auth?.user?.name}</h1>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Adress: {auth?.user?.address}</h3>
              <h3>Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
