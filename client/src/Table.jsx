import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getData } from "./api";
import { deleteData } from "./api";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SearchField = styled(TextField)`
  width: 200px;
`;

export const MyTable = (props) => {
  let idObj = {
    id: props.userId.id,
  };

  // console.log(props.userId.id);

  const [display, setDisplay] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allData, setAllData] = useState([]);
  const [open, setOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let resp = await getData();
    setDisplay(resp.data);
    deleteExpiredStock();
  };

  const deleteExpiredStock = () => {
    const date = new Date();
    const cMonth = date.toLocaleString("default", { month: "short" });
    const cYear = date.getFullYear();
  };

  const navigate = useNavigate();

  const navFunc = () => {
    navigate("/add", { state: idObj });
  };

  const handleSearch = (query) => {
    if (!query) {
      setDisplay(allData);
      return;
    }

    const filteredData = display.filter((item) => {
      const lowerCaseQuery = query.toLowerCase();
      return (
        item.company.toLowerCase().includes(lowerCaseQuery) ||
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        String(item.quantity).toLowerCase().includes(lowerCaseQuery) ||
        item.expiry.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setDisplay(filteredData);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);

    if (!query) {
      loadData();
    }
  };

  const handleDeleteConfirmation = (id) => {
    setProductIdToDelete(id);
    setOpen(true);
  };

  const handleDeleteCancel = () => {
    setProductIdToDelete(null);
    setOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setOpen(false);

    if (productIdToDelete) {
      await deleteData(productIdToDelete);
      loadData();
    }
  };

  const lowQuantityRow = {
    backgroundColor: "lightcoral",
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={navFunc} variant="contained">
          Add Stock
        </Button>
        <SearchField
          label="Search"
          variant="outlined"
          placeholder="&nbsp; search here..."
          size="small"
          style={{ width: "300px" }}
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
          }}
        />
      </div>

      <TableContainer
        component={Paper}
        style={{ marginTop: "30px", textAlign: "center" }}
      >
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{ fontSize: "1.1rem", textAlign: "center" }}
              >
                Company
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "1.1rem", textAlign: "center" }}
              >
                Name
              </StyledTableCell>

              <StyledTableCell
                style={{ fontSize: "1.1rem", textAlign: "center" }}
              >
                Quantity&nbsp;(pc.)
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "1.1rem", textAlign: "center" }}
              >
                Expiry Date
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "1.1rem", textAlign: "center" }}
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {display.map((item) => (
              <StyledTableRow
                key={item._id}
                style={item.quantity <= 15 ? lowQuantityRow : null}
              >
                <StyledTableCell style={{ textAlign: "center" }}>
                  {item.company}
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  {item.name}
                </StyledTableCell>

                {item.quantity <= 10 ? (
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {item.quantity}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {item.quantity}
                  </StyledTableCell>
                )}

                <StyledTableCell style={{ textAlign: "center" }}>
                  {item.expiry}
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    component={Link}
                    to={`/edit/${item._id}/${props.userId.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "8px" }}
                    onClick={() => {
                      handleDeleteConfirmation(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <Dialog
            open={open}
            onClose={handleDeleteCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this product?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Table>
      </TableContainer>
    </>
  );
};
