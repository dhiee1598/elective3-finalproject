"use client";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuBar = () => setIsOpen(!isOpen);

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
            href={`/sign-in`}
          >
            <LoginIcon fontSize="large" className="mr-14" /> Sign In
          </Link>
          <Link
            className="w-full px-14 flex items-center text-lg text-start py-2 hover:bg-blue-900 uppercase"
            href={`/sign-up`}
          >
            <PersonAddIcon fontSize="large" className="mr-14" /> Sign Up
          </Link>
        </div>
      )}
      <div className="hidden md:flex md:items-center md:space-x-3 text-white">
        <Link
          className="px-4 py-2 bg-blue-800 text-white font-medium text-lg rounded-xl shadow-md hover:bg-white hover:text-black transition-all duration-300"
          href={`/sign-in`}
        >
          Sign In
        </Link>
        <Link
          className="px-4 py-2 bg-blue-800 text-white font-medium text-lg rounded-xl shadow-md hover:bg-white hover:text-black transition-all duration-300"
          href={`/sign-up`}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
