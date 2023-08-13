// PrintableView.js

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const PrintableView = ({ selectedItems, billAmt, name, contact, disc }) => {
  const afterRemoval = (billAmt * disc) / 100;
  const deduct = billAmt - afterRemoval;
  const styles = {
    table: {
      minWidth: 650,
      border: "1px solid black",
    },
    cell: {
      textAlign: "center", // Align cell content to the center
      border: "1px solid black", // Add border to each cell
    },
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Pranjal Medical</h1>
      <p>Name: {name}</p>
      <p>Contact: {contact}</p>

      <TableContainer component={Paper}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell style={styles.cell}>Item Name</TableCell>
              <TableCell style={styles.cell}>Quantity</TableCell>
              <TableCell style={styles.cell}>Price</TableCell>
              <TableCell style={styles.cell}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={styles.cell}>{item.name}</TableCell>
                <TableCell style={styles.cell}>{item.quantity}</TableCell>
                <TableCell style={styles.cell}>{item.price}</TableCell>
                <TableCell style={styles.cell}>{item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>Original Amount: {billAmt.toFixed(2)}</p>
      <p>Total Less {afterRemoval.toFixed(2)}</p>
      <p>After Discount Amount: {deduct.toFixed(2)}</p>
      <p style={{ textAlign: "center" }}>
        ----------------------------------------------------------------------------
      </p>
      <h5 style={{ textAlign: "center" }}>Thank You For Purchasing!!</h5>
    </div>
  );
};

export default PrintableView;
