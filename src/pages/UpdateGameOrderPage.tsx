import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Navigate,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
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
import Swal from "sweetalert2";
import { getCurrentUser } from "@/service/auth_service";
import { updateGameOrder } from "@/service/user_service";

const UpdateGameOrderPage: React.FC = () => {
  const currentUser = getCurrentUser();
  let navigate: NavigateFunction = useNavigate();
  const { gameOrderId } = useParams<{ gameOrderId: string }>();
  const gameOrders = React.useContext(UsersContext).gameOrders;
  const setGameOrders = React.useContext(UsersContext).setGameOrders;

  const gameOrder = gameOrders.find(
    (gameOrder) => gameOrder.id === Number(gameOrderId)
  );

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

  function updateEntity(values: z.infer<typeof formSchema>) {
    updateGameOrder(Number(gameOrderId), values).then(() => {
      setGameOrders((prevGameOrders) =>
        prevGameOrders.map((gameOrder) =>
          gameOrder.id === Number(gameOrderId)
            ? { ...gameOrder, ...values }
            : gameOrder
        )
      );
    });

    Swal.fire({
      title: "Game order updated successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  }

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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start text-xl">
                      Game name
                    </FormLabel>
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
                    <FormLabel className="flex justify-start text-xl">
                      Price
                    </FormLabel>
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
                    <FormLabel className="flex justify-start text-xl">
                      Description
                    </FormLabel>
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
      </div>
    </>
  );
};

export default UpdateGameOrderPage;
