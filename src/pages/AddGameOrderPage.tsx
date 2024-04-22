import React from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { addGameOrder } from "@/service/gameOrder_service";
import { UsersContext } from "@/model/userContext";
import Swal from "sweetalert2";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const AddGameOrderPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const UsersContextValue = React.useContext(UsersContext);
  const allUsers = UsersContextValue.users;
  const setAllUsers = UsersContextValue.setUsers;

  const user = allUsers.find((user) => user.id.toString() === userId);

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

  async function addEntity(values: z.infer<typeof formSchema>) {
    const newEntity = {
      name: values.name,
      price: values.price,
      description: values.description,
    };

    const newGameOrder = await addGameOrder(Number(userId), newEntity);
    user?.gameOrders.push(newGameOrder);
    setAllUsers([...allUsers]);

    Swal.fire({
      title: "Game order added successfully",
      icon: "success",
    });
  }
  return (
    <>
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addEntity)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game name</FormLabel>
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
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
                  <FormLabel>Description</FormLabel>
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
    </>
  );
};

export default AddGameOrderPage;
