import { exec } from "child_process";
import path from "path";
import { TerminateProcess } from "@/app/lib/actions";
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
      const BACKUP_FILE_NAME = "backup.latest.sql"; // Tên file sao lưu cần phục hồi
      const backupFilePath = path.join(BACKUP_PATH, BACKUP_FILE_NAME);

      // Kiểm tra xem file sao lưu có tồn tại hay không
      if (!fs.existsSync(backupFilePath)) {
        return res.status(400).json({ message: "File sao lưu không tồn tại." });
      }

      // Kiểm tra lại đường dẫn file sao lưu
      console.log("Đường dẫn file sao lưu:", backupFilePath);
      console.log(POSTGRES_USER+POSTGRES_PASSWORD+POSTGRES_HOST+POSTGRES_DATABASE)

      // Lệnh phục hồi cơ sở dữ liệu với set PGPASSWORD cho Windows
      const restoreCommand = `psql -U ${POSTGRES_USER} -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -d ${POSTGRES_DATABASE} -f "${backupFilePath}"`;

      // Thiết lập biến môi trường PGPASSWORD
      const env = { PGPASSWORD: POSTGRES_PASSWORD };

      // Thực thi lệnh restore
      exec(restoreCommand, { env }, async (error, stdout, stderr) => {
        if (error) {
          console.error(`Lỗi: ${error.message}`);
          return res.status(500).json({ message: `Phục hồi thất bại: ${error.message}` });
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return res.status(500).json({ message: `Phục hồi thất bại: ${stderr}` });
        }

        // Trả về phản hồi thành công
        console.log(`stdout: ${stdout}`);
        await TerminateProcess();
        return res.status(200).json({ message: "Phục hồi thành công từ file sao lưu", file: BACKUP_FILE_NAME });
      });
    } catch (err) {
      console.error("Lỗi:", err);
      res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
    }
  } else {
    res.status(405).json({ message: "Phương thức không được phép." });
  }
}
