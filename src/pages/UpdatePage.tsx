import React from "react";
import {
  Navigate,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateIcon } from "@radix-ui/react-icons";
import { updateUser } from "@/service/user_service";
import { UsersContext } from "@/model/userContext";
import Swal from "sweetalert2";
import { getCurrentUser } from "@/service/auth_service";

const UpdatePage: React.FC = () => {
  const currentUser = getCurrentUser();
  const { userId } = useParams<{ userId: string }>();
  const allUsers = React.useContext(UsersContext).allUsers;
  const setAllUsers = React.useContext(UsersContext).setAllUsers;
  let navigate: NavigateFunction = useNavigate();

  const user = allUsers.find((user) => user.id === Number(userId));

  const formSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  function updateEntity(values: z.infer<typeof formSchema>) {
    updateUser(Number(userId), values.username, values.email).then(
      (response) => {
        const user = response.data;
        const index = allUsers.findIndex((user) => user.id === Number(userId));
        setAllUsers((prev) => [
          ...prev.slice(0, index),
          user,
          ...prev.slice(index + 1),
        ]);
      }
    );

    Swal.fire({
      title: "User updated successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const signout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const userDetails = () => {
    navigate("/account");
  };

  const goToHome = () => {
    navigate("/home");
  };

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="font-mono">
        <header className="flex justify-end bg-gray-900 p-4">
          <span
            className="flex text-white text-lg mr-14 cursor-pointer hover:underline hover:underline-offset-2"
            onClick={goToHome}
          >
            Home
          </span>
          <span
            className="flex text-white text-lg mr-14 cursor-pointer hover:underline hover:underline-offset-2"
            onClick={userDetails}
          >
            My account
          </span>
          <span
            className="text-white text-lg mr-14 cursor-pointer hover:underline hover:underline-offset-2"
            onClick={signout}
          >
            Sign Out
          </span>
        </header>
        <div className="flex justify-center my-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateEntity)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-xl">
                      Username
                    </FormLabel>
                    <FormControl className="w-80">
                      <Input placeholder={user?.username} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form?.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-xl">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={user?.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                <UpdateIcon className="w-5 h-5 mr-1" />
                Update
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdatePage;
