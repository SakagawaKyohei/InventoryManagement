'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import { DoiTac,DonXuatHang, Product, TonKho, Users } from './definitions';
import supabase from "../../app/supabase";
import { getOrderPrice } from './data';

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
 
 
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount ;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } =CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount ;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.error(error); // Log the error
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    console.error(error); // Log the error
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}




export async function uploadImage(img: Blob,imgid:string) {

  try {
    const { data, error } = await supabase.storage
      .from("avt") // Giả sử "avt" là tên bucket trong Supabase
      .upload(`public/${imgid}.jpg`, img);  // Chỉ định đường dẫn và phần mở rộng file

    if (error) {
      throw error; // Nếu có lỗi thì ném lỗi ra
    }

    // Trả về đường dẫn đầy đủ của ảnh vừa upload
    return data;  // Data sẽ có id, path, fullPath
  } catch (error) {
    console.error('Lỗi khi tải ảnh lên:', error);
    throw new Error('Không thể tải ảnh lên');
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Tài khoản hoặc mật khẩu không đúng.';
        default:
          return 'Tài khoản hoặc mật khẩu không đúng.';
      }
    }
    throw error;
  }
}

export async function createAccount(email:string,name:string, password:string,status:string) {
 
  // Insert data into the database
  const hashedPassword=await bcrypt.hash(password, 10);
  
  try {
    await sql`
      INSERT INTO users (name, email, password, status)
      VALUES (${name}, ${email}, ${hashedPassword},${status})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Account.',
    };
  }
} 

export async function AddUser(user:Users) {
  try {
    let permissionss: number[] = [];

    switch (user.role) {
      case 'admin':
        permissionss = [1, 2, 3, 5, 7, 8, 9, 10, 11, 12, 12];
        break;
      case 'ketoan':
        permissionss = [4, 6, 9, 13];
        break;
      case 'nguoivanchuyen':
        permissionss = [8, 13];
        break;
      default:
        throw new Error(user.role);
    }
    await sql`
      INSERT INTO users (name,email,password,status, role, bank, stk, ngay_sinh,sdt, cccd,dia_chi)
      VALUES (${user.name},${user.email}, ${user.password},${user.status}, ${user.role},${user.bank}, ${user.stk}, ${user.ngay_sinh},${user.sdt},${user.cccd},${user.dia_chi})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Account.',
    };
  }
}

export async function AddProduct(product: Product, uid: number) {
  try {
    // Insert the product and get the generated ID.
    const result = await sql`
      INSERT INTO product (name, company, buy_price, sell_price, description, img_product)
      VALUES (${product.name}, ${product.company}, ${product.buy_price}, ${product.sell_price}, ${product.description}, ${product.img_product})
      RETURNING id
    `;
    
    // Extract the generated product id.
    const productId = result.rows[0].id; // Assuming result is an array with the first row containing the `id`.
    
    // Now insert the log with the generated product id.
    await sql`
      INSERT INTO logging (time, action, idforlink, user_id)
      VALUES (now(), 'Tạo sản phẩm', ${productId}, ${uid})
    `;
    
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }
}


export async function Soluongbyidhang(id:string) {
  try {
    await sql`
    SELECT SUM(so_luong) AS tong_so_luong
    FROM tonkho
    WHERE ma_hang = ${id};

    `;
    
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Account.',
    };
  }
}

export async function AddDonDatHang(product: Record<string, unknown>, company: string, manv:number) {
  const status = "draft";

  try {
    // Chuyển đối tượng product thành chuỗi JSON và sau đó chuyển thành jsonb
    const productJson = JSON.parse(JSON.stringify(product));

    console.log('Product JSON:', productJson); // Log dữ liệu trước khi gửi vào SQL

    // Bước 1: Kiểm tra xem dondathang có tồn tại không
    const existingOrder = await sql`
      SELECT id, product FROM dondathang
      WHERE company = ${company} AND status = ${status}
      LIMIT 1;
    `;
    
    console.log('Existing Order:', existingOrder); // Log kết quả truy vấn SELECT

    let orderId = existingOrder.rows.length > 0 ? existingOrder.rows[0].id : null;

    if (!orderId) {
      // Bước 2: Nếu không có dondathang nào, tạo mới
      await sql`
        INSERT INTO dondathang (company, product, status, manv)
        VALUES (${company}, ARRAY[${productJson}::jsonb], ${status}, ${manv});
      `;
      // Sau khi tạo, lấy ID của đơn hàng mới để tính toán total
      const newOrder = await sql`
        SELECT id FROM dondathang
        WHERE company = ${company} AND status = ${status}
      `;
      orderId = newOrder.rows[0].id;
    } else {
      // Nếu đơn hàng đã tồn tại, cập nhật sản phẩm mới
      await sql`
        UPDATE dondathang
        SET product = array_append(product, ${productJson}::jsonb)
        WHERE id = ${orderId};
      `;
    }

    // Tính toán tổng giá trị đơn hàng
    const orderPrice = await getOrderPrice(orderId.toString());
    const totalPrice = orderPrice.total_price;

    // Cập nhật giá trị tổng vào cột 'total'
    await sql`
      UPDATE dondathang
      SET total = ${totalPrice}
      WHERE id = ${orderId};
    `;

    return { message: 'DonDatHang created or updated successfully with total price.' };

  } catch (error) {
    console.error('Database error:', error); // Log lỗi để kiểm tra chi tiết
    return {
      message: 'Database Error: Failed to Create or Update DonDatHang.',
    };
  }
}

