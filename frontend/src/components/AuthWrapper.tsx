"use client";

import { UsersProps } from "@/interfaces/users.props";
import api from "@/utilities/axios";
import { AxiosError } from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

const GetUsers = async () => {
  try {
    const response = await api.get("/api/users");
    return { data: response.data as UsersProps, error: null };
  } catch (e) {
    const error = e as AxiosError;
    return { data: null, error };
  }
};

const AuthWrapper = ({
  isAdmin,
  children,
}: {
  isAdmin?: boolean;
  children: React.ReactNode;
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (
      pathname === "/sign-in" ||
      pathname === "/sign-up" ||
      pathname === "/"
    ) {
      if (token) {
        router.replace("/home");
      } else {
        setIsSuccess(true);
      }
      return;
    }

    // If no token, redirect immediately
    if (!token) {
      router.replace("/sign-in");
      return;
    }

    // Fetch user data only if a token is present
    (async () => {
      const { data, error } = await GetUsers();

      if (error || !data || !data.users) {
        router.replace("/sign-in");
        return;
      }

      // Check admin status if `isAdmin` is explicitly set
      if (isAdmin !== undefined) {
        if (isAdmin !== data.users.isAdmin) {
          router.replace(isAdmin ? "/home" : "/dashboard");
          return;
        }
      }

      setIsSuccess(true);
    })();
  }, [router, isAdmin, pathname]);

  if (!isSuccess) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-stone-400">
        <RefreshIcon className="animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
