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
import { useRouter } from "next/navigation";
import { RegisterFormValues } from "@/types";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const form = useForm<RegisterFormValues>({
    defaultValues: {},
  });

  async function onSubmit(values: RegisterFormValues) {
    if (values.password !== values.confirmPassword) {
      // Passwords do not match, set passwordsMatch to false
      setPasswordsMatch(false);
      return;
    }

    // Passwords match, proceed with form submission.
    setPasswordsMatch(true);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log(data);

    if (data.error) {
      console.error(data.error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Registered successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/login");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
          Registration
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
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
                  pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    className="border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md  w-full"
                    required
                    placeholder="Confirm Password"
                    minLength={6}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {!passwordsMatch && (
                    <span className="text-red-600 text-xl mt-1">
                      Password and Confirm Password do not match
                    </span>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <p className="block text-center text-[16px] font-medium">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </p>
        <Button
          type="submit"
          className="w-full rounded-md text-white text-lg px-4 py-[6px] font-medium bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
