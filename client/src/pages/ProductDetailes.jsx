import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailes = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);

  //get gingle product:
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/single-product/${
          params.id
        }`
      );
      if (data?.success) {
        setProduct(data?.product);
        getSimilarProduct(data?.product?._id, data?.product?.category?._id);
      } else {
        toast.error("can not get single product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting single product");
    }
  };

  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/product/similar-product/${pid}/${cid}`
      );
      if (data?.success) {
        setSimilarProduct(data?.products);
      } else {
        toast.error("Can not get similar product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting similar product");
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-3 p-2">
        <div className="row">
          <div className="col-md-5 text-center">
            <img
              src={`${
                import.meta.env.VITE_BASE_URL
              }/api/v1/product/product-photo/${params.id}`}
              className="card-img-top"
              alt={product.name}
              style={{ width: "21rem", height: "23rem" }}
            />
          </div>
          <div className="col-md-7 text-center">
            <h1 className="text-center">Product Details</h1>

            <h5>Name : {product.name}</h5>
            <h6>Price : {product.price}</h6>
            <h6>Category : {product?.category?.name}</h6>
            <h6>Description : {product.description}</h6>
            <button className="btn btn-secondary card-btn">Add To Cart</button>
          </div>
        </div>
        <hr />
        <div className="row">
          <h5 className="text-center">similar product</h5>
          {similarProduct.length < 1 && (
            <p className="text-center">No similar product found</p>
          )}
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            {similarProduct?.map((p) => (
              <div
                className="card ms-2 mb-3"
                style={{ width: "16rem", height: "21rem" }}
                key={p._id}
              >
                <img
                  src={`${
                    import.meta.env.VITE_BASE_URL
                  }/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ width: "16rem", height: "11rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <h6 className="card-text">$ {p.price}</h6>

                  <div className="d-flex">
                    <button
                      className="btn btn-primary card-btn"
                      onClick={() => navigate(`/product/${p._id}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary card-btn">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailes;
