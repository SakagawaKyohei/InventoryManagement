"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  doanhthu: Array<{ month: number; year: number; revenue: string }>;
}

export default function Home(props: Props) {
  const { doanhthu } = props;
  const [forecast, setForecast] = useState<number[]>([]);

  // Fetch dữ liệu dự đoán từ API Next.js
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/forecast");
      const data = await response.json();
      setForecast(data);
    }

    fetchData();
  }, []);

  // Xử lý nhãn cho doanh thu thực tế
  const doanhThuLabels = doanhthu.map(
    (item) => `Tháng ${item.month}/${item.year}`
  );
  const doanhThuData = doanhthu.map((item) => parseInt(item.revenue, 10));

  // Xử lý nhãn cho dự báo và tạo mảng dữ liệu ngắt
  const lastDoanhThu = doanhthu[doanhthu.length - 1]; // Tháng cuối của doanh thu
  let forecastLabels: string[] = [];
  let forecastData: (number | null)[] = Array(doanhThuData.length).fill(null); // Mảng rỗng cho phần trước dự báo

  if (lastDoanhThu) {
    let nextMonth = lastDoanhThu.month;
    let nextYear = lastDoanhThu.year;

    forecast.forEach((value, index) => {
      nextMonth++;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear++;
      }
      forecastLabels.push(`Tháng ${nextMonth}/${nextYear}`);
      forecastData.push(value);
    });
  }

  const combinedLabels = [...doanhThuLabels, ...forecastLabels];
  const combinedData = [
    ...doanhThuData,
    ...forecast.map((value, index) =>
      index < doanhThuData.length ? null : value
    ),
  ];

  // Cấu hình biểu đồ
  const data = {
    labels: combinedLabels,
    datasets: [
      {
        label: "Doanh thu thực tế",
        data: [...doanhThuData, ...Array(forecast.length).fill(null)],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "Dự báo",
        data: forecastData,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
        borderDash: [5, 5], // Đường gạch đứt
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Biểu đồ doanh thu và dự báo",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto", padding: "50px 0" }}>
      <h1>Biểu đồ doanh thu và dự báo</h1>
      {forecast.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>Đang tải dữ liệu dự báo...</p>
      )}
    </div>
  );
}
