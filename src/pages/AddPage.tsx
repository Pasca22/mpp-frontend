import React from "react";
import { USERS } from "@/constants/user";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const AddPage: React.FC = () => {
  const formSchema = z.object({
    id: z.coerce.number(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    ip: z.string(),
    dog_name: z.string(),
    avatar: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: -1,
      username: "",
      email: "",
      password: "",
      ip: "",
      dog_name: "",
      avatar: "",
    },
  });

  function addEntity(values: z.infer<typeof formSchema>) {
    const userExists = USERS.find((user) => user.id === values.id);
    if (userExists) {
      alert("User already exists");
      return;
    }

    if (
      values.id < 1 ||
      values.username === "" ||
      values.email === "" ||
      values.password === "" ||
      values.ip === "" ||
      values.dog_name === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    USERS.push({
      ...values,
    });
    alert("User added successfully");
  }

  return (
    <>
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addEntity)} className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start">ID</FormLabel>
                  <FormControl className="w-80">
                    <Input placeholder="69696969" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start">Username</FormLabel>
                  <FormControl className="w-80">
                    <Input placeholder="boss123" {...field} />
                  </FormControl>
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="catdog3" {...field} />
                  </FormControl>
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
