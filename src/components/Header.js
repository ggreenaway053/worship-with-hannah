import React, { useState } from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <>
      <header className="container py-3 pb-lg-5">
        <div className="row">
          <div className="col-12 logo"><Logo /></div>
        </div>
      </header>
    </>
  );
};

export default Header;