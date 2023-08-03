import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  //get user orders:
  const getAllOrder = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/all-orders`
      );
      setOrders(data);
      console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrder();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getAllOrder();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Admin Orders"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow" key={o?._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option value={s} key={i}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <th>{o?.payment.success ? "Success" : "Failed"}</th>
                      <th>{o?.products?.length}</th>
                    </tr>
                  </tbody>
                </table>

                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row card flex-row mb-2" key={p._id}>
                      <div className="col-md-4 mb-2">
                        <div className="text-center">
                          <img
                            src={`${
                              import.meta.env.VITE_BASE_URL
                            }/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{ width: "16rem", height: "11rem" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-8 ">
                        <div className="p-2  text-center">
                          <h4>{p.name}</h4>
                          <p>{p.description.substring(0, 40)}</p>
                          <h4>Price : {p.price}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
