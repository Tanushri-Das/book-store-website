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

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    defaultValues: {},
  });

  async function onSubmit(values: RegisterFormValues) {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log(data);

    if (data.error) {
      console.error(data.error);
    } else {
      router.push("/login");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
          Registration
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-medium text-gray-700 dark:text-gray-300">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
                  required
                  placeholder="Confirm Password"
                  minLength={6}
                  onBlur={(e) => {
                    const password = form.getValues("password");
                    if (e.target.value !== password) {
                      form.setError("confirmPassword", {
                        type: "manual",
                        message: "The passwords did not match",
                      });
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <p className="block text-center text-[16px] font-medium">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </p>
        <Button
          type="submit"
          className="w-full text-[16px] py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-300"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
