import React, { useState } from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <>
      <footer className="container py-3">
        <div className="row">
          <div className="col-12">
            <p className="mb-0">&copy; 2024. Made with &lt;3 for Hannah by <a href="https://garethgreenaway.co.uk" target="_blank">Gareth</a></p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;