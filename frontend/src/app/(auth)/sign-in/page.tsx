"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePostAuthUsers } from "@/hooks/usePost";
import { isAxiosError } from "axios";
import ErrorMessage from "@/components/ErrorMessage";
import { CachedSharp } from "@mui/icons-material";

const initial_value = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const [values, setValues] = useState(initial_value);
  const { authUsers } = usePostAuthUsers("/api/users/auth/sign-in");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authUsers.mutateAsync(values);

      localStorage.setItem("accessToken", response.accessToken);
      if (response.isAdmin === true) {
        router.push("/dashboard");
      } else {
        router.push("/home");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r flex justify-center items-center from-slate-950 via-slate-800 to-slate-950 text-white min-h-screen">
      <div className="w-full max-w-[450px]">
        <h1 className="text-center mb-5 text-5xl">SIGN IN</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full p-5 md:p-10 backdrop-blur-2xl shadow-md shadow-stone-950 bg-transparent md:rounded-md"
        >
          {authUsers.isError && <ErrorMessage message={errorMessage} />}
          <div className="flex flex-col mb-2">
            <label className="font-extralight mb-2">Email:</label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="outline-none p-2 rounded-md text-black"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="font-extralight mb-2">Password:</label>
            <input
              type="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="outline-none p-2 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            disabled={authUsers.isPending}
            className="text-center w-full mb-2 bg-blue-900 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300"
          >
            {authUsers.isPending ? (
              <CachedSharp className="animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-center w-full bg-slate-600 py-2 rounded-md hover:bg-slate-500 transition-colors duration-300"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
