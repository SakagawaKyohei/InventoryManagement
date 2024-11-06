import { Resend } from 'resend';
import { AddUser } from "@/app/lib/actions";
import {  getUserByEmail } from "@/app/lib/data";
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { user ,password} = req.body;
  const checkuser = await getUserByEmail(user.email);
  if (checkuser) return res.status(404).json({ message: 'Email đã được đăng ký' });


  // Update user's password
  await AddUser(user);

  await resend.emails.send({
    from: 'noreply@oneclickweb.id.vn',
    to: user.email,
    subject: 'Thông tin tài khoản OneClick - Cập nhật tài khoản mới',
    html: 
    `  <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #007BFF;">Kính gửi ${user.name},</h2>
        <p>Chúng tôi xin thông báo rằng tài khoản của bạn đã được tạo thành công trên hệ thống OneClick.</p>
        <p><strong>Thông tin tài khoản:</strong></p>
        <ul>
          <li><strong>Email:</strong> ${user.email}</li>
          <li><strong>Mật khẩu tạm thời:</strong> ${password}</li>
        </ul>
        <p>Vui lòng đăng nhập vào hệ thống và thay đổi mật khẩu của bạn ngay sau khi lần đầu tiên đăng nhập.</p>
        <p>Chúc bạn làm việc hiệu quả và thành công trong công việc tại OneClick.</p>
        <br/>
        <p>Trân trọng,</p>
        <p>Đội ngũ hỗ trợ OneClick</p>
      </div>`
  });
//them gioi tinh
//bcrypt password
  res.status(200).json({ message: 'Password reset successfully' });
}
