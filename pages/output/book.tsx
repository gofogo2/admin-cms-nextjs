import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { NextPage } from "next";
import useMutation from "@libs/client/userMutation";
import useBookDonation from "@libs/client/useBookDonation";
import { request } from "http";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Book: NextPage = () => {
  const { bookDonations, isLoading } = useBookDonation();

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "UserID",
      headerName: "User ID",
      width: 300,
      align: "left",
    },
    {
      field: "UserEmail",
      headerName: "User Email",
      width: 500,
      align: "left",
    },
    {
      field: "Create",
      headerName: "Creation Time",
      width: 300,
      align: "left",
    },
  ];

  return (
    <DataGrid
      rows={bookDonations == undefined ? [] : bookDonations}
      columns={columns}
      loading={isLoading}
      pageSize={20}
      autoHeight
      components={{
        Toolbar: CustomToolbar,
      }}
    />
  );
};
export default Book;
