import { JSX } from "react";
import styles from "styles/Sidebar.module.css";
import {
  FaHome,
  FaBox,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTruckMoving,
  FaLock,
} from "react-icons/fa";
import { auth, signOut } from "@/auth";
import Image from "next/image";
import NavBar from "@/app/ui/navbar";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { getUserByEmail } from "@/app/lib/data";

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

//perm admin [1,2,3,5,7,8,9,10,11,12,12]
//perm ketoan [4,6,9,13]
//perm nguoivanchuyen[8,13]

const permission = [
  { label: "Trang chủ", href: "/dashboard", icon: <FaHome />, id: "1" },
  { label: "Sản phẩm", href: "/dashboard/products", icon: <FaBox />, id: "2" },
  {
    label: "Nhập hàng",
    icon: <Image src="/import.png" width={20} height={20} alt="return" />,
    dropdownItems: [
      {
        label: "Chờ thanh toán",
        href: "/dashboard/nhap-hang/cho-thanh-toan",
      },
      { label: "Đang nhập kho", href: "/dashboard/nhap-hang/dang-nhap-kho" },
      { label: "Đã nhập kho", href: "/dashboard/nhap-hang/da-nhap-kho" },
    ],
    id: "3",
  },
  {
    label: "Nhập hàng",
    href: "/dashboard/nhap-hang",
    icon: <Image src="/export.png" width={20} height={20} alt="return" />,
    id: "4",
  },
  {
    label: "Xuất hàng",
    href: "/dashboard/xuat-hang",
    icon: <Image src="/export.png" width={20} height={20} alt="return" />,
    id: "5",
  },
  {
    label: "Xuất hàng",
    icon: <Image src="/import.png" width={20} height={20} alt="return" />,
    dropdownItems: [
      { label: "Chưa in", href: "/dashboard/xuat-hang/chua-in" },
      { label: "Đã in", href: "/dashboard/xuat-hang/da-in" },
    ],
    id: "6",
  },
  {
    label: "Công nợ",
    href: "/dashboard/cong-no",
    icon: <RiMoneyDollarCircleFill />,
    id: "7",
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
    id: "8",
  },
  {
    label: "Hàng tồn",
    icon: <FaBox />,
    dropdownItems: [
      { label: "Còn hạn", href: "/dashboard/hang-ton/con-han" },
      { label: "Sắp hết hạn", href: "/dashboard/hang-ton/sap-het-han" },
      { label: "Hết hạn", href: "/dashboard/hang-ton/het-han" },
    ],
    id: "9",
  },

  { label: "Đối tác", href: "/dashboard/doi-tac", icon: <FaUser />, id: "10" },
  {
    label: "Hệ thống",
    icon: <FaCog />,
    dropdownItems: [
      { label: "Logging", href: "/dashboard/logging" },
      { label: "Back-up", href: "/dashboard/back-up" },
    ],
    id: "11",
  },

  {
    label: "Người dùng",
    icon: <FaUser />,
    dropdownItems: [
      { label: "Đang hoạt động", href: "/dashboard/account/dang-hoat-dong" },
      {
        label: "Ngừng hoạt động",
        href: "/dashboard/account/ngung-hoat-dong",
      },
    ],
    id: "12",
  },
  {
    label: "Tài khoản",
    href: "/dashboard/account/edit",
    icon: <FaLock />,
    id: "13",
  },
];

