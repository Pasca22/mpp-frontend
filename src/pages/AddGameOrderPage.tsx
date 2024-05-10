import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/service/auth_service";
import { UsersContext } from "@/model/userContext";
import { addGameOrder } from "@/service/user_service";
import Swal from "sweetalert2";

const AddGameOrderPage: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const currentUser = getCurrentUser();
  const gameOrders = React.useContext(UsersContext).gameOrders;
  const setGameOrders = React.useContext(UsersContext).setGameOrders;

  const formSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Game name must be at least 3 characters" }),
    price: z.coerce.number().min(0, { message: "Price must be at least 0" }),
    description: z
      .string()
      .min(3, { message: "Game description must be at least 3 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });

  if (!currentUser) {
    return <Navigate to="/" replace />;
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

  const addGameOrderEvent = (formValues: z.infer<typeof formSchema>) => {
    addGameOrder(currentUser.id, formValues).then((response) => {
      setGameOrders([...gameOrders, response.data]);
      Swal.fire({
        icon: "success",
        title: "Game order added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

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
            <form
              onSubmit={form.handleSubmit(addGameOrderEvent)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-xl">
                      Game name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter game name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-xl">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-xl">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-10"
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

export default AddGameOrderPage;
