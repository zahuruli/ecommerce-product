import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [categories, setCategories] = useState([]);
  const [pid, setPid] = useState("");

  const { id } = params;
  //get single product:
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/single-product/${id}`
      );
      if (data?.success) {
        setCategory(data?.product?.category._id);
        setPhoto(data?.product?.photo);
        setPid(data?.product?._id);
        setName(data?.product?.name);
        setDescription(data?.product?.description);
        setPrice(data?.product?.price);
        setQuantity(data?.product?.quantity);
        setShipping(data?.product?.shipping);
      } else {
        toast.error("Cant not get single product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  //get all categories:
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data?.allCategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting All Categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product:
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("category", category);
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/update-product/${pid}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  //Delete product:

  const deleteProduct = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/delete-product/${pid}`
      );
      if (data.success) {
        toast.success("Successfully deleted product");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Can not delete product");
    }
  };

  return (
    <Layout title={"Create-Products Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>

          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${
                        import.meta.env.VITE_BASE_URL
                      }/api/v1/product/product-photo/${pid}`}
                      alt={"product photo"}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name "
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a price "
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  className="form-select mb-3"
                  bordered={false}
                  placeholder="Select shipping"
                  size="large"
                  showSearch
                  onChange={(value) => setShipping(value)}
                  value={shipping && shipping == "1" ? "Yes" : "No"}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary ms-1" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>

                <button className="btn btn-danger ms-1" onClick={deleteProduct}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
