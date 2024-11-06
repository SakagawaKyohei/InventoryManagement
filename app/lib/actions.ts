'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError, User } from 'next-auth';
import bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import { Users } from './definitions';
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


