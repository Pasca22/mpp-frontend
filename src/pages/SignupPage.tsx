import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import logoGameVault from "@/assets/logoGameVault.png";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { register } from "@/service/auth_service";

const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupPage: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (formValues: any) => {
    const { username, email, password } = formValues;
    const role = ["USER"];
    register(username, email, password, role).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="flex min-h-screen font-mono">
      <div className="w-1/2 flex flex-col p-8 bg-gray-900 text-white">
        <div className="flex justify-between items-center ">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-4xl">GameVault</span>
          </div>
        </div>

        <div className="flex justify-center mt-auto">
          <img src={logoGameVault} alt="GameVault Logo" className="w-1/2" />
        </div>
        <div className="mt-auto">
          <h2 className="text-3xl font-semibold mb-4">Sign up now!</h2>
          <p className="text-xl mb-4">
            "This game library has saved me countless of dollars and hours of
            boredom."
          </p>
          <p className="font-bold">Tim Brown</p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-800 text-white p-8">
        <div className="max-w-sm w-full text-center">
          <h2 className="text-3xl font-semibold mb-4">Create an account</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-black"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        className="w-full p-3 rounded mb-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="w-full p-3 rounded mb-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        className="w-full p-3 rounded mb-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                        className="w-full p-3 rounded mb-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full p-3 mb-4">
                Sign Up
              </Button>
            </form>
          </Form>
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <Link to="/">
              <span className="underline cursor-pointer">Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
