"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePostUsers } from "@/hooks/usePost";
import RefreshIcon from "@mui/icons-material/Refresh";
import { isAxiosError } from "axios";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";

const initial_value = {
  name: "",
  email: "",
  password: "",
};

const SignUpPage = () => {
  const [values, setValues] = useState(initial_value);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { createNewUser } = usePostUsers("/api/users/auth/sign-up");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createNewUser.mutateAsync(values);
      setValues(initial_value);
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "An unexpected error occurred";
        setErrorMessage(message);
      } else if (error instanceof Error) {
        setErrorMessage(
          error.message || "Something went wrong. Please try again later.",
        );
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-r flex justify-center items-center from-slate-950 via-slate-800 to-slate-950 text-white min-h-screen">
      <div className="w-full max-w-[450px]">
        <h1 className="text-center mb-5 text-4xl">SIGN UP</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full p-5 md:p-10 backdrop-blur-2xl shadow-md shadow-stone-950 bg-transparent md:rounded-md"
        >
          {createNewUser.isError && <ErrorMessage message={errorMessage} />}
          {createNewUser.isSuccess && (
            <SuccessMessage message="User successfully registered." />
          )}
          {createNewUser.isSuccess && (
            <p className="flex items-center justify-center">
              Redirecting to Sign In Page
              <RefreshIcon className="animate-spin ml-2" />
            </p>
          )}
          <div className="flex flex-col mb-2">
            <label className="font-extralight mb-2">Name:</label>
            <input
              type="text"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="outline-none p-2 rounded-md text-black"
            />
          </div>
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
            className="text-center w-full mb-2 bg-blue-900 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300"
          >
            Submit
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

export default SignUpPage;
