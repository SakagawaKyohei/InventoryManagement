"use client";
export default function EditProduct() {
  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu POST tới API /api/back-up
      const res = await fetch("/api/back-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Kiểm tra nếu yêu cầu thành công
      if (res.ok) {
        alert("Backup successful");
      } else {
        // Nếu có lỗi, hiển thị thông báo lỗi
        const data = await res.json();
        alert(`Backup failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu (kết nối mạng, lỗi server, ...)
    }
  };

  const handleSubmit1 = async () => {
    try {
      // Gửi yêu cầu POST tới API /api/back-up
      const res = await fetch("/api/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Kiểm tra nếu yêu cầu thành công
      if (res.ok) {
        alert("Restore successful");
      } else {
        // Nếu có lỗi, hiển thị thông báo lỗi
        const data = await res.json();
        alert(`Restore failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu (kết nối mạng, lỗi server, ...)
    }
  };

  return (
    <div className="register-container">
      <button onClick={handleSubmit}>Start Backup</button>
      <button onClick={handleSubmit1}>Start Restore</button>
    </div>
  );
}
