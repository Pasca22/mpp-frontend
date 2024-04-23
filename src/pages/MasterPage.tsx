import { Button } from "@/components/ui/button";
import React from "react";
import { User } from "@/model/user";
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
import { UsersContext } from "@/model/userContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MasterPage: React.FC = () => {
  const users = React.useContext(UsersContext).users;
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  useEffect(() => {
    usersByPage();
  }, [currentPage, users]);

  function usersByPage() {
    const indexOfFirstUser = (currentPage - 1) * usersPerPage;
    const indexOfLastUser = indexOfFirstUser + usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    setDisplayedUsers(currentUsers);
  }

  function pressNext() {
    if (currentPage >= Math.ceil(users.length / usersPerPage)) {
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
    const index = users.findIndex((user) => user.id === userId);

    users.splice(index, 1);
    deleteUser(userId);
    usersByPage();
  }

  function sortByName() {
    const sortedUsers = [...displayedUsers].sort((a, b) =>
      a.username.localeCompare(b.username)
    );
    setDisplayedUsers(sortedUsers);
  }

  return (
    <>
      <h1 className="text-5xl text-center font-bold mt-2 mb-6">Users List</h1>
      <div className="flex justify-center">
        <ul>
          <li key={"table_button"} className="mb-3">
            <Link to="/table">
              <Button>Big Table</Button>
            </Link>
          </li>
          <li key={"add_button"}>
            <Link to="/add-user">
              <Button className="bg-green-500 hover:bg-green-600">
                <PlusCircledIcon className="w-6 h-6 mr-1" />
                Add new User
              </Button>
            </Link>
          </li>
          <li>
            <Button className="mt-3" onClick={sortByName}>
              Sort by name
            </Button>
          </li>
          {displayedUsers.map((user) => (
            <li key={user.id} className="my-4">
              <Card
                key={user.id}
                className="rounded-2xl px-20 border-2 shadow-xl hover:bg-slate-50"
              >
                <CardHeader>
                  <CardTitle>{user.username}</CardTitle>
                  <CardDescription>Email: {user.email}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Link to={`/user/${user.id}`}>
                    <Button className="bg-sky-600 mx-2 hover:bg-sky-700">
                      More...
                    </Button>
                  </Link>
                  <Link to={`/update-user/${user.id}`}>
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
            <MyChart usersOnPage={displayedUsers} />
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
