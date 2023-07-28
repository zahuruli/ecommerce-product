import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us -Ecommerce app"} keywords={"About Ecommerce"}>
      <div className="row aboutus">
        <div className="col-md-6 ">
          <img
            src="/images/about.webp"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-5 contdiv">
          <p style={{ color: "#0070D4", fontSize: "20px", fontWeight: "400" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae cum
            veritatis cupiditate exercitationem libero neque error quae corporis
            velit architecto, quia consequuntur eum consequatur. Voluptatum
            velit unde porro libero ipsa doloribus, assumenda rerum laborum
            odit! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Libero, animi.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
