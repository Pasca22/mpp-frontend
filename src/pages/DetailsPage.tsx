import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/service/auth_service";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";

const DetailsPage: React.FC = () => {
  const currentUser = getCurrentUser();
  let navigate: NavigateFunction = useNavigate();
  const avatar = "https://www.w3schools.com/howto/img_avatar.png";

  const signout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const goToHome = () => {
    navigate("/home");
  };

  const isAdmin = currentUser?.roles.includes("ROLE_ADMIN");
  const isModerator = currentUser?.roles.includes("ROLE_MODERATOR");

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="font-mono">
        <header className="flex justify-end bg-gray-900 p-4">
          <span
            className="flex text-white text-lg mr-14 cursor-pointer"
            onClick={goToHome}
          >
            Home
          </span>
          <span
            className="text-white text-lg mr-14 cursor-pointer"
            onClick={signout}
          >
            Sign Out
          </span>
        </header>
        <div className="mt-6 mx-32">
          <h1 className="font-bold text-4xl">Account Details</h1>
        </div>
        {isAdmin && (
          <div className="flex justify-center items-center mt-8">
            <h1 className="text-2xl">You are an ADMIN</h1>
          </div>
        )}
        {isModerator && (
          <div className="flex justify-center items-center mt-8">
            <h1 className="text-2xl">You are a MODERATOR</h1>
          </div>
        )}
        <div className="flex justify-center items-center mt-8">
          <Card className="p-10 rounded-2xl border-2 shadow-xl hover:bg-slate-50">
            <CardHeader>
              <CardTitle>{currentUser?.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="py-1">
                <li className="py-1">Email: {currentUser?.email}</li>
                <li className="flex justify-center py-1">
                  <img
                    src={avatar}
                    alt={"No avatar"}
                    className="w-60 h-60 my-5 rounded-full"
                  />
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
