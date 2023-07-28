import React from "react";
import Layout from "./Layout";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action "
          aria-current="true"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-products"
          className="list-group-item list-group-item-action"
        >
          Create Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default Adminmenu;