const sidebarItemsForRole = {
  admin: [
    { label: "Trang chủ", href: "/dashboard", icon: <FaHome /> },
    { label: "Sản phẩm", href: "/dashboard/products", icon: <FaBox /> },
    {
      label: "Nhập hàng",
      icon: <Image src="/import.png" width={20} height={20} alt="return" />,
      dropdownItems: [
        {
          label: "Chờ thanh toán",
          href: "/dashboard/nhap-hang/cho-thanh-toan",
        },
        { label: "Đang nhập kho", href: "/dashboard/nhap-hang/dang-nhap-kho" },
        { label: "Đã nhập kho", href: "/dashboard/nhap-hang/da-nhap-kho" },
      ],
    },
    {
      label: "Xuất hàng",
      href: "/dashboard/xuat-hang",
      icon: <Image src="/export.png" width={20} height={20} alt="return" />,
    },
    {
      label: "Công nợ",
      href: "/dashboard/cong-no",
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
        { label: "Sắp hết hạn", href: "/dashboard/hang-ton/sap-het-han" },
        { label: "Hết hạn", href: "/dashboard/hang-ton/het-han" },
      ],
    },

    { label: "Đối tác", href: "/dashboard/doi-tac", icon: <FaUser /> },
    {
      label: "Hệ thống",
      icon: <FaCog />,
      dropdownItems: [
        { label: "Logging", href: "/dashboard/logging" },
        { label: "Back-up", href: "/dashboard/back-up" },
      ],
    },

    {
      label: "Người dùng",
      icon: <FaUser />,
      dropdownItems: [
        { label: "Đang hoạt động", href: "/dashboard/account/dang-hoat-dong" },
        {
          label: "Ngừng hoạt động",
          href: "/dashboard/account/ngung-hoat-dong",
        },
      ],
    },
    {
      label: "Tài khoản",
      href: "/dashboard/account/edit",
      icon: <FaLock />,
    },
  ],

  ketoan: [
    {
      label: "Nhập hàng",
      href: "/dashboard/nhap-hang",
      icon: <Image src="/export.png" width={20} height={20} alt="return" />,
    },
    {
      label: "Xuất hàng",
      icon: <Image src="/import.png" width={20} height={20} alt="return" />,
      dropdownItems: [
        { label: "Chưa in", href: "/dashboard/xuat-hang/chua-in" },
        { label: "Đã in", href: "/dashboard/xuat-hang/da-in" },
      ],
    },

    {
      label: "Hàng tồn",
      icon: <Image src="/import.png" width={20} height={20} alt="return" />,
      dropdownItems: [
        {
          label: "Còn hạn",
          href: "/dashboard/hang-ton/con-han",
        },
        { label: "Hết hạn", href: "/dashboard/hang-ton/het-han" },
      ],
    },
    { label: "Tài khoản", href: "/dashboard/account/edit", icon: <FaBox /> },
  ],

  nguoivanchuyen: [
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

    { label: "Tài khoản", href: "/dashboard/account/edit", icon: <FaUser /> },
  ],
};

