import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Toaster />
      <Header />
      <main style={{ minHeight: "75vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultprops = {
  title: "Ecommerce App",
  description: "MERN Stack Project",
  keywords: "mern,react, mongodb,node,express",
  author: "Zahurul Islam",
};

export default Layout;
