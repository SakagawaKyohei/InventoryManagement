import { JSX } from "react";
import styles from "styles/Sidebar.module.css";
import {
  FaHome,
  FaBox,
  FaTruck,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTruckMoving,
  FaFileImport,
  FaFileExport,
} from "react-icons/fa";
import { signOut } from "@/auth";
import Image from "next/image";
import { PowerIcon } from "@heroicons/react/24/outline";
import NavBar from "@/app/ui/navbar";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

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
    icon: <Image src="/import.png" width={20} height={20} alt="return" />,
    dropdownItems: [
      { label: "Chờ thanh toán", href: "/dashboard/nhap-hang/cho-thanh-toan" },
      { label: "Đang nhập kho", href: "/dashboard/nhap-hang/dang-nhap-kho" },
      { label: "Đã nhập kho", href: "/dashboard/nhap-hang/da-nhap-kho" },
    ],
  },
  {
    label: "Xuất hàng",
    href: "/export",
    icon: <Image src="/export.png" width={20} height={20} alt="return" />,
  },
  {
    label: "Công nợ",
    href: "/tools",
    icon: <RiMoneyDollarCircleFill />,
  },
  {
    label: "Vận chuyển",
    icon: <FaTruckMoving />,
    dropdownItems: [
      {
        label: "Đang vận chuyển",
        href: "/dashboard/van-chuyen/dang-van-chuyen",
      },
      { label: "Đã vận chuyển", href: "/dashboard/van-chuyen/da-van-chuyen" },
    ],
  },
  {
    label: "Hàng tồn",
    icon: <FaBox />,
    dropdownItems: [
      { label: "Còn hạn", href: "/dashboard/hang-ton/con-han" },
      { label: "Hết hạn", href: "/dashboard/hang-ton/het-han" },
    ],
  },

  { label: "Đối tác", href: "/dashboard/doi-tac", icon: <FaUser /> },
  {
    label: "Hệ thống",
    icon: <FaCog />,
    dropdownItems: [
      { label: "Logging", href: "/system/option1" },
      { label: "Back-up", href: "/system/option2" },
    ],
  },
  { label: "Tài khoản", href: "/account", icon: <FaUser /> },
];

const Sidebar: React.FC = () => {
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
                  <NavBar {...item} />
                )}
              </li>
            ))}
          </ul>
        </nav>
        <form
          className={styles.logout}
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className={styles.logout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