const sidebarItems: SidebarItem[] = [
  { label: "Trang chủ", href: "/dashboard", icon: <FaHome /> },
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
    href: "/dashboard/xuat-hang",
    icon: <Image src="/export.png" width={20} height={20} alt="return" />,
  },
  {
    label: "Công nợ",
    href: "/dashboard/cong-no",
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

const Sidebar: React.FC = async () => {
  const session = await auth();
  const user = await getUserByEmail(
    session?.user?.email ? session?.user?.email : ""
  );

  // Example permissions based on roles
  const userPermissions =
    user.role === "admin"
      ? [1, 2, 3, 5, 7, 8, 9, 10, 11, 12, 13]
      : user.role === "kế toán"
      ? [4, 6, 9, 13]
      : user.role === "người vận chuyển"
      ? [8, 13]
      : [];

  return (
    <div style={{ position: "fixed" }}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          Che<span>Que</span>Pot
        </div>
        <nav>
          <ul className={styles.navList}>
            {permission
              .filter((item) => userPermissions.includes(Number(item.id)))
              .map((item, index) => (
                <li key={index} className={styles.navItem}>
                  {item.href ? (
                    <a href={item.href} className={styles.navLink1}>
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  ) : item.dropdownItems ? (
                    <NavBar {...item} />
                  ) : null}
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

// import { JSX } from "react";
// import styles from "styles/Sidebar.module.css";
// import {
//   FaHome,
//   FaBox,
//   FaTruck,
//   FaUser,
//   FaCog,
//   FaSignOutAlt,
//   FaTruckMoving,
//   FaFileImport,
//   FaFileExport,
//   FaLock,
// } from "react-icons/fa";
// import { auth, signOut } from "@/auth";
// import Image from "next/image";
// import { PowerIcon } from "@heroicons/react/24/outline";
// import NavBar from "@/app/ui/navbar";
// import { RiMoneyDollarCircleFill } from "react-icons/ri";
// import { getUserByEmail } from "@/app/lib/data";

// type DropdownItem = {
//   label: string;
//   href: string;
// };

// type SidebarItem = {
//   label: string;
//   href?: string;
//   icon: JSX.Element;
//   dropdownItems?: DropdownItem[];
// };

// //perm admin [1,2,3,5,7,8,9,10,11,12,12]
// //perm ketoan [4,6,9,13]
// //perm nguoivanchuyen[8,13]

// const permission = [
//   { label: "Trang chủ", href: "/dashboard", icon: <FaHome />, id: "1" },
//   { label: "Sản phẩm", href: "/dashboard/products", icon: <FaBox />, id: "2" },
//   {
//     label: "Nhập hàng",
//     icon: <Image src="/import.png" width={20} height={20} alt="return" />,
//     dropdownItems: [
//       {
//         label: "Chờ thanh toán",
//         href: "/dashboard/nhap-hang/cho-thanh-toan",
//       },
//       { label: "Đang nhập kho", href: "/dashboard/nhap-hang/dang-nhap-kho" },
//       { label: "Đã nhập kho", href: "/dashboard/nhap-hang/da-nhap-kho" },
//     ],
//     id: "3",
//   },
//   {
//     label: "Nhập hàng",
//     href: "/dashboard/nhap-hang",
//     icon: <Image src="/export.png" width={20} height={20} alt="return" />,
//     id: "4",
//   },
//   {
//     label: "Xuất hàng",
//     href: "/dashboard/xuat-hang",
//     icon: <Image src="/export.png" width={20} height={20} alt="return" />,
//     id: "5",
//   },
//   {
//     label: "Xuất hàng",
//     icon: <Image src="/import.png" width={20} height={20} alt="return" />,
//     dropdownItems: [
//       { label: "Chưa in", href: "/dashboard/xuat-hang/chua-in" },
//       { label: "Đã in", href: "/dashboard/xuat-hang/da-in" },
//     ],
//     id: "6",
//   },
//   {
//     label: "Công nợ",
//     href: "/dashboard/cong-no",
//     icon: <RiMoneyDollarCircleFill />,
//     id: "7",
//   },
//   {
//     label: "Vận chuyển",
//     icon: <FaTruckMoving />,
//     dropdownItems: [
//       {
//         label: "Đang vận chuyển",
//         href: "/dashboard/van-chuyen/dang-van-chuyen",
//       },
//       { label: "Đã vận chuyển", href: "/dashboard/van-chuyen/da-van-chuyen" },
//     ],
//     id: "8",
//   },
//   {
//     label: "Hàng tồn",
//     icon: <FaBox />,
//     dropdownItems: [
//       { label: "Còn hạn", href: "/dashboard/hang-ton/con-han" },
//       { label: "Sắp hết hạn", href: "/dashboard/hang-ton/sap-het-han" },
//       { label: "Hết hạn", href: "/dashboard/hang-ton/het-han" },
//     ],
//     id: "9",
//   },

//   { label: "Đối tác", href: "/dashboard/doi-tac", icon: <FaUser />, id: "10" },
//   {
//     label: "Hệ thống",
//     icon: <FaCog />,
//     dropdownItems: [
//       { label: "Logging", href: "/dashboard/logging" },
//       { label: "Back-up", href: "/dashboard/back-up" },
//     ],
//     id: "11",
//   },

//   {
//     label: "Người dùng",
//     icon: <FaUser />,
//     dropdownItems: [
//       { label: "Đang hoạt động", href: "/dashboard/account/dang-hoat-dong" },
//       {
//         label: "Ngừng hoạt động",
//         href: "/dashboard/account/ngung-hoat-dong",
//       },
//     ],
//     id: "12",
//   },
//   {
//     label: "Tài khoản",
//     href: "/dashboard/account/edit",
//     icon: <FaLock />,
//     id: "13",
//   },
// ];

// const sidebarItemsForRole = {
//   admin: [
//     { label: "Trang chủ", href: "/dashboard", icon: <FaHome /> },
//     { label: "Sản phẩm", href: "/dashboard/products", icon: <FaBox /> },
//     {
//       label: "Nhập hàng",
//       icon: <Image src="/import.png" width={20} height={20} alt="return" />,
//       dropdownItems: [
//         {
//           label: "Chờ thanh toán",
//           href: "/dashboard/nhap-hang/cho-thanh-toan",
//         },
//         { label: "Đang nhập kho", href: "/dashboard/nhap-hang/dang-nhap-kho" },
//         { label: "Đã nhập kho", href: "/dashboard/nhap-hang/da-nhap-kho" },
//       ],
//     },
//     {
//       label: "Xuất hàng",
//       href: "/dashboard/xuat-hang",
//       icon: <Image src="/export.png" width={20} height={20} alt="return" />,
//     },
//     {
//       label: "Công nợ",
//       href: "/dashboard/cong-no",
//       icon: <RiMoneyDollarCircleFill />,
//     },
//     {
//       label: "Vận chuyển",
//       icon: <FaTruckMoving />,
//       dropdownItems: [
//         {
//           label: "Đang vận chuyển",
//           href: "/dashboard/van-chuyen/dang-van-chuyen",
//         },
//         { label: "Đã vận chuyển", href: "/dashboard/van-chuyen/da-van-chuyen" },
//       ],
//     },
//     {
//       label: "Hàng tồn",
//       icon: <FaBox />,
//       dropdownItems: [
//         { label: "Còn hạn", href: "/dashboard/hang-ton/con-han" },
//         { label: "Sắp hết hạn", href: "/dashboard/hang-ton/sap-het-han" },
//         { label: "Hết hạn", href: "/dashboard/hang-ton/het-han" },
//       ],
//     },

//     { label: "Đối tác", href: "/dashboard/doi-tac", icon: <FaUser /> },
//     {
//       label: "Hệ thống",
//       icon: <FaCog />,
//       dropdownItems: [
//         { label: "Logging", href: "/dashboard/logging" },
//         { label: "Back-up", href: "/dashboard/back-up" },
//       ],
//     },

//     {
//       label: "Người dùng",
//       icon: <FaUser />,
//       dropdownItems: [
//         { label: "Đang hoạt động", href: "/dashboard/account/dang-hoat-dong" },
//         {
//           label: "Ngừng hoạt động",
//           href: "/dashboard/account/ngung-hoat-dong",
//         },
//       ],
//     },
//     {
//       label: "Tài khoản",
//       href: "/dashboard/account/edit",
//       icon: <FaLock />,
//     },
//   ],

//   ketoan: [
//     {
//       label: "Nhập hàng",
//       href: "/dashboard/nhap-hang",
//       icon: <Image src="/export.png" width={20} height={20} alt="return" />,
//     },
//     {
//       label: "Xuất hàng",
//       icon: <Image src="/import.png" width={20} height={20} alt="return" />,
//       dropdownItems: [
//         { label: "Chưa in", href: "/dashboard/xuat-hang/chua-in" },
//         { label: "Đã in", href: "/dashboard/xuat-hang/da-in" },
//       ],
//     },

//     {
//       label: "Hàng tồn",
//       icon: <Image src="/import.png" width={20} height={20} alt="return" />,
//       dropdownItems: [
//         {
//           label: "Còn hạn",
//           href: "/dashboard/hang-ton/con-han",
//         },
//         { label: "Hết hạn", href: "/dashboard/hang-ton/het-han" },
//       ],
//     },
//     { label: "Tài khoản", href: "/dashboard/account/edit", icon: <FaBox /> },
//   ],

//   nguoivanchuyen: [
//     {
//       label: "Vận chuyển",
//       icon: <FaTruckMoving />,
//       dropdownItems: [
//         {
//           label: "Đang vận chuyển",
//           href: "/dashboard/van-chuyen/dang-van-chuyen",
//         },
//         { label: "Đã vận chuyển", href: "/dashboard/van-chuyen/da-van-chuyen" },
//       ],
//     },

//     { label: "Tài khoản", href: "/dashboard/account/edit", icon: <FaUser /> },
//   ],
// };

// const sidebarItems: SidebarItem[] = [
//   { label: "Trang chủ", href: "/dashboard", icon: <FaHome /> },
//   { label: "Sản phẩm", href: "/dashboard/products", icon: <FaBox /> },
//   {
//     label: "Nhập hàng",
//     icon: <Image src="/import.png" width={20} height={20} alt="return" />,
//     dropdownItems: [
//       { label: "Chờ thanh toán", href: "/dashboard/nhap-hang/cho-thanh-toan" },
//       { label: "Đang nhập kho", href: "/dashboard/nhap-hang/dang-nhap-kho" },
//       { label: "Đã nhập kho", href: "/dashboard/nhap-hang/da-nhap-kho" },
//     ],
//   },
//   {
//     label: "Xuất hàng",
//     href: "/dashboard/xuat-hang",
//     icon: <Image src="/export.png" width={20} height={20} alt="return" />,
//   },
//   {
//     label: "Công nợ",
//     href: "/dashboard/cong-no",
//     icon: <RiMoneyDollarCircleFill />,
//   },
//   {
//     label: "Vận chuyển",
//     icon: <FaTruckMoving />,
//     dropdownItems: [
//       {
//         label: "Đang vận chuyển",
//         href: "/dashboard/van-chuyen/dang-van-chuyen",
//       },
//       { label: "Đã vận chuyển", href: "/dashboard/van-chuyen/da-van-chuyen" },
//     ],
//   },
//   {
//     label: "Hàng tồn",
//     icon: <FaBox />,
//     dropdownItems: [
//       { label: "Còn hạn", href: "/dashboard/hang-ton/con-han" },
//       { label: "Hết hạn", href: "/dashboard/hang-ton/het-han" },
//     ],
//   },

//   { label: "Đối tác", href: "/dashboard/doi-tac", icon: <FaUser /> },
//   {
//     label: "Hệ thống",
//     icon: <FaCog />,
//     dropdownItems: [
//       { label: "Logging", href: "/system/option1" },
//       { label: "Back-up", href: "/system/option2" },
//     ],
//   },
//   { label: "Tài khoản", href: "/account", icon: <FaUser /> },
// ];

// const Sidebar: React.FC = async () => {
//   const session = await auth();
//   const user = await getUserByEmail(
//     session?.user?.email ? session?.user?.email : ""
//   );
//   return (
//     <div style={{ position: "fixed" }}>
//       <div className={styles.sidebar}>
//         <div className={styles.logo}>
//           Che<span>Que</span>Pot
//         </div>
//         <nav>
//           <ul className={styles.navList}>
//             {user.role === "admin"
//               ? sidebarItemsForRole.admin.map((item, index) => (
//                   <li key={index} className={styles.navItem}>
//                     {item.href ? (
//                       <a href={item.href} className={styles.navLink1}>
//                         {item.icon}
//                         <span>{item.label}</span>
//                       </a>
//                     ) : (
//                       <NavBar {...item} />
//                     )}
//                   </li>
//                 ))
//               : null}

//             {user.role === "kế toán"
//               ? sidebarItemsForRole.ketoan.map((item, index) => (
//                   <li key={index} className={styles.navItem}>
//                     {item.href ? (
//                       <a href={item.href} className={styles.navLink1}>
//                         {item.icon}
//                         <span>{item.label}</span>
//                       </a>
//                     ) : (
//                       <NavBar {...item} />
//                     )}
//                   </li>
//                 ))
//               : null}

//             {user.role === "người vận chuyển"
//               ? sidebarItemsForRole.nguoivanchuyen.map((item, index) => (
//                   <li key={index} className={styles.navItem}>
//                     {item.href ? (
//                       <a href={item.href} className={styles.navLink1}>
//                         {item.icon}
//                         <span>{item.label}</span>
//                       </a>
//                     ) : (
//                       <NavBar {...item} />
//                     )}
//                   </li>
//                 ))
//               : null}
//           </ul>
//         </nav>
//         <form
//           className={styles.logout}
//           action={async () => {
//             "use server";
//             await signOut();
//           }}
//         >
//           <button className={styles.logout}>
//             <FaSignOutAlt />
//             <span>Logout</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
