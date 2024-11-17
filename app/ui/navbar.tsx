"use client";
import { JSX } from "react";
import { useState } from "react";
import styles from "styles/Sidebar.module.css";

type DropdownItem = {
  label: string;
  href: string;
};

type SidebarItem = {
  label: string;
  href?: string;
  icon: JSX.Element;
  dropdownItems?: DropdownItem[];
};

const NavBar = (pros: SidebarItem) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };
  return (
    <>
      <button
        className={styles.navLink}
        onClick={() => handleDropdownToggle(pros.label)}
      >
        <div style={{ display: "flex" }}>
          {pros.icon}
          <span>{pros.label}</span>
        </div>
        <span className={styles.dropdownArrow}>
          {openDropdown === pros.label ? "▲" : "▼"}
        </span>
      </button>
      {pros.dropdownItems && openDropdown === pros.label && (
        <ul className={styles.dropdownMenu}>
          {pros.dropdownItems.map((dropdownItem, i) => (
            <li key={i} className={styles.dropdownItem}>
              <a href={dropdownItem.href}>{dropdownItem.label}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavBar;
