import React from "react";
import { useParams } from "react-router-dom";
import { USERS, User } from "@/model/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById } from "@/service/user_service";

const DetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const user = USERS.find((user) => user.id.toString() === userId);

  // const [user, setUser] = React.useState<User | null>(null);

  // React.useEffect(() => {
  //   const fetchUser = async () => {
  //     const fetchedUser = await getUserById(Number(userId));
  //     setUser(fetchedUser);
  //   };

  //   fetchUser();
  // }, [userId]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="p-10 rounded-2xl border-2 shadow-xl hover:bg-slate-100">
          <CardHeader>
            <CardTitle>{user?.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="py-1">
              <li className="py-1">Email: {user?.email}</li>
              <li className="py-1">Password: {user?.password}</li>
              <li className="py-1">IP: {user?.ip}</li>
              <li className="flex justify-center py-1">
                <img src={user?.avatar} alt={"No avatar"} />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DetailsPage;
