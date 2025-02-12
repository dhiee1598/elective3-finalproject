"use client";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/utilities/axios";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuBar = () => setIsOpen(!isOpen);

  const router = useRouter();

  const handleButtonLogout = async () => {
    await api.post("/api/users/auth/sign-out");

    localStorage.removeItem("accessToken");
    router.push("/sign-in");
  };
  return (
    <div className="fixed shadow-lg w-full flex h-14 py-10 justify-between items-center px-5 backdrop-blur-md z-50">
      <Link href={"/"}>
        <h1 className="font-extrabold md:text-3xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-blue-600">
          BLOG MANIA
        </h1>
      </Link>
      <button
        type="button"
        onClick={toggleMenuBar}
        className="md:hidden relative z-10"
      >
        {isOpen ? (
          <CloseIcon fontSize="large" className="text-white" />
        ) : (
          <MenuIcon
            fontSize="large"
            className="text-white hover:animate-pulse"
          />
        )}
      </button>
      {isOpen && (
        <div className="md:hidden flex shadow-md shadow-black text-white items-center bg-slate-900 rounded-b-md flex-col min-w-[300px] min-h-screen pt-20 absolute right-0 top-0">
          <Link
            className="w-full px-14 flex items-center text-lg text-start py-2 hover:bg-blue-900 uppercase"
            href={`/home`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <HomeIcon fontSize="large" className="mr-14" /> Home
          </Link>
          <Link
            className="w-full px-14 flex items-center text-lg text-start py-2 hover:bg-blue-900 uppercase"
            href={`/home/profile`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <AccountBoxIcon fontSize="large" className="mr-14" /> Profile
          </Link>
          <button
            onClick={handleButtonLogout}
            className="w-full px-14 flex items-center text-lg text-start py-2 hover:bg-blue-900 uppercase"
          >
            <LogoutIcon fontSize="large" className="mr-14" /> Sign Out
          </button>
        </div>
      )}
      <div className="hidden md:flex md:items-center md:space-x-3 text-white">
        <Link
          className="px-4 py-2 bg-blue-800 text-white font-medium text-lg rounded-xl shadow-md hover:bg-white hover:text-black transition-all duration-300"
          href={`/home`}
        >
          Home
        </Link>
        <Link
          className="px-4 py-2 bg-blue-800 text-white font-medium text-lg rounded-xl shadow-md hover:bg-white hover:text-black transition-all duration-300"
          href={`/home/profile`}
        >
          Profile
        </Link>
        <button
          onClick={handleButtonLogout}
          className="px-4 py-2 bg-blue-800 text-white font-medium text-lg rounded-xl shadow-md hover:bg-white hover:text-black transition-all duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