//them don dat hang trang thai draft

export async function AddDonDatHang1(uid: number) {
  const status = 'draft';  // Correct string assignment with single quotes

  try {
    // Step 1: Update all 'dondathang' records with status 'draft' to 'pending'
    const result = await sql`
      UPDATE dondathang
      SET status = 'pending' 
      WHERE status = ${status}
      RETURNING id;
    `;
    
    // Step 2: If no records are updated, return a message
    if (result.rows.length === 0) {
      return { message: 'No DonDatHang records found with status "draft".' };
    }

    // Step 3: Insert each updated 'dondathang' id into the 'logging' table
    for (const row of result.rows) {
      const updatedId = row.id;
      
      // Step 4: Insert into logging table for each updated record
      await sql`
        INSERT INTO logging (time, action, idforlink, user_id)
        VALUES (now(), 'Tạo đơn đặt hàng', ${updatedId}, ${uid});
      `;
    }
    
    return { message: 'Product added to existing DonDatHang records.' };
  } catch (error) {
    console.error('Database error:', error); // Log the error for debugging
    return {
      message: 'Database Error: Failed to Create or Update DonDatHang.',
    };
  }
}




//them don dat hang trang thai cho thanh toan

export async function CancelDonDatHang() {
  try {

    await sql`
      DELETE FROM dondathang
      WHERE status = 'draft';
    `;

    // If you're using caching or page revalidation:
    // revalidatePath('/product-list'); 

    return { message: 'Đơn hàng đã được hủy thành công.' };
  } catch (error) {
    console.error('Database error:', error);  // Log the error for debugging
    return { message: 'Lỗi cơ sở dữ liệu: Không thể hủy đơn hàng.' };
  }
}


export async function TerminateProcess() {
  try {

    await sql`
    SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE datname = 'neon-yellow-school';
    `;

    // If you're using caching or page revalidation:
    // revalidatePath('/product-list'); 

    return { message: 'Đơn hàng đã được hủy thành công.' };
  } catch (error) {
    console.error('Database error:', error);  // Log the error for debugging
    return { message: 'Lỗi cơ sở dữ liệu: Không thể hủy đơn hàng.' };
  }
}

//them don dat hang trang thai cho thanh toan

export async function ThanhToan( donHangId:string, hanSuDung:string, khoXuatHang:string, diaChi:string,id_nguoi_van_chuyen:string, uid:number ) {
  try {
    // Cập nhật trạng thái đơn hàng thành "paid" và cập nhật ngày hết hạn sử dụng
    await sql`
    UPDATE dondathang
    SET status = 'paid', han_su_dung = ${hanSuDung}
    WHERE id = ${donHangId};
  `;
  
  await sql`
  INSERT INTO logging (time, action, idforlink, user_id)
  VALUES (now(), 'Thanh toán', ${donHangId}, ${uid})
`;

    // Thêm thông tin vào bảng vanchuyen
    await sql`
      INSERT INTO vanchuyen (id_don_hang, start_time, status, kho_xuat_hang, dia_chi_kho,nhapxuat,id_nguoi_van_chuyen)
      VALUES (${donHangId}, CURRENT_TIMESTAMP, 'đang vận chuyển', ${khoXuatHang}, ${diaChi},'Nhập',${id_nguoi_van_chuyen});
    `;

    return { message: 'Đơn hàng đã được thanh toán và vận chuyển.' };
  } catch (error) {
    console.error('Database error:', error);  // Log the error for debugging
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xử lý đơn hàng.' };
  }
}



