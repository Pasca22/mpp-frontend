import React from "react";
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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { getCurrentUser, register } from "@/service/auth_service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsersContext } from "@/model/userContext";
import Swal from "sweetalert2";

const AddPage: React.FC = () => {
  const currentUser = getCurrentUser();
  let navigate: NavigateFunction = useNavigate();
  const allUsers = React.useContext(UsersContext).allUsers;
  const setAllUsers = React.useContext(UsersContext).setAllUsers;

  const formSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, {
        message:
          "Password must contain at least 8 characters, including uppercase, lowercase letters and numbers",
      })
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    // role: z.enum(["USER", "MODERATOR", "ADMIN"]),
    role: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

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

  const addEntity = (values: z.infer<typeof formSchema>) => {
    const role = [values.role];
    if (values.role === "MODERATOR") {
      role.push("USER");
    }
    register(values.username, values.email, values.password, role).then(
      (response) => {
        const user = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles,
        };
        setAllUsers([...allUsers, user]);
      }
    );
    Swal.fire({
      icon: "success",
      title: "User added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    form.reset();
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
        <div className="flex justify-center mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addEntity)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-xl">
                      Username
                    </FormLabel>
                    <FormControl className="w-80">
                      <Input placeholder="boss123" {...field} />
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
                    <FormLabel className="flex justify-start text-xl">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="lol@mai.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="max-w-80">
                    <FormLabel className="flex justify-start text-xl">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="CatDog3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-xl">
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="max-w-80">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="USER">USER</SelectItem>
                          <SelectItem value="MODERATOR">MODERATOR</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-green-500 hover:bg-green-600 px-10"
                type="submit"
              >
                <PlusCircledIcon className="w-6 h-6 mr-1" />
                Add
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddPage;
