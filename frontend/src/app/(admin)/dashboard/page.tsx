"use client";

import api from "@/utilities/axios";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();

  const handleSubmit = async () => {
    await api.post("/api/users/auth/sign-out");

    localStorage.removeItem("accessToken");
    router.push("/sign-in");
  };

  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <button onClick={() => handleSubmit()}>Logout</button>
    </div>
  );
};

export default AdminPage;
