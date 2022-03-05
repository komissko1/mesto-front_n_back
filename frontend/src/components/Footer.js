import React from "react";

function Footer() {
  return (
      <footer className="page-footer">
        <p className="page-footer__info">{`© ${new Date().getFullYear()} Mesto Russia`}</p>
      </footer>
  );
}

export default Footer;
