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
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  // Fetch dữ liệu dự báo từ API
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/forecast");
      const data = await response.json();
      if (Array.isArray(data)) {
        setForecast(data);
      } else {
        console.error("Invalid forecast data:", data);
      }
    }

    fetchData();
  }, []);

  // Kiểm tra dữ liệu trước khi xử lý

  const doanhThuLabels = doanhthu.map((item) => {
    let newMonth = item.month + 2;
    let newYear = item.year + 1;

    if (newMonth > 12) {
      newMonth -= 12;
      newYear += 1;
    }

    return `${newMonth}/${newYear}`;
  });

  const doanhThuData = doanhthu.map((item) => parseInt(item.revenue, 10));

  const forecastLabels: string[] = [];
  const forecastData: number[] = [];

  if (forecast.length > 0) {
    let lastMonth = doanhthu[doanhthu.length - 1]?.month || 0;
    let lastYear = doanhthu[doanhthu.length - 1]?.year || 0;

    forecast.forEach((value) => {
      lastMonth++;
      if (lastMonth > 12) {
        lastMonth = 1;
        lastYear++;
      }
      forecastLabels.push(`${lastMonth + 2}/${lastYear + 1}`);
      forecastData.push(value);
    });
  }

  const combinedLabels = [...doanhThuLabels, ...forecastLabels];
  const router = useRouter();

  const data = {
    labels: combinedLabels,
    datasets: [
      {
        label: "Doanh thu thực tế",
        data: [...doanhThuData],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: false,
      },
      {
        label: "Dự báo",
        data: [
          ...Array(doanhThuData.length - 1).fill(null),
          doanhThuData[doanhThuData.length - 1], // Điểm nối
          ...forecastData,
        ],
        borderColor: "rgba(255,99,132,1)",
        borderDash: [5, 5],
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: false,
      },
    ],
  };

  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back(); // Quay lại trang trước trong lịch sử trình duyệt
    } else {
      router.push("/"); // Nếu không có lịch sử, điều hướng về trang chủ
    }
  };

  return (
    <div>
      <Link href={""}>
        <div style={{ display: "flex" }} onClick={handleGoBack}>
          <Image
            src="/return.png"
            width={45}
            height={45}
            className="hidden md:block"
            alt="return"
            style={{ marginRight: 15, marginLeft: 20, marginTop: 15 }}
          />
          <p style={{ marginTop: 25, fontSize: 20 }}>Quay lại</p>{" "}
        </div>
      </Link>
      <div style={{ width: "80%", margin: "auto", padding: "30px 0" }}>
        <h1
          style={{ fontSize: 25, fontWeight: "bold", marginBottom: 15 }}
          className="text-center"
        >
          Biểu đồ doanh thu và dự báo
        </h1>
        {forecast.length > 0 ? (
          <Line data={data} />
        ) : (
          <p>Đang tải dữ liệu dự báo...</p>
        )}
      </div>
    </div>
  );
}
