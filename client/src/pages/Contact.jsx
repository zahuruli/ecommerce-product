import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus">
        <div className="col-md-6 ">
          <img
            src="/images/contacts.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 contdiv">
          <h1 className="bg-dark p-2 text-white text-center"> CONTACT US</h1>
          <p>
            Any query and info about product feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            {" "}
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            {" "}
            <BiPhoneCall /> : 01710815467
          </p>
          <p className="mt-3">
            {" "}
            <BiSupport /> : 1800-0000-0000
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
