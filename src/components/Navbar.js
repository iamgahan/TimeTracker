import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { NavbarData } from "./NavbarData";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const img3Url =
    "https://firebasestorage.googleapis.com/v0/b/authentication-e70b1.appspot.com/o/Screenshot%20from%202024-02-28%2015-01-08.png?alt=media&token=1f237e60-3ad6-4be0-bce7-f0c4f70edf68";

  return (
    <div className="h-full bg-white shadow-xl">
      <img src={img3Url} alt="Not-found"></img>
      <div className="pl-1/2">
        <h1 className="ml-10">Gahan</h1>
        <br />
      </div>
      <IconContext.Provider value={{ color: "black" }}>
        <div className="navdiv">
          {NavbarData.map((items, index) => {
            return (
              <li key={index} className={items.cName}>
                <Link to={items.path}>
                  {items.icon}
                  <span className="ml-4  ">{items.title}</span>
                </Link>
              </li>
            );
          })}
        </div>
      </IconContext.Provider>
    </div>
  );
}
export default Navbar;
