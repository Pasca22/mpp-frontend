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
import { addUser } from "@/service/user_service";
import { UsersContext } from "@/model/userContext";

const AddPage: React.FC = () => {
  const UsersContextValue = React.useContext(UsersContext);
  const allUsers = UsersContextValue.users;
  const setAllUsers = UsersContextValue.setUsers;

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
      username: "",
      email: "",
      password: "",
      ip: "",
      avatar: "",
    },
  });

  async function addEntity(values: z.infer<typeof formSchema>) {
    const newUser = await addUser(values);
    setAllUsers([...allUsers, newUser]);
    alert("User added successfully");
  }

  return (
    <>
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addEntity)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start">Username</FormLabel>
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
                  <FormLabel className="flex justify-start">Email</FormLabel>
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
                  <FormLabel className="flex justify-start">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="catdog3" {...field} />
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
                    <Input placeholder="172.0.0.5" {...field} />
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
                    <Input placeholder="good luck" {...field} />
                  </FormControl>
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
    </>
  );
};

export default AddPage;
