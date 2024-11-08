// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Users = {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  role: string;
  bank:string;
  stk: string;
  ngaysinh:string;
  sdt:string;
  cccd:string;
  diachi:string;
};

export type Product = {
  id: string;
  name: string;
  buy_price:number;
  sell_price:number;
  company:string;
  img_product:string
  description:string
};

export type VanChuyen={
  id:string
  id_don_hang: string
  status:string;
  nhapxuat:string
  start_time:string;
  done_time: string;
  kho_xuat_hang: string;
  dia_chi_kho:string  
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};
export type DonDatHang = {
  id: string;
  id_nguoi_van_chuyen: string;
  company: string;
  han_su_dung:string;
  product:any;
  total:number;
};
export type DonXuatHang = {
  id: string;
  ma_doi_tac: string;
  id_nguoi_van_chuyen: string;
  start_time: string;
  done_time: string;
  product:string;
  total:number;
  status: string
};

export type DoiTac = {
  id: string;
  name: string;
  email: string;
  sdt: string;
  dia_chi:string
  ao_nuoi:any
};

export type AoNuoi= {
  // id: string;
  // name: string;
  // email: string;
  // sdt: string;
  // dia_chi:string
  // ao_nuoi:
};

export type TonKho = {
  ma_don_hang:string;
  ma_hang:string;
  han_su_dung:string;
  ngay_nhap:string;
  so_luong:number;
};

export type Logging = {
  user_id:string;
  time:string;
  action:string;
};
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
