import React from "react";
import { useSearch } from "../../context/search";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  //handleSubmit:

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/search/${
          search.keyword
        }`
      );
      setSearch({ ...search, results: data.result });
      navigate("/search");
    } catch (error) {
      console.log(error);
      toast.error("Error while searching products");
    }
  };
  return (
    <div>
      <form className="form-inline my-2 my-lg-0 d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search Product"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
