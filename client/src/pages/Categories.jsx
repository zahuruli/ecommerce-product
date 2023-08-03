import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/usecategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <h1 className="text-center">All Categories</h1>
      <div className="container-fluid">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link className="btn btn-primary" to={`/category/${c._id}`}>
                {c.name}
              </Link>{" "}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
