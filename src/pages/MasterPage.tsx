import { Button } from "@/components/ui/button";
import React from "react";
import { USERS } from "@/constants/user";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const MasterPage: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-44 place-content-center h-screen max-w-6/12">
        {USERS.map((user) => (
          <Card
            key={user.userId}
            className="rounded-2xl border-2 shadow-xl hover:bg-slate-200"
          >
            <CardHeader>
              <CardTitle>{user.username}</CardTitle>
              <CardDescription>Email: {user.email}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Link to={`/update/${user.userId}`}>
                <Button>Update</Button>
              </Link>
              <Link to={`/${user.userId}`}>
                <Button className="bg-sky-600 hover:bg-sky-700">Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MasterPage;
