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
import { getCurrentUser, login } from "@/service/auth_service";
import Swal from "sweetalert2";
import { UsersContext } from "@/model/userContext";
import {
  getGameOrders,
  getGameOrdersForAdmin,
  getUsersForAdmin,
} from "@/service/user_service";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const setGameOrders = React.useContext(UsersContext).setGameOrders;
  const setAllUsers = React.useContext(UsersContext).setAllUsers;
  const setIsDataRetrieved = React.useContext(UsersContext).setIsDataRetrieved;

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (formValues: any) => {
    const { username, password } = formValues;
    login(username, password).then(
      () => {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.roles.includes("ROLE_ADMIN")) {
          getGameOrdersForAdmin().then((response) => {
            setGameOrders(response.data);
          });
          getUsersForAdmin().then((response) => {
            setAllUsers(response.data);
          });
        } else if (currentUser) {
          getGameOrders(currentUser.id).then((response) => {
            setGameOrders(response.data);
          });
        }
        setIsDataRetrieved(true);
        navigate("/home");
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.response.data.message,
        });
      }
    );
  };

  return (
    <div className="flex min-h-screen font-mono">
      <div className="w-1/2 flex flex-col p-8 bg-gray-900 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-4xl">GameVault</span>
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <img src={logoGameVault} alt="GameVault Logo" className="w-1/2" />
        </div>
        <div className="mt-auto">
          <h2 className="text-3xl font-semibold mb-4">Welcome back!</h2>
          <p className="text-xl mb-4">
            "Order all your favorite games and don't stress about paying for
            them."
          </p>
          <p className="font-bold">Jordan Reed</p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-800 text-white p-8">
        <div className="max-w-sm w-full text-center">
          <h2 className="text-3xl font-semibold mb-4">Log in</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
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
              <Button type="submit" className="w-full p-3 mb-4">
                Log In
              </Button>
            </form>
          </Form>
          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="underline cursor-pointer">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
