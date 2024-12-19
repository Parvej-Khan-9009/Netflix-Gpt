import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
      
function Browse() {
  return (
    <>
      <Header />        
      <Outlet/>
    </>
  );
}

export default Browse;