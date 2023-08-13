import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { loadAllExpired } from "./api";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [];

function DenseTable() {
  const [expired, setExpired] = useState([]);

  useEffect(() => {
    loadAllExpiredItems();
  }, []);

  const loadAllExpiredItems = async () => {
    const loadedExpired = await loadAllExpired();
    setExpired(loadedExpired.data);
  };

  // const MyTableContainer=styled`
  //   margin-top: :100px;
  // `

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "30px" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bolder" }} align="center">
                Item Name
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bolder" }}>
                Expiry Date
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bolder" }}>
                Remaining Quantity
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bolder" }}>
                Removed On
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expired.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.expiry}</TableCell>
                <TableCell align="center">{item.remainingQuantity}</TableCell>
                <TableCell align="center">{item.removedOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DenseTable;
