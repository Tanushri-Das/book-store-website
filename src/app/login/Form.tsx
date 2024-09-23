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

  async function onSubmit(values: LoginFormValues) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false, 
    });

    console.log("login", response);

    if (response?.error) {
      console.error(response.error); 
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login
        </h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-medium text-gray-700 dark:text-gray-300">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@whatever.com"
                  {...field}
                  className="border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
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
              <FormLabel className="text-[16px] font-medium text-gray-700 dark:text-gray-300">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
                  required
                  placeholder="Password"
                  minLength={6}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <p className="block text-center text-[16px] font-medium">
          Do not have an account? <Link href={"/register"}>Sign Up</Link>
        </p>

        <Button
          type="submit"
          className="w-full text-[16px] py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-300"
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
  );
};

export default LoginForm;
