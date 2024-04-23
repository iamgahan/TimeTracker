import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosTimer } from "react-icons/io";
import { GoProjectRoadmap } from "react-icons/go";
import { BiScreenshot } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";

export const NavbarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard />,
    cName:
      "nav-text flex justify-start items-center pt-8px pr-0px pb-8px pl-16px list-none h-60px ",
  },
  {
    title: "Time Tracker",
    path: "/timetracker",
    icon: <IoIosTimer />,
    cName:
      "nav-text nav-text flex justify-start items-center pt-8px pr-0px pb-8px pl-16px list-none h-60px ",
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <GoProjectRoadmap />,
    cName:
      "nav-text nav-text flex justify-start items-center pt-8px pr-0px pb-8px pl-16px list-none h-60px ",
  },
  {
    title: "Screenshots",
    path: "/screenshots",
    icon: <BiScreenshot />,
    cName:
      "nav-text nav-text flex justify-start items-center pt-8px pr-0px pb-8px pl-16px list-none h-60px ",
  },
  {
    title: "Clients",
    path: "/clients",
    icon: <IoPersonCircleOutline />,
    cName:
      "nav-text flex justify-start items-center pt-8px pr-0px pb-8px pl-16px list-none h-60px ",
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <IoIosPeople />,
    cName:
      "nav-text flex justify-start items-center pt-8px pr-0px pb-8px pl-16px list-none h-60px ",
  },
];
