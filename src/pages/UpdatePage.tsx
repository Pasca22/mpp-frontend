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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateIcon } from "@radix-ui/react-icons";
import { updateUser } from "@/service/user_service";
import { Errors, userValidation } from "@/validations/userValidation";
import { UsersContext } from "@/App";

const UpdatePage: React.FC = () => {
  const [errors, setErrors] = React.useState<Errors>({});
  const { userId } = useParams<{ userId: string }>();

  const UsersContextValue = React.useContext(UsersContext);
  const allUsers = UsersContextValue.users;

  const user = allUsers.find((user) => user.id.toString() === userId);

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
    const index = allUsers.findIndex((user) => user.id.toString() === userId);
    if (index === -1) {
      return;
    }

    const updateUserValues = {
      id: index,
      ...values,
    };
    const currentErrors = userValidation(updateUserValues, true);
    setErrors(currentErrors);

    if (
      currentErrors.id ||
      currentErrors.username ||
      currentErrors.email ||
      currentErrors.password ||
      currentErrors.ip
    ) {
      return;
    }

    allUsers[index] = {
      ...allUsers[index],
      ...values,
    };

    updateUser(Number(userId), allUsers[index]);

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
                    <Input placeholder={user?.username} {...field} />
                  </FormControl>
                  {errors.username && (
                    <p className="text-rose-600 flex content-start">
                      {errors.username}
                    </p>
                  )}
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
                  {errors.email && (
                    <p className="text-rose-600 flex content-start">
                      {errors.email}
                    </p>
                  )}
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
                  {errors.password && (
                    <p className="text-rose-600 flex content-start">
                      {errors.password}
                    </p>
                  )}
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
                  {errors.ip && (
                    <p className="text-rose-600 flex content-start">
                      {errors.ip}
                    </p>
                  )}
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