export async function DaVanChuyen(donHangId: string, uid:number) {
  try {
    // Cập nhật trạng thái đơn hàng trong bảng vanchuyen
    await sql`
      UPDATE vanchuyen
      SET done_time = CURRENT_TIMESTAMP, status = 'Đã vận chuyển'
      WHERE id_don_hang = ${donHangId};
    `;

    // Chèn dữ liệu vào bảng hangton
    await sql`
    INSERT INTO tonkho (ma_don_hang, ma_hang, han_su_dung, so_luong, ngay_nhap)
    SELECT 
        v.id_don_hang AS ma_don_hang,  
        p.value->>'id' AS ma_hang,     
        d.han_su_dung,                  
        (p.value->>'quantity')::int AS so_luong,
        CURRENT_TIMESTAMP AS ngay_nhap
    FROM 
        vanchuyen v
    JOIN 
        dondathang d ON v.id_don_hang = d.id  
    CROSS JOIN LATERAL 
        unnest(d.product) AS p(value)
    WHERE 
        v.id_don_hang = ${donHangId};
    `;

    await sql`
    INSERT INTO logging (time, action, idforlink, user_id)
    VALUES (now(), 'Đã vận chuyển', ${donHangId}, ${uid})
  `;

    return { message: 'Đơn hàng đã được thanh toán và vận chuyển.' };
  } catch (error) {
    console.error('Database error:', error);  // Log the error for debugging
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xử lý đơn hàng.' };
  }
}



export async function DaThanhToan(doitacid: string, donhangid:string, sotien:number) {
  try {
    // Cập nhật trạng thái đơn hàng trong bảng vanchuyen
    await sql`
    UPDATE congno
    SET status = 'Đã thanh toán'
    WHERE donhangid = ${donhangid} AND doitacid = ${doitacid};
    `;

    await sql`
    INSERT INTO doanhthu (month, year, revenue)
    VALUES (EXTRACT(MONTH FROM CURRENT_DATE), EXTRACT(YEAR FROM CURRENT_DATE), ${sotien})
    ON CONFLICT (month, year) 
    DO UPDATE SET revenue = doanhthu.revenue + EXCLUDED.revenue;
    `;



    return { message: 'Đơn hàng đã được thanh toán và vận chuyển.' };
  } catch (error) {
    console.error('Database error:', error);  // Log the error for debugging
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xử lý đơn hàng.' };
  }
}



export async function DaXuat(donHang: DonXuatHang, phuongthuc:string, doitac:DoiTac) {
  try {
    // Cập nhật trạng thái đơn hàng trong bảng vanchuyen
    await sql`
      UPDATE vanchuyen
      SET done_time = CURRENT_TIMESTAMP, status = 'Đã vận chuyển'
      WHERE id_don_hang = ${donHang.id};
    `;

    await sql`
    UPDATE donxuathang
    SET status = 'Đã vận chuyển'
    WHERE id = ${donHang.id};
  `;

  if (phuongthuc=="Chuyển khoản")
  {
      await sql`
      INSERT INTO congno (donhangid, doitacname, doitacid, orderdate, total, status)
      VALUES (${donHang.id}, ${doitac.name}, ${doitac.id}, ${donHang.ngayxuat}, ${donHang.total}, 'Chưa thanh toán')
    `;
  }

  else 
  {
    await sql`
        INSERT INTO doanhthu (month, year, revenue)
    VALUES (EXTRACT(MONTH FROM CURRENT_DATE), EXTRACT(YEAR FROM CURRENT_DATE), ${donHang.total})
    ON CONFLICT (month, year) 
    DO UPDATE SET revenue = doanhthu.revenue + EXCLUDED.revenue;
  `;

  }

    return { message: 'Đơn hàng đã được thanh toán và vận chuyển.' };
  } catch (error) {
    console.error('Database error:', error);  // Log the error for debugging
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xử lý đơn hàng.' };
  }
}











export async function AddDoiTac(doitac: DoiTac,uid:number) {
  try {
    const aonuoiJson = JSON.stringify(doitac.ao_nuoi); // Ensure it's a valid JSON string

    console.log('aonuoi JSON:', aonuoiJson); // Log dữ liệu trước khi gửi vào SQL

    // Use parameterized query to prevent SQL injection
    const result = await sql`
      INSERT INTO doitac (name, email, sdt, dia_chi, ao_nuoi)
      VALUES (${doitac.name}, ${doitac.email}, ${doitac.sdt}, ${doitac.dia_chi}, ARRAY[${aonuoiJson}::jsonb])
      RETURNING id;`;
    
    await sql`
    INSERT INTO logging (time, action, idforlink, user_id)
    VALUES (now(), 'Thêm đối tác', ${result.rows[0].id}, ${uid})
  `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Partner.',
    };
  }
}


