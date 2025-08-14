import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useContext } from "react";
import { PowerDataContext } from "../../services/powerDataContext";

const PowerData = () => {
  const { powerData } = useContext(PowerDataContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "user", headerName: "UserID", flex: 1 },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "generation_mw",
      headerName: "Energy Generation",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.generation_mw}
        </Typography>
      ),
    },
    {
      field: "consumption_mw",
      headerName: "Consumption",
      flex: 1,
    },
    {
      field: "distribution_loss",
      headerName: "Energy Loss",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.redAccent[500]}>
          {params.row.distribution_loss}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="POWER DATA" subtitle="List of Power Data Records" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={powerData} columns={columns} />
      </Box>
    </Box>
  );
};

export default PowerData;
