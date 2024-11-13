import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ConfigProvider
          theme={{
            components: {
              Tooltip: { fontSize: 12 },
              Upload: { controlHeightLG: 60 },
            },
            token: {
              colorPrimary: "#FF9040",
              fontFamily: "Arial, Helvetica, sans-seri",
              fontSize: 14,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
