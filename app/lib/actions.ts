'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError, User } from 'next-auth';
import bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import { DoiTac, DonDatHang, Product, Users } from './definitions';
import supabase from "../../app/supabase";
import { v4 as uuidv4 } from "uuid";

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
          return 'Tài khoản hoạt mật khẩu không đúng.';
        default:
          return 'Tài khoản hoạt mật khẩu không đúng.';
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
    await sql`
      INSERT INTO users (name,email,password,status, role, bank, stk, ngay_sinh,sdt, cccd,dia_chi)
      VALUES (${user.name},${user.email}, ${user.password},${user.status}, ${user.role},${user.bank}, ${user.stk}, ${user.ngaysinh},${user.sdt},${user.cccd},${user.diachi})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Account.',
    };
  }
}

export async function AddProduct(product:Product) {
  try {
    await sql`
      INSERT INTO product (name,company,buy_price,sell_price, description, img_product)
      VALUES (${product.name},${product.company}, ${product.buy_price},${product.sell_price}, ${product.description},${product.img_product})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Account.',
    };
  }
}
export async function AddDonDatHang(product: Record<string, unknown>, company: string) {
  const status = "draft";

  try {
    // Chuyển đối tượng product thành chuỗi JSON và sau đó chuyển thành jsonb
    const productJson = JSON.parse(JSON.stringify(product));

    console.log('Product JSON:', productJson); // Log dữ liệu trước khi gửi vào SQL

    // Bước 1: Kiểm tra xem dondathang có tồn tại không
    const existingOrder = await sql`
      SELECT product FROM dondathang
      WHERE company = ${company} AND status = ${status}
      LIMIT 1;
    `;
    
    console.log('Existing Order:', existingOrder); // Log kết quả truy vấn SELECT

    if (existingOrder.rows.length === 0) {
      // Bước 2: Nếu không có dondathang nào, tạo mới
      await sql`
        INSERT INTO dondathang (company, product, status)
        VALUES (${company}, ARRAY[${productJson}::jsonb], ${status});
      `;
      return { message: 'New DonDatHang created successfully.' };
    } else {
      // Sử dụng array_append để thêm phần tử vào mảng jsonb[]
      await sql`
        UPDATE dondathang
        SET product = array_append(product, ${productJson}::jsonb)
        WHERE company = ${company} AND status = ${status};
      `;
      return { message: 'Product added to existing DonDatHang.' };
    }

  } catch (error) {
    console.error('Database error:', error); // Log lỗi để kiểm tra chi tiết
    return {
      message: 'Database Error: Failed to Create or Update DonDatHang.',
    };
  }
}
//them don dat hang trang thai draft

export async function AddDonDatHang1() {
  const status = 'draft';  // Correct string assignment with single quotes

  try {
    // Using parameterized queries and properly setting 'status' to 'pending'
    await sql`
      UPDATE dondathang
      SET status = 'pending' 
      WHERE status = ${status}; 
    `;
    
    return { message: 'Product added to existing DonDatHang.' };
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

//them don dat hang trang thai cho thanh toan

export async function ThanhToan( donHangId:string, hanSuDung:string, khoXuatHang:string, diaChi:string,id_nguoi_van_chuyen:string ) {
  try {
    // Cập nhật trạng thái đơn hàng thành "paid" và cập nhật ngày hết hạn sử dụng
    await sql`
    UPDATE dondathang
    SET status = 'paid', han_su_dung = ${hanSuDung}
    WHERE id = ${donHangId};
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



export async function DaVanChuyen(donHangId: string) {
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

    return { message: 'Đơn hàng đã được thanh toán và vận chuyển.' };
  } catch (error) {
    console.error('Database error:', error);  // Log the error for debugging
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xử lý đơn hàng.' };
  }
}












export async function AddDoiTac(doitac:DoiTac) {
  try {
    await sql`
      INSERT INTO doitac (name, email, sdt, dia_chi)
      VALUES (${doitac.name},${doitac.email}, ${doitac.sdt},${doitac.dia_chi})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Partner.',
    };
  }
}


export async function EditProduct(id:string, product: Product) {
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
    
    return { message: 'Product updated successfully.' };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Product.',
    };
  }
}

export async function EditPartner(id: string, partner: DoiTac) {


  try {
    await sql`
      UPDATE doitac
      SET 
        name = ${partner.name},
        email = ${partner.email},
        sdt = ${partner.sdt},
        dia_chi = ${partner.dia_chi},
        ao_nuoi = ${partner.ao_nuoi}
      WHERE id = ${id}
    `;

    return { message: 'Đối tác đã được cập nhật thành công.' };
  } catch (error) {
    console.log('Lỗi khi cập nhật:', error);
    return {
      message: 'Lỗi Cơ sở Dữ liệu: Không thể cập nhật đối tác.',
    };
  }
}



export async function DeleteProduct(id: string) {
  try {
    // Xóa sản phẩm từ cơ sở dữ liệu
    await sql`DELETE FROM product WHERE id = ${id}`;

    // Gọi revalidatePath để làm mới dữ liệu cho trang '/product-list'
    revalidatePath('/product-list'); 

    return { message: 'Sản phẩm đã được xóa và cache đã được làm mới.' };
  } catch (error) {
    console.error(error); // Ghi log lỗi
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.' };
  }
}


export async function DeletePartner(id: string) {
  try {
    // Xóa sản phẩm từ cơ sở dữ liệu
    await sql`DELETE FROM doitac WHERE id = ${id}`;

    // Gọi revalidatePath để làm mới dữ liệu cho trang '/product-list'
    revalidatePath('doi-tac/partner-list'); 

    return { message: 'Sản phẩm đã được xóa và cache đã được làm mới.' };
  } catch (error) {
    console.error(error); // Ghi log lỗi
    return { message: 'Lỗi cơ sở dữ liệu: Không thể xóa sản phẩm.' };
  }
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


