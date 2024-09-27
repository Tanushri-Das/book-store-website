"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {},
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(values: LoginFormValues) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log("login", response);

    if (response?.error) {
      console.error(response.error);
      Swal.fire({
        title: "Error!",
        text: "Somwthing went wrong.please try again",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Login successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push(callbackUrl);
    }
  }

  return (
    <Container>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
            Login
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@whatever.com"
                    {...field}
                    className="border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md  w-full"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md  w-full"
                      required
                      placeholder="Password"
                      minLength={6}
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <p className="block text-center text-[16px] font-medium">
            Do not have an account ? <Link href={"/register"}>Sign Up</Link>
          </p>

          <Button
            type="submit"
            className="w-full rounded-md text-white text-lg px-4 py-[6px] font-medium bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300"
          >
            Submit
          </Button>

          <div className="flex justify-center items-center gap-x-5">
            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl,
                })
              }
              className="border border-black dark:border-gray-300 rounded-lg px-5 py-[6px]"
            >
              Sign in with Google
            </button>
            <button
              onClick={() =>
                signIn("github", {
                  callbackUrl,
                })
              }
              className="border border-black dark:border-gray-300 rounded-lg px-5 py-[6px]"
            >
              Sign in with GitHub
            </button>
          </div>
        </form>
      </Form>
    </Container>
  );
};

export default LoginForm;