export async function EditProduct(id:string, product: Product,uid:number) {
  try {
    // Update the product based on its unique ID
    await sql`
      UPDATE product
      SET 
        name = ${product.name},
        company = ${product.company},
        buy_price = ${product.buy_price},
        sell_price = ${product.sell_price},
        description = ${product.description},
        img_product = ${product.img_product}
      WHERE id = ${id}
    `;

    await sql`
    INSERT INTO logging (time, action, idforlink, user_id)
    VALUES (now(), 'Chỉnh sửa sản phẩm', ${id}, ${uid})
  `;
    
    return { message: 'Product updated successfully.' };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Product.',
    };
  }
}

export async function InBill(id:string) {
  try {
    // Update the product based on its unique ID
    await sql`
      UPDATE donxuathang
      SET 
        dain='d'
      WHERE id = ${id}
  `;
    
    return { message: 'Product updated successfully.' };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Product.',
    };
  }
}

export async function EditUser(id:number, product: Users,uid:number) {
  try {
    // Update the product based on its unique ID
    await sql`
      UPDATE users
      SET 
        name = ${product.name},
        bank = ${product.bank},
        stk = ${product.stk},
        ngay_sinh = ${product.ngay_sinh},
        sdt = ${product.sdt},
        cccd = ${product.cccd},
        dia_chi = ${product.dia_chi}
        where manv=${id}
    `;

    await sql`
    INSERT INTO logging (time, action, idforlink, user_id)
    VALUES (now(), 'Chỉnh sửa người dùng', ${id}, ${uid})
  `;
    
    return { message: 'Product updated successfully.' };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Product.',
    };
  }
}

export async function EditPartner(id: string, partner: DoiTac,uid:number) {

  try {
    await sql`
      UPDATE doitac
      SET 
        name = ${partner.name},
        email = ${partner.email},
        sdt = ${partner.sdt},
        dia_chi = ${partner.dia_chi}
      WHERE id = ${id}
    `;

    await sql`
    INSERT INTO logging (time, action, idforlink, user_id)
    VALUES (now(), 'Sửa đối tác', ${id}, ${uid})
  `;
    // ao_nuoi = ${partner.ao_nuoi}
    return { message: 'Đối tác đã được cập nhật thành công.' };
  } catch (error) {
    console.log('Lỗi khi cập nhật:', error);
    return {
      message: 'Lỗi Cơ sở Dữ liệu: Không thể cập nhật đối tác.',
    };
  }
}



export async function DeleteProduct(id: string, uid:number) {
  try {
    // Xóa sản phẩm từ cơ sở dữ liệu
    await sql`DELETE FROM product WHERE id = ${id}`;

    // Gọi revalidatePath để làm mới dữ liệu cho trang '/product-list'
   
    await sql`
      INSERT INTO logging (time, action, idforlink, user_id)
      VALUES (now(), 'Xóa sản phẩm', ${id}, ${uid})
    `;
    return { message: 'Sản phẩm đã được xóa và cache đã được làm mới.' };
  } catch (error) {
    console.error(error); // Ghi log lỗi
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.' };
  }
}


export async function DeletePartner(id: string,uid:number) {
  try {
    // Xóa sản phẩm từ cơ sở dữ liệu
    await sql`DELETE FROM doitac WHERE id = ${id}`;
    await sql`
    INSERT INTO logging (time, action, idforlink, user_id)
    VALUES (now(), 'Xóa đối tác', ${id}, ${uid})
  `;

    // Gọi revalidatePath để làm mới dữ liệu cho trang '/product-list'
    revalidatePath('doi-tac/partner-list'); 

    return { message: 'Sản phẩm đã được xóa và cache đã được làm mới.' };
  } catch (error) {
    console.error(error); // Ghi log lỗi
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.' };
  }
}

export async function DeleteHangTon(donhangid: string, hangid:string) {
  try {
    // Xóa sản phẩm từ cơ sở dữ liệu
    await sql`DELETE FROM tonkho WHERE ma_don_hang = ${donhangid} AND ma_hang = ${hangid}`;

    return { message: 'Sản phẩm đã được xóa và cache đã được làm mới.' };
  } catch (error) {
    console.error(error); // Ghi log lỗi
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.' };
  }
}


export async function Unactive(id: string) {
  try {
    // Xóa sản phẩm từ cơ sở dữ liệu
    await sql`      
    UPDATE users
    SET status = 'unactive'
    WHERE id = ${id}`;
    return { message: 'Sản phẩm đã được xóa và cache đã được làm mới.' };
  } catch (error) {
    console.error(error); // Ghi log lỗi
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.' };
  }
}

export async function RestoreAccount(id: string) {
  try {
    // Xóa sản phẩm từ cơ sở dữ liệu
    await sql`      
    UPDATE users
    SET status = 'active'
    WHERE id = ${id}`;
    return { message: 'Sản phẩm đã được xóa và cache đã được làm mới.' };
  } catch (error) {
    console.error(error); // Ghi log lỗi
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.' };
  }
}




export async function DeleteProductFromStock(clientproducts:any, doitac:DoiTac, nguoivanchuyen:Users,thanhtien:number) {

  for (const product of clientproducts) {
    let remainingQuantity = product.soluong;
    let stockEntries;

    // Lấy danh sách tồn kho theo sản phẩm và sắp xếp theo hạn sử dụng gần nhất
    try {
      const data = await sql<TonKho>`
      SELECT ma_don_hang, so_luong, han_su_dung
      FROM tonkho 
      WHERE ma_hang = ${product.id} and han_su_dung >= now()
      ORDER BY han_su_dung ASC
      `;
      stockEntries= data.rows;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all partner.');
    }

    // Duyệt qua từng dòng tồn kho và trừ số lượng
    for (const entry of stockEntries) {
      if (remainingQuantity <= 0) break;

      const stockId = entry.ma_don_hang;
      const stockQuantity = entry.so_luong;

      if (stockQuantity <= remainingQuantity) {
        // Trừ hết dòng tồn kho này
        await sql`delete from tonkho 
          WHERE ma_don_hang = ${stockId} and ma_hang=${product.id}`;
        remainingQuantity -= stockQuantity;
      } else {
        // Trừ một phần và dừng lại
        await sql`UPDATE tonkho 
          SET so_luong = so_luong - ${remainingQuantity}
          WHERE ma_don_hang = ${stockId}`;
        remainingQuantity = 0;
      }
    }

    // Nếu còn dư số lượng cần trừ => báo lỗi hoặc xử lý tùy ý
    if (remainingQuantity > 0) {
      throw new Error(
        `Not enough stock for product ${product.name}. Missing: ${remainingQuantity}`
      );
    }
  }
  const productJson = JSON.stringify(clientproducts);

  //add don xuat hang
  // Thực hiện insert vào bảng donxuathang và lấy id vừa tạo
  const result:any = await sql`
    INSERT INTO donxuathang (ma_doi_tac, product, status, total, ngayxuat )
    VALUES (${doitac.id}, ARRAY[${productJson}::jsonb], 'đang vận chuyển', ${thanhtien} ,now())
    RETURNING id;`;

  // Lấy id của dòng vừa được insert
  const donxuatId = result.rows[0].id;

  // Chèn vào bảng vanchuyen với id vừa lấy từ donxuathang
  await sql`
    INSERT INTO vanchuyen (id_don_hang, status, nhapxuat, start_time,id_nguoi_van_chuyen,id_doi_tac, kho_xuat_hang, dia_chi_kho) 
    VALUES (${donxuatId}, 'đang vận chuyển', 'Xuất', now(), ${nguoivanchuyen.manv}, ${doitac.id}, ${doitac.name}, ${doitac.dia_chi});`;

  console.log(productJson);
}

// Lưu mã thông báo đặt lại và thời gian hết hạn
export async function saveResetToken(userId: number, token: string, expiry: number) {
  try {
    await sql`
      INSERT INTO reset_tokens (user_id, token, expiry)
      VALUES (${userId}, ${token}, ${expiry})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save reset token.');
  }
}




// Cập nhật mật khẩu của người dùng
export async function updatePassword(userId: string, password: string) {
  console.log("abc")
  const userIds: UUID = "5c4a8b76-45a6-41a9-beac-25a09713b12d";
  //type ko biet import dung ko, test sau
  try {
    await sql`
      UPDATE users
      SET password = ${password}
      WHERE id = ${userIds}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update password.');
  }
}


