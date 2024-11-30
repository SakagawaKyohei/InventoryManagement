import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  DoiTac,
  DonDatHang,
  DonXuatHang,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Product,
  Revenue,
  TonKho,
  Users,
  VanChuyen,
} from './definitions';
import { formatCurrency } from './utils';
import { UUID } from 'crypto';



export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}



export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchProductsPages(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM product
    WHERE
      name ILIKE ${`%${query}%`} OR
      name ILIKE ${`%${query}%`} OR
      company::text ILIKE ${`%${query}%`} 

  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchProductById(id: string) {
  try {
    const data = await sql<Product>`
      SELECT
       *
      FROM product
      WHERE product.id = ${id};
    `;

    const product = data.rows.map((product) => ({
      ...product,
    }));

    return product[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}


export async function fetchPartnerById(id: string) {
  try {
    const data = await sql<DoiTac>`
      SELECT
       *
      FROM doitac
      WHERE doitac.id = ${id};
    `;

    const doitac = data.rows.map((doitac) => ({
      ...doitac,
    }));

    return doitac[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchDonDatHangById(id: string) {
  try {
    const data = await sql<DonDatHang>`
      SELECT
       *
      FROM dondathang
      WHERE dondathang.id = ${id};
    `;

    const dondathang = data.rows.map((dondathang) => ({
      ...dondathang,
    }));

    return dondathang[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchDonXuatHangById(id: string) {
  try {
    const data = await sql<DonXuatHang>`
      SELECT
       *
      FROM donxuathang
      WHERE donxuathang.id = ${id};
    `;

    const dondathang = data.rows.map((dondathang) => ({
      ...dondathang,
    }));

    return dondathang[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchVanChuyenById(id: string) {
  try {
    const data = await sql<VanChuyen>`
      SELECT *
      FROM vanchuyen
      WHERE vanchuyen.id_don_hang = ${id};
    `;

    const vanchuyen = data.rows.map((vanchuyen) => ({
      ...vanchuyen,
    }));

    return vanchuyen[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}


export async function fetchUserByID(id: number) {
  try {
    const data = await sql<Users>`
      SELECT
       *
      FROM users
      WHERE users.manv = ${id};
    `;

    const user= data.rows.map((user) => ({
      ...user,
    }));

    return user[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}


export async function getOrderPrice(id:string) {
  try {
    const data = await sql`
    SELECT SUM(
      (elem->>'price')::NUMERIC * (elem->>'quantity')::NUMERIC
    ) AS total_price
    FROM (
    SELECT jsonb_array_elements(
          ('[' || string_agg(
              REGEXP_REPLACE(jsonb_item::TEXT, '"\\{', '{', 'g'), ','
          ) || ']'
          )::JSONB
      ) AS elem
    FROM dondathang, 
    unnest(product) AS jsonb_item -- Tách từng phần tử của JSONB[]
    WHERE id = ${id} -- Chọn dòng cụ thể (nếu cần)
    ) subquery;
    `;

    return data.rows[0]; // Trả về đối tượng người dùng hoặc undefined
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user by email.');
  }
}




//forgot password
// Lấy người dùng theo email
export async function getUserByEmail(email: string) {
  try {
    const data = await sql`
      SELECT *
      FROM users
      WHERE email = ${email}
    `;

    return data.rows[0]; // Trả về đối tượng người dùng hoặc undefined
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user by email.');
  }
}

// Lấy mã thông báo đặt lại theo mã
export async function getResetToken(token: string) {
  try {
    const data = await sql`
      SELECT user_id, expiry
      FROM reset_tokens
      WHERE token = ${token}
    `;

    return data.rows[0]; // Trả về đối tượng thông tin mã thông báo hoặc undefined
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reset token.');
  }
}


export async function fetchPartner() {
  try {
    const data = await sql<DoiTac>`
      SELECT *
      FROM doitac
      ORDER BY name ASC
    `;

    const doitac= data.rows;
    return doitac;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all partner.');
  }
}
export async function fetchNguoiVanChuyen() {
  try {
    const data = await sql<Users>`
      SELECT *
      FROM users
      where role='người vận chuyển'
    `;

    const product = data.rows;
    return product;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch nguoi van chuyen.');
  }
}


export async function fetchProduct() {
  try {
    const data = await sql<Product>`
      SELECT *
      FROM product
      ORDER BY id ASC
    `;

    const product = data.rows;
    return product;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  }
}

export async function fetchConHan(query: string, currentPage: number, itemsPerPage: number) {
  try {
    const offset = (currentPage - 1) * itemsPerPage;

    const data = await sql<TonKho & Product>`
    SELECT tonkho.*, product.*
    FROM tonkho
    JOIN product ON tonkho.ma_hang = product.id
    WHERE tonkho.han_su_dung >= NOW() AND
    (
        tonkho.ma_hang ILIKE ${`%${query}%`} OR
        product.name ILIKE ${`%${query}%`} OR
        tonkho.so_luong::TEXT ILIKE ${`%${query}%`} OR
        product.sell_price::TEXT ILIKE ${`%${query}%`} OR
        product.company ILIKE ${`%${query}%`} OR
        tonkho.han_su_dung::TEXT ILIKE ${`%${query}%`} OR
        tonkho.ngay_nhap::TEXT ILIKE ${`%${query}%`}
    )
   order by product.name asc
    LIMIT ${itemsPerPage} OFFSET ${offset}

    `;

    const result = data.rows;
    return result;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch filtered tonkho data.');
  }
}

export async function fetchHetHan(query: string, currentPage: number, itemsPerPage: number) {
  try {
    const offset = (currentPage - 1) * itemsPerPage;

    const data = await sql<TonKho & Product>`
    SELECT tonkho.*, product.*
    FROM tonkho
    JOIN product ON tonkho.ma_hang = product.id
    WHERE tonkho.han_su_dung < NOW() AND
    (
        tonkho.ma_hang ILIKE ${`%${query}%`} OR
        product.name ILIKE ${`%${query}%`} OR
        tonkho.so_luong::text ILIKE ${`%${query}%`} OR
        product.sell_price::text ILIKE ${`%${query}%`} OR
        product.company ILIKE ${`%${query}%`} 
    )
    order by tonkho.ma_don_hang asc
    LIMIT ${itemsPerPage} OFFSET ${offset}

    `;

    const result = data.rows;
    return result;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch filtered tonkho data.');
  }
}

export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<Product>`
      SELECT *
      FROM product
      WHERE
      name ILIKE ${`%${query}%`} OR
      id ILIKE ${`%${query}%`} OR
      company::text ILIKE ${`%${query}%`} 
      ORDER BY id ASC
      LIMIT ${item_per_page} OFFSET ${offset}
    `;

    const product = data.rows;
    return product;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}

export async function fetchFilteredDonDatHang(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<DonDatHang>`
      SELECT *
      FROM dondathang
      WHERE
      id ILIKE ${`%${query}%`} OR
      company::text ILIKE ${`%${query}%`} OR
      product::text ILIKE ${`%${query}%`} 
      ORDER BY 
      status asc,
      id ASC
      LIMIT ${item_per_page} OFFSET ${offset}
    `;

    const dondathang = data.rows;
    return dondathang;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}


export async function fetchFilteredXuatHang(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<DonXuatHang&DoiTac>`
SELECT *
FROM donxuathang
JOIN doitac ON doitac.id = donxuathang.ma_doi_tac
WHERE
  (doitac.id::text ILIKE '%' || ${query} || '%' OR
   donxuathang.ma_doi_tac::text ILIKE '%' || ${query} || '%' OR
   donxuathang.status::text ILIKE '%' || ${query} || '%')
ORDER BY 
  donxuathang.status ASC,
  donxuathang.id ASC
LIMIT ${item_per_page} OFFSET ${offset};

    `;

    const dondathang = data.rows;
    return dondathang;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}
export async function fetchFilteredDoiTac(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<DoiTac>`
      SELECT *
      FROM doitac
      WHERE
      id ILIKE ${`%${query}%`} OR
      email::text ILIKE ${`%${query}%`} OR
      dia_chi::text ILIKE ${`%${query}%`} OR
      name::text ILIKE ${`%${query}%`} OR
      sdt::text ILIKE ${`%${query}%`} 
      ORDER BY 
      id ASC
      LIMIT ${item_per_page} OFFSET ${offset}
    `;

    const dondathang = data.rows;
    return dondathang;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}
export async function fetchFilteredVanChuyen(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<VanChuyen>`
    SELECT * 
    FROM vanchuyen
    WHERE 
        (id_don_hang ILIKE ${`%${query}%`} 
        OR status ILIKE ${`%${query}%`} 
        OR nhapxuat ILIKE ${`%${query}%`} 
        OR kho_xuat_hang ILIKE ${`%${query}%`} 
        OR dia_chi_kho ILIKE ${`%${query}%`})
        AND status = 'đang vận chuyển'
    ORDER BY id_don_hang ASC
    LIMIT ${item_per_page} OFFSET ${offset};

    `;

    const vanchuyen = data.rows;
    return vanchuyen;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}

export async function fetchFilteredVanChuyenDone(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<VanChuyen>`
    SELECT * 
    FROM vanchuyen
    WHERE 
        (id_don_hang ILIKE ${`%${query}%`} 
        OR status ILIKE ${`%${query}%`} 
        OR nhapxuat ILIKE ${`%${query}%`} 
        OR kho_xuat_hang ILIKE ${`%${query}%`} 
        OR dia_chi_kho ILIKE ${`%${query}%`})
        AND status = 'Đã vận chuyển'
    ORDER BY id_don_hang ASC
    LIMIT ${item_per_page} OFFSET ${offset};

    `;

    const vanchuyen = data.rows;
    return vanchuyen;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}

export async function fetchFilteredPendingDonDatHang(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<DonDatHang>`
    SELECT *
    FROM dondathang
    WHERE
        status = 'pending' AND
        (
            id ILIKE ${`%${query}%`} OR
            company::text ILIKE ${`%${query}%`} OR
            product::text ILIKE ${`%${query}%`}
        )
    ORDER BY
        id ASC
    LIMIT ${item_per_page} OFFSET ${offset};
    `;

    const pendingdondathang = data.rows;
    return pendingdondathang;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}

export async function fetchPendingDonDatHangPages(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM dondathang
    WHERE
        status = 'pending' AND
        (
            id ILIKE ${`%${query}%`} OR
            company::text ILIKE ${`%${query}%`} OR
            product::text ILIKE ${`%${query}%`}
        )
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}


export async function fetchConHanPages(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tonkho
    JOIN product ON tonkho.ma_hang = product.id
    WHERE tonkho.han_su_dung >= NOW() AND
    (
        tonkho.ma_hang ILIKE ${`%${query}%`} OR
        product.name ILIKE ${`%${query}%`} OR
        tonkho.so_luong::text ILIKE ${`%${query}%`} OR
        product.sell_price::text ILIKE ${`%${query}%`} OR
        product.company ILIKE ${`%${query}%`} 
    )
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchHetHanPages(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tonkho
    JOIN product ON tonkho.ma_hang = product.id
    WHERE tonkho.han_su_dung < NOW() AND
    (
        tonkho.ma_hang ILIKE ${`%${query}%`} OR
        product.name ILIKE ${`%${query}%`} OR
        tonkho.so_luong::text ILIKE ${`%${query}%`} OR
        product.sell_price::text ILIKE ${`%${query}%`} OR
        product.company ILIKE ${`%${query}%`} 
    )
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchVanChuyenPage(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM vanchuyen
    WHERE 
        (id_don_hang ILIKE ${`%${query}%`} 
        OR status ILIKE ${`%${query}%`} 
        OR nhapxuat ILIKE ${`%${query}%`} 
        OR kho_xuat_hang ILIKE ${`%${query}%`} 
        OR dia_chi_kho ILIKE ${`%${query}%`})
        AND status = 'đang vận chuyển'
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchVanChuyenDonePage(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM vanchuyen
    WHERE 
        (id_don_hang ILIKE ${`%${query}%`} 
        OR status ILIKE ${`%${query}%`} 
        OR nhapxuat ILIKE ${`%${query}%`} 
        OR kho_xuat_hang ILIKE ${`%${query}%`} 
        OR dia_chi_kho ILIKE ${`%${query}%`})
        AND status = 'Đã vận chuyển'
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchDonDatHangPages(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
      FROM dondathang
      WHERE
        id ILIKE ${`%${query}%`} OR
        company ILIKE ${`%${query}%`} OR
        product::text ILIKE ${`%${query}%`} OR
        status::text ILIKE ${`%${query}%`} OR
        ngay_dat::text ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}


export async function fetchDaNhapHang(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<VanChuyen & DonDatHang>`SELECT *
    FROM vanchuyen
    JOIN dondathang
    ON vanchuyen.id_don_hang = dondathang.id
    WHERE vanchuyen.status = 'Đã vận chuyển'
      AND (
      vanchuyen.id_don_hang ILIKE ${`%${query}%`} OR
      vanchuyen.kho_xuat_hang ILIKE ${`%${query}%`} OR
      dondathang.manv::text ILIKE ${`%${query}%`} OR
      vanchuyen.dia_chi_kho::text ILIKE ${`%${query}%`} 
      )
      order by vanchuyen.id_don_hang       
      LIMIT ${item_per_page} OFFSET ${offset};

  `;

    const vanchuyen = data.rows;
    return vanchuyen;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}

export async function fetchDangNhapHang(
  query: string,
  currentPage: number,
  item_per_page:number
) {
  const offset = (currentPage - 1) * item_per_page;

  try {
    const data = await sql<VanChuyen&DonDatHang>`SELECT *
    FROM vanchuyen
    JOIN dondathang
    ON vanchuyen.id_don_hang = dondathang.id
    WHERE vanchuyen.status = 'đang vận chuyển'
      AND (
      vanchuyen.id_don_hang ILIKE ${`%${query}%`} OR
      vanchuyen.kho_xuat_hang ILIKE ${`%${query}%`} OR
      dondathang.manv::text ILIKE ${`%${query}%`} OR
      vanchuyen.dia_chi_kho::text ILIKE ${`%${query}%`} 
      )
      order by vanchuyen.id_don_hang 
      LIMIT ${item_per_page} OFFSET ${offset};
  `;

    const vanchuyen = data.rows;
    return vanchuyen;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all product.');
  } 
}


export async function fetchDangNhapPage(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
      FROM vanchuyen
      JOIN dondathang
      ON vanchuyen.id_don_hang = dondathang.id
      WHERE vanchuyen.status = 'đang vận chuyển'
        AND (
        vanchuyen.id_don_hang ILIKE ${`%${query}%`} OR
        vanchuyen.kho_xuat_hang ILIKE ${`%${query}%`} OR
        dondathang.manv::text ILIKE ${`%${query}%`} OR
        vanchuyen.dia_chi_kho::text ILIKE ${`%${query}%`} 
      )
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}



export async function fetchDaNhapPage(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
      FROM vanchuyen
      JOIN dondathang
      ON vanchuyen.id_don_hang = dondathang.id
      WHERE vanchuyen.status = 'Đã vận chuyển'
        AND (
        vanchuyen.id_don_hang ILIKE ${`%${query}%`} OR
        vanchuyen.kho_xuat_hang ILIKE ${`%${query}%`} OR
        dondathang.manv::text ILIKE ${`%${query}%`} OR
        vanchuyen.dia_chi_kho::text ILIKE ${`%${query}%`} 
      )
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchDoiTacPages(query: string,item_per_page:number) {
  try {
    const count = await sql`SELECT COUNT(*)
      FROM doitac
      WHERE
      id ILIKE ${`%${query}%`} OR
      email::text ILIKE ${`%${query}%`} OR
      dia_chi::text ILIKE ${`%${query}%`} OR
      name::text ILIKE ${`%${query}%`} OR
      sdt::text ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / item_per_page);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}