"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="text-2xl font-semibold">Registration</h1>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} required />
              </FormControl>
              <FormDescription>This is your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@whatever.com"
                  {...field}
                  required
                  pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                />
              </FormControl>
              <FormDescription>
                This is your email used to sign in to our app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} required minLength={6} />
              </FormControl>
              <FormDescription>
                This is your password used to sign in to our app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  required
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
              <FormDescription>Please confirm your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link className="block" href={"/login"}>
          Already have an account?
        </Link>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
