"use client";

import Logo from "@/components/common/Logo";
import TextInput from "@/components/common/TextInput";
import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from "react";
import Image from "next/image";
import AuthSocialButton from "./AuthSocialButton";
import Separator from "./Separator";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const initialState = {
  name: "",
  email: "",
  password: "",
};

type Variant = "SIGNUP" | "SIGNIN";

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>("SIGNIN");
  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status, router]);

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
    setIsLoading(true);

    if (variant === "SIGNUP") {
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
      })
        .then(() => signIn("credentials", values))
        .catch((error) => alert(error))
        .finally(() => setIsLoading(false));
    } else {
      signIn("credentials", { ...values, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            alert("Invalid Credentials");
          }
          if (callback?.ok && !callback?.error) {
            alert("Logged in");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleAuthSocialClick = (provider: string) => {
    setIsLoading(false);

    signIn(provider, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          alert("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          // router.push("/users");
          console.log("Authenticated");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const toggleVariant = () => {
    setValues(initialState);
    setVariant((prev) => (prev === "SIGNIN" ? "SIGNUP" : "SIGNIN"));
  };

  const headerMessage =
    variant === "SIGNIN"
      ? "Sign In to your account"
      : "Sign Up with a new account";

  const buttonMessage = variant === "SIGNIN" ? "Sign in" : "Sign up";
  const toggleMessages =
    variant === "SIGNIN"
      ? ["New to Chattify?", "Create an account"]
      : ["Already have an account?", "Login"];

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {headerMessage}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {variant === "SIGNUP" && (
            <TextInput
              label="Full name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
          )}
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
              {buttonMessage}
            </button>
          </div>
        </form>
        <Separator />
        <div className="py-8">
          <AuthSocialButton
            icon={
              <Image src="/google.svg" alt="Google" width={18} height={18} />
            }
            onClick={() => handleAuthSocialClick("google")}
          />
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-gray-500">
        {toggleMessages[0]}{" "}
        <span
          onClick={toggleVariant}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
        >
          {toggleMessages[1]}
        </span>
      </p>
    </div>
  );
}

// function ForgotPassword() {
//   return (
//     <div className="text-sm">
//       <a
//         href="#"
//         className="font-semibold text-indigo-600 hover:text-indigo-500"
//       >
//         Forgot password?
//       </a>
//     </div>
//   );
// }
