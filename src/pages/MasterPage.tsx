import { Button } from "@/components/ui/button";
import React from "react";
import { USERS, USERS as initialUsers, User } from "@/model/user";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  PlusCircledIcon,
  CrossCircledIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MyChart from "@/components/ui/my_chart";
import { deleteUser } from "@/service/user_service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MasterPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  useEffect(() => {
    usersByPage();
  }, [currentPage]);

  function usersByPage() {
    const indexOfFirstUser = (currentPage - 1) * usersPerPage;
    const indexOfLastUser = indexOfFirstUser + usersPerPage;
    const currentUsers = USERS.slice(indexOfFirstUser, indexOfLastUser);
    setUsers(currentUsers);
  }

  function pressNext() {
    if (currentPage >= Math.ceil(initialUsers.length / usersPerPage)) {
      return;
    }
    setCurrentPage(currentPage + 1);
    usersByPage();
  }

  function pressBack() {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    usersByPage();
  }

  function deleteEntity(userId: number) {
    const index = USERS.findIndex((user) => user.id === userId);
    if (index === -1) {
      return;
    }

    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    USERS.splice(index, 1);
    deleteUser(userId);
    setUsers(updatedUsers);
    usersByPage();
  }

  function sortByName() {
    const sortedUsers = [...users].sort((a, b) =>
      a.username.localeCompare(b.username)
    );
    setUsers(sortedUsers);
  }

  return (
    <>
      <h1 className="text-5xl text-center font-bold mt-2 mb-6">Users List</h1>
      <div className="flex justify-center">
        <ul>
          <li key={"add_button"}>
            <Link to="/add">
              <Button className="bg-green-500 hover:bg-green-600">
                <PlusCircledIcon className="w-6 h-6 mr-1" />
                Add new entity
              </Button>
            </Link>
          </li>
          <li>
            <Button className="mt-3" onClick={sortByName}>
              Sort by name
            </Button>
          </li>
          {users.map((user) => (
            <li key={user.id} className="my-4">
              <Card
                key={user.id}
                className="rounded-2xl px-20 border-2 shadow-xl hover:bg-slate-100"
              >
                <CardHeader>
                  <CardTitle>{user.username}</CardTitle>
                  <CardDescription>Email: {user.email}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Link to={`/${user.id}`}>
                    <Button className="bg-sky-600 mx-2 hover:bg-sky-700">
                      More...
                    </Button>
                  </Link>
                  <Link to={`/update/${user.id}`}>
                    <Button className="mx-2 ">
                      <UpdateIcon className="w-5 h-5 mr-1" />
                      Update
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-600 mx-2  hover:bg-red-900"
                    onClick={() => deleteEntity(user.id)}
                  >
                    <CrossCircledIcon className="w-6 h-6 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
          <li className="flex justify-around items-center mt-3">
            <MyChart usersOnPage={users} />
          </li>
          <li className="flex justify-around items-center mt-3">
            <Button onClick={pressBack}>Back</Button>
            <p>{currentPage}</p>
            <Button onClick={pressNext}>Next</Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MasterPage;
