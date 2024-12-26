"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDistanceToNow } from "date-fns";

interface Backup {
  createdAt: Date;
  size: string;
}
export default function EditProduct() {
  const [backup, setBackup] = useState<Backup | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    // Simulating fetching the current backup
    const mockBackup = {
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      size: "1.5 GB",
    };
    setBackup(mockBackup);
  }, []);

  const handleCreateBackup = async () => {
    setIsCreating(true);
    // Simulate backup creation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newBackup = {
      createdAt: new Date(),
      size: "1.6 GB",
    };
    setBackup(newBackup);
    setIsCreating(false);
  };

  const handleRestore = async () => {
    setIsRestoring(true);
    // Simulate restore process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsRestoring(false);
    alert("Restore completed successfully!");
  };
  const handleSubmit = async () => {
    setIsCreating(true);
    try {
      // Gửi yêu cầu POST tới API /api/back-up
      const res = await fetch("/api/back-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Kiểm tra nếu yêu cầu thành công
      if (res.ok) {
        setIsCreating(false);
        alert("Backup successful");
      } else {
        // Nếu có lỗi, hiển thị thông báo lỗi
        const data = await res.json();
        alert(`Backup failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu (kết nối mạng, lỗi server, ...)
    }

    const newBackup = {
      createdAt: new Date(),
      size: "1.6 GB",
    };
    setBackup(newBackup);
  };

  const handleSubmit1 = async () => {
    setIsRestoring(true);
    try {
      // Gửi yêu cầu POST tới API /api/back-up
      const res = await fetch("/api/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Kiểm tra nếu yêu cầu thành công
      if (res.ok) {
        setIsRestoring(false);
        alert("Restore completed successfully!");
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
    // <div className="register-container">
    //   <button onClick={handleSubmit}>Start Backup</button>
    //   <button onClick={handleSubmit1}>Start Restore</button>
    // </div>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Backup and Restore</h1>
      <Card className="max-w-md mx-auto" style={{ marginTop: 100, width: 800 }}>
        <CardHeader>
          <CardTitle>Latest Backup</CardTitle>
          <CardDescription>Manage your single file backup</CardDescription>
        </CardHeader>
        <CardContent>
          {backup ? (
            <div className="space-y-2">
              <p>
                <strong>Created:</strong>{" "}
                {formatDistanceToNow(backup.createdAt, { addSuffix: true })}
              </p>
              <p>
                <strong>Size:</strong> {backup.size}
              </p>
            </div>
          ) : (
            <p>No backup available</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isCreating}
          >
            {isCreating ? "Creating Backup..." : "Create New Backup"}
          </Button>
          {backup && (
            <>
              <Alert className="mb-2">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Restoring will overwrite your current data. Ensure you have a
                  recent backup before proceeding.
                </AlertDescription>
              </Alert>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleSubmit1}
                disabled={isRestoring}
              >
                {isRestoring ? "Restoring..." : "Restore from Backup"}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
