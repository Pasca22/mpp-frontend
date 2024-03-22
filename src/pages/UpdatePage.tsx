import React from "react";
import { useParams } from "react-router-dom";
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
import { UpdateIcon } from "@radix-ui/react-icons";

const UpdatePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const user = USERS.find((user) => user.id.toString() === userId);

  const formSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    ip: z.string(),
    avatar: z.string(),
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

  function updateEntity(values: z.infer<typeof formSchema>) {
    const index = USERS.findIndex((user) => user.id.toString() === userId);
    if (index === -1) {
      return;
    }

    if (
      values.username === "" ||
      values.email === "" ||
      values.password === "" ||
      values.ip === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    USERS[index] = {
      ...USERS[index],
      ...values,
    };

    alert("User updated successfully");
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
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
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
