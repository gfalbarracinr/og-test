import React from "react";
import "./NavLink.css";

interface Props {
  label: string;
  href: string;
  target: string;
}

function NavLink({ label, href, target }: Props) {
  return (
    <a className="navbar-link" href={href} target={target}>
      {label}
    </a>
  );
}

export default NavLink;
