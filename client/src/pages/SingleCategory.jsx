import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SingleCategory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  //get product by cat:

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/product-category/${
          params.cid
        }`
      );

      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(clg);
    }
  };

  useEffect(() => {
    if (params?.cid) getProductsByCat();
  }, [params?.cid]);
  return (
    <Layout title={"Single category page"}>
      <div className="container mt-3 text-center">
        <h3>{category?.name}</h3>
        <h5>{products?.length} result found</h5>

        <div className="row">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            {products?.map((p) => (
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

export default SingleCategory;
