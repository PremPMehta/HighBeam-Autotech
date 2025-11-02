// src/routes/routes.js
import React from "react";
// import { Home } from "../Pages/Home/Home";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contactus from "../Pages/Contactus/Contactus";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Service from "../Pages/Service/Service";
import Franchise from "../Pages/Franchise/Franchise";
import BookConsultation from "../Pages/BookConsultation/BookConsultation";
import Blog from "../Pages/Blog/Blog";
import Career from "../Pages/Career/Career";
import AboutCars from "../Pages/AboutCars/AboutCars";
import CarRepair from "../Pages/CarRepair/CarRepair";

// Protected Routes
const authProtectedRoutes = [
  //Home
  // { path: "/login", element: <Login /> },
  // { path: "/signup", element: <Signup /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/service", element: <Service /> },
  { path: "/contact", element: <Contactus /> },
  { path: "/franchise", element: <Franchise /> },
  { path: "/bookconsultation", element: <BookConsultation /> },
  { path: "/blog", element: <Blog /> },
  { path: "/career", element: <Career /> },
  { path: "/car-details", element: <AboutCars /> },
  { path: "/carrepair", element: <CarRepair /> },
];

// Export all routes (you can later add public routes here)
export { authProtectedRoutes };
