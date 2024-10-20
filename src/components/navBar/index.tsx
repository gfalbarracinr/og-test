import React, { useState } from "react";
import "./index.css";
import MobileMenuButton from "../mobileMenuButton";
import NavLink from "./NavLink";
import { BLOG_ENABLED } from "src/feature_flags";

interface Props {
  currentPath: string;
}

interface Section {
  label: string;
  href: string;
  target?: string;
  disabled?: boolean;
}

const topLevelLinks: Section[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Partners",
    href: "/partners/",
  },
  {
    label: "Services",
    href: "/services/",
  },
  {
    label: "Team",
    href: "/team/",
  },
  {
    label: "Careers",
    href: "https://jobs.ashbyhq.com/ekumenlabs",
    target: "_blank",
  },
  {
    label: "Blog",
    href: "/blog/",
    disabled: !BLOG_ENABLED,
  },
  {
    label: "About us",
    href: "/about/",
  },
];

const isActive = (
  currentPathWithTrailingSlash: string,
  sectionUrl: string
): boolean => {
  const sectionUrlWithoutTrailingSlash = sectionUrl.endsWith("/")
    ? sectionUrl.slice(0, sectionUrl.length - 1)
    : sectionUrl;

  if (sectionUrl === "/") {
    return currentPathWithTrailingSlash === "/";
  }
  return currentPathWithTrailingSlash.startsWith(
    sectionUrlWithoutTrailingSlash
  );
};

function NavBar({ currentPath }: Props) {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const currentPathWithTrailingSlash = `/${currentPath}`;
  return (
    <React.Fragment>
      <MobileMenuButton
        state={openMobileMenu}
        setState={() => {
          setOpenMobileMenu((prevState) => !prevState);
        }}
      />
      <ul
        className={`navbar-menu navbar-element ${
          openMobileMenu ? "menu-open" : "menu-close"
        }`}
      >
        {topLevelLinks.map((section) => {
          if (section.disabled === true) {
            return null;
          }
          const classes =
            "navbar-item" +
            (isActive(currentPathWithTrailingSlash, section.href)
              ? " navbar-item-active"
              : "");

          return (
            <li key={`nav-link-${section.label}`} className={classes}>
              <NavLink label={section.label} href={section.href} target={section?.target ?? "_self"} />
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

export default NavBar;
