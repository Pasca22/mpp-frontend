import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersContext } from "@/model/userContext";
import { Button } from "@/components/ui/button";
import { getTableEntities } from "@/service/gameOrder_service";

const BigTable: React.FC = () => {
  const table = React.useContext(UsersContext).table;
  const setTable = React.useContext(UsersContext).setTable;
  const tablePage = React.useContext(UsersContext).tablePage;
  const setTablePage = React.useContext(UsersContext).setTablePage;

  const fetchTable = async () => {
    const newTable = await getTableEntities(tablePage + 1);
    setTablePage(tablePage + 1);
    setTable([...table, ...newTable]);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game Order ID</TableHead>
            <TableHead>Game Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.map((entity) => (
            <TableRow key={entity.gameOrderId}>
              <TableCell className="font-medium">
                {entity.gameOrderId}
              </TableCell>
              <TableCell>{entity.gameName}</TableCell>
              <TableCell>{entity.description}</TableCell>
              <TableCell>{entity.userId}</TableCell>
              <TableCell>{entity.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-5" onClick={fetchTable}>
        More...
      </Button>
    </>
  );
};

export default BigTable;
