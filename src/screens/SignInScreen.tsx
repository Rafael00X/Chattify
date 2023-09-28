"use client";
import Logo from "@/components/common/Logo";
import TextInput from "@/components/common/TextInput";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function SignInScreen() {
  const [values, setValues] = useState(initialState);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <TextInput
            label="Email address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Signup with a new account
          </Link>
        </p>
      </div>
    </div>
  );
}

function ForgotPassword() {
  return (
    <div className="text-sm">
      <a
        href="#"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Forgot password?
      </a>
    </div>
  );
}
