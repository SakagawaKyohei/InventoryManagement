import { Resend } from 'resend';
import crypto from 'crypto';
import { getUserByEmail, saveResetToken } from "@/app/lib/data";
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { email } = req.body;

  // Check if user exists
  const user = await getUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản người dùng' });

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour expiration

  // Save token and expiry in database
  await saveResetToken(user.id, resetToken, resetTokenExpiry);

  // Construct reset link
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

  // Send reset email
  await resend.emails.send({
    from: 'noreply@oneclickweb.id.vn',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
  });

  res.status(200).json({ message: 'Password reset link sent to email' });
}
