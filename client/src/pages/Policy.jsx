import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy policy"}>
      <div className="row privacy">
        <div className="col-md-6">
          <img
            src="images/privacy.jpg"
            alt="Privacy pocilcy"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">
            {" "}
            PRIVACY POLICY
          </h1>

          <ul className="privacyList">
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
