import bcrypt from 'bcrypt';
import { getResetToken, updatePassword } from "@/app/lib/data";

export default async function handler(req, res) {
  const { token, password } = req.body;

  // Verify reset token and expiration
  const resetData = await getResetToken(token);
  if (!resetData || resetData.expiry < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user's password
  await updatePassword(resetData.userId, hashedPassword);

  res.status(200).json({ message: 'Password reset successfully' });
}
