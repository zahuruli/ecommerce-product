import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
const SearchProduct = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search results</h1>
          <h6>
            {search?.results.length < 1
              ? "No Product Found"
              : `Found ${search.results.length}`}
          </h6>

          <div className="d-flex flex-wrap align-items-center justify-content-center">
            {search.results?.map((p) => (
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

export default SearchProduct;
