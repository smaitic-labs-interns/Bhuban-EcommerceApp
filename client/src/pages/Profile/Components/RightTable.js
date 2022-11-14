import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, Typography } from "@mui/material";
import { DataCell } from "../styles/RightTableStyle";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function RightTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow allign="right">
            <TableCell sx={{ border: "none" }}>Recent Orders</TableCell>
          </TableRow>
          <TableRow sx={{ background: "#fafafa" }}>
            <TableCell sx={{ borderColor: "#eff0f5" }}>Order #</TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              Placed On
            </TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              Items
            </TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              Items
            </TableCell>
            <TableCell
              sx={{ borderColor: "#eff0f5" }}
              align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <DataCell component="th" scope="row">
                {row.name}
              </DataCell>
              <DataCell align="right">{row.calories}</DataCell>
              <DataCell align="right">{row.fat}</DataCell>
              <DataCell align="right">{row.carbs}</DataCell>
              <DataCell align="right">
                <Link underline="none" sx={{ cursor: "pointer" }}>
                  <Typography
                    sx={{
                      color: "#1a9cb7",
                      fontSize: "14px",
                      lineHeight: 1.28571,
                    }}>
                    Manage
                  </Typography>
                </Link>
              </DataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
