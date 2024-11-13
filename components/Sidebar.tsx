"use client";
import { JSX, useState } from "react";
import styles from "styles/Sidebar.module.css";
import {
  FaHome,
  FaBox,
  FaTruck,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

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

const sidebarItems: SidebarItem[] = [
  { label: "Trang chủ", href: "/", icon: <FaHome /> },
  { label: "Sản phẩm", href: "/dashboard/products", icon: <FaBox /> },
  {
    label: "Nhập hàng",
    icon: <FaBox />,
    dropdownItems: [
      { label: "Option 1", href: "/import/option1" },
      { label: "Option 2", href: "/import/option2" },
    ],
  },
  { label: "Xuất hàng", href: "/export", icon: <FaTruck /> },
  { label: "Công cụ", href: "/tools", icon: <FaCog /> },
  {
    label: "Hàng tồn",
    icon: <FaBox />,
    dropdownItems: [
      { label: "Option 1", href: "/inventory/option1" },
      { label: "Option 2", href: "/inventory/option2" },
    ],
  },
  { label: "Nhân viên", href: "/staff", icon: <FaUser /> },
  { label: "Đối tác", href: "/partners", icon: <FaUser /> },
  {
    label: "Hệ thống",
    icon: <FaCog />,
    dropdownItems: [
      { label: "Option 1", href: "/system/option1" },
      { label: "Option 2", href: "/system/option2" },
    ],
  },
  { label: "Tài khoản", href: "/account", icon: <FaUser /> },
];

const Sidebar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div style={{ position: "fixed" }}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          Che<span>Que</span>Pot
        </div>
        <nav>
          <ul className={styles.navList}>
            {sidebarItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                {item.href ? (
                  <a href={item.href} className={styles.navLink1}>
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <>
                    <button
                      className={styles.navLink}
                      onClick={() => handleDropdownToggle(item.label)}
                    >
                      <div style={{ display: "flex" }}>
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <span className={styles.dropdownArrow}>
                        {openDropdown === item.label ? "▲" : "▼"}
                      </span>
                    </button>
                    {item.dropdownItems && openDropdown === item.label && (
                      <ul className={styles.dropdownMenu}>
                        {item.dropdownItems.map((dropdownItem, i) => (
                          <li key={i} className={styles.dropdownItem}>
                            <a href={dropdownItem.href}>{dropdownItem.label}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <a href="#" className={styles.logout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
