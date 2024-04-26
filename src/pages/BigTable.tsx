import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersContext } from "@/model/userContext";
import { getTableEntities } from "@/service/gameOrder_service";
import InfiniteScroll from "react-infinite-scroll-component";

const BigTable: React.FC = () => {
  const table = React.useContext(UsersContext).table;
  const setTable = React.useContext(UsersContext).setTable;
  const tablePage = React.useContext(UsersContext).tablePage;
  const setTablePage = React.useContext(UsersContext).setTablePage;
  const [hasMore, setHasMore] = React.useState(true);

  useEffect(() => {
    fetchTable();
  }, []);

  const fetchTable = async () => {
    const newTable = await getTableEntities(tablePage + 1);
    setTablePage(tablePage + 1);
    setTable([...table, ...newTable]);
    setHasMore(newTable.length > 0);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={table.length}
        next={fetchTable}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
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
      </InfiniteScroll>
    </>
  );
};

export default BigTable;
