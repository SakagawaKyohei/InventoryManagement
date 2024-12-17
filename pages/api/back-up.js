import { exec } from "child_process";
import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Thông tin kết nối database
      const POSTGRES_USER=process.env.POSTGRES_USER ?? ''
      const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? ''
      const POSTGRES_HOST = process.env.POSTGRES_HOST1;
      const POSTGRES_PORT = "5432";
      const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;

      const BACKUP_PATH = path.join(process.cwd(), "backup");
      const BACKUP_FILE_NAME = "backup.latest.sql"; // Đổi thành file .sql
      const backupFilePath = path.join(BACKUP_PATH, BACKUP_FILE_NAME);
      console.log(POSTGRES_USER+POSTGRES_PASSWORD+POSTGRES_HOST+POSTGRES_DATABASE)

      // Tạo thư mục backup nếu chưa tồn tại
      if (!fs.existsSync(BACKUP_PATH)) {
        fs.mkdirSync(BACKUP_PATH, { recursive: true });
      }

      // Lệnh pg_dump với các tùy chọn để sao lưu dưới dạng .sql
      const pgDumpCommand = `pg_dump "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}" -F p --no-comments --no-owner --no-privileges --clean -f "${backupFilePath}"`;

      // Thực thi lệnh pg_dump
      exec(pgDumpCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Lỗi: ${error.message}`);
          return res.status(500).json({ message: `Backup thất bại: ${error.message}` });
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return res.status(500).json({ message: `Backup thất bại: ${stderr}` });
        }

        // Đọc và sửa file SQL để loại bỏ transaction_timeout
        try {
          let backupFileContent = fs.readFileSync(backupFilePath, "utf-8");

          // Loại bỏ các dòng chứa 'transaction_timeout'
          backupFileContent = backupFileContent.split("\n").filter(line => !line.includes("transaction_timeout")).join("\n");

          // Ghi lại nội dung đã sửa vào file
          fs.writeFileSync(backupFilePath, backupFileContent, "utf-8");

          // Trả về phản hồi thành công
          console.log(`stdout: ${stdout}`);
          return res.status(200).json({ message: "Backup thành công", file: BACKUP_FILE_NAME });
        } catch (err) {
          console.error("Lỗi khi sửa tệp backup:", err);
          return res.status(500).json({ message: "Lỗi khi xử lý tệp backup." });
        }
      });
    } catch (err) {
      console.error("Lỗi:", err);
      res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
    }
  } else {
    res.status(405).json({ message: "Phương thức không được phép." });
  }
}
