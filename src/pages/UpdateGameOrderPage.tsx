import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UsersContext } from "@/model/userContext";
import { UpdateIcon } from "@radix-ui/react-icons";
import { updateGameOrder } from "@/service/gameOrder_service";
import Swal from "sweetalert2";

const UpdateGameOrderPage: React.FC = () => {
  const { gameOrderId } = useParams<{ gameOrderId: string }>();
  const UsersContextValue = React.useContext(UsersContext);
  const allUsers = UsersContextValue.users;
  const setAllUsers = UsersContextValue.setUsers;

  const findGameOrderById = (gameOrderId: string) => {
    for (let user of allUsers) {
      for (let gameOrder of user.gameOrders) {
        if (gameOrder.id === Number(gameOrderId)) {
          return gameOrder;
        }
      }
    }
  };

  const gameOrder = findGameOrderById(gameOrderId ?? "");

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
      name: gameOrder?.name,
      price: gameOrder?.price,
      description: gameOrder?.description,
    },
  });

  async function updateEntity(values: z.infer<typeof formSchema>) {
    const updatedEntity = {
      name: values.name,
      price: values.price,
      description: values.description,
    };

    for (let user of allUsers) {
      let isDone = false;
      for (let gameOrder of user.gameOrders) {
        if (gameOrder.id === Number(gameOrderId)) {
          gameOrder.name = updatedEntity.name;
          gameOrder.price = updatedEntity.price;
          gameOrder.description = updatedEntity.description;
          isDone = true;
          break;
        }
      }
      if (isDone) {
        break;
      }
    }

    setAllUsers([...allUsers]);
    updateGameOrder(Number(gameOrderId), updatedEntity);

    Swal.fire({
      title: "Game order updated successfully",
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game name</FormLabel>
                  <FormControl>
                    <Input placeholder={gameOrder?.name} {...field} />
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
                    <Input
                      type="number"
                      placeholder={gameOrder?.price?.toString()}
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder={gameOrder?.description} {...field} />
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

export default UpdateGameOrderPage;
