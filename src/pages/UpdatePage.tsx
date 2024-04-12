import React from "react";
import { useParams } from "react-router-dom";
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

const UpdatePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const UsersContextValue = React.useContext(UsersContext);
  const allUsers = UsersContextValue.users;
  const setAllUsers = UsersContextValue.setUsers;

  const user = allUsers.find((user) => user.id.toString() === userId);

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
    ip: z.string().min(1).ip(),
    avatar: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password,
      ip: user?.ip,
      avatar: user?.avatar,
    },
  });

  async function updateEntity(values: z.infer<typeof formSchema>) {
    const updatedUser = await updateUser(Number(userId), values);
    setAllUsers(
      allUsers.map((user) => (user.id === Number(userId) ? updatedUser : user))
    );
    Swal.fire({
      title: "User updated successfully",
      icon: "success",
    });
  }

  return (
    <>
      <div className="flex justify-center">
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
                  <FormLabel className="flex justify-start">Username</FormLabel>
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
                  <FormLabel className="flex justify-start">Email</FormLabel>
                  <FormControl>
                    <Input placeholder={user?.email} {...field} />
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
                  <FormLabel className="flex justify-start">Password</FormLabel>
                  <FormControl>
                    <Input placeholder={user?.password} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start">IP</FormLabel>
                  <FormControl>
                    <Input placeholder={user?.ip} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start">Avatar</FormLabel>
                  <FormControl>
                    <Input placeholder={user?.avatar} {...field} />
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
    </>
  );
};

export default UpdatePage;
