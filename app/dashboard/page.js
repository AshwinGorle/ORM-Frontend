"use client"
import { useGetUser } from "@/hooks/auth";

export default function DashboardPage() {
  const {user} =  useGetUser();
  console.log("user-----------", user)
  return (
    <div className=" flex items-center justify-center">
      <h1> This is the Main Dashboard page</h1>
    </div>
  );
}