import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div
      className="h-screen bg-gray-100 flex"
    >
      <Navbar />
      <props.element />
    </div>
  );
};

export default Layout;
