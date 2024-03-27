import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { User } from "@/model/user";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  usersOnPage: User[];
};

const MyChart: React.FC<Props> = (listOfUsers) => {
  type lengthMap = {
    [key: string]: number;
  };

  function usernameByNrOfCharacters(users: Props["usersOnPage"]): lengthMap {
    const usersLength: lengthMap = {};
    for (let i = 0; i < users.length; i++) {
      if (users[i].username.length in usersLength) {
        usersLength[users[i].username.length] += 1;
      } else {
        usersLength[users[i].username.length] = 1;
      }
    }
    return usersLength;
  }

  const chart_data = {
    labels: Object.keys(usernameByNrOfCharacters(listOfUsers.usersOnPage)),
    datasets: [
      {
        label: "Usernames by number of character",
        data: Object.values(usernameByNrOfCharacters(listOfUsers.usersOnPage)),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Bar data={chart_data} />
    </>
  );
};

export default MyChart;
