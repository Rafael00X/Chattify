"use client";
import Logo from "@/components/common/Logo";
import TextInput from "@/components/common/TextInput";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function SignUpScreen() {
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
          Sign Up with a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <TextInput
            label="Full name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
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
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            href="/signin"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign in to your account
          </Link>
        </p>
      </div>
    </div>
  );
}
