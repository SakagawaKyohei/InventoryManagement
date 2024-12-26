"use client";
import React from "react";

const PrintBill: React.FC = () => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>In Hóa Đơn</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
              }
              .invoice {
                width: 80%;
                margin: auto;
                border: 1px solid #ddd;
                padding: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ddd;
                text-align: center;
                padding: 8px;
              }
              th {
                background-color: #f2f2f2;
              }
              h1, h3, h4 {
                text-align: center;
              }           
              .center{
                text-align: center;
              }
              .total {
                margin-top: 10px;
                text-align: right;
                font-size: 18px;
              }
              .footer {
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <div class="invoice">
              <h3>ĐẠI LÝ THỨC ĂN</h1>
              <h3>CheQuePot</h4>
              <h3>HÓA ĐƠN BÁN HÀNG</h3>
              <p><strong>Tên khách hàng:</strong> Nguyễn Văn A</p>
              <p><strong>Số điện thoại:</strong> 0932870398</p>
              <p><strong>Địa chỉ:</strong> 039, đường Hùng Vương, khu vực 3, phường Ngãy Bảy, thành phố Ngã Bảy, tỉnh Hậu Giang</p>

              
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên hàng</th>
                    <th>ĐVT</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>Sản phẩm A</td>
                    <td>Kg</td>
                    <td>2</td>
                    <td>50.000</td>
                    <td>100.000</td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>Sản phẩm B</td>
                    <td>Kg</td>
                    <td>3</td>
                    <td>40.000</td>
                    <td>120.000</td>
                  </tr>                  
                  <tr>
                  <td style="color: transparent;">a</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                    <tr>
                   <td style="color: transparent;">a</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>  
                  <tr>
                    <td style="color: transparent;">a</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                                   <tr>
                    <td style="color: transparent;">a</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
       
                </tbody>
              </table>
              <p class="total"><strong>CỘNG: 220.000đ</strong></p>
              <div class="footer">
                <div><div style="display: flex; flex-direction: column;"><strong style="margin-top:15">Người mua hàng</strong><strong style="margin-top:100 ;text-align: center">Nguyễn Văn A</strong></div></div>
                <div>
                  <strong>Ngày ... tháng ... năm 2024</strong><br />
                 <div style="display: flex; flex-direction: column;">
         <strong style="text-align: center; display: block; ">Người tạo phiếu</strong><div/>
                  <strong style="text-align: center; display: block;margin-top:100">Lâm Gia Bảo</strong><div/>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        style={{ padding: "10px 20px", margin: "20px" }}
      >
        In Hóa Đơn
      </button>
    </div>
  );
};

export default PrintBill;
