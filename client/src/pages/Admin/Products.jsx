import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products:
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/get-product`
      );

      if (data?.success) {
        setProducts(data?.products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //get all categories:
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/category/all-category`
      );
      setCategories(data?.allCategory);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting All Categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"All-Users Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>

            <div className="d-flex flex-wrap align-items-center justify-content-center">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p._id}`}
                  key={p._id}
                  className="product-link"
                >
                  <div
                    className="card m-1"
                    style={{ width: "14rem", height: "22rem" }}
                  >
                    <img
                      src={`${
                        import.meta.env.VITE_BASE_URL
                      }/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ width: "14rem", height: "11rem" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <h6 className="card-text">$ {p.price}</h6>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
