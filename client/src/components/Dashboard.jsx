import Box from "@mui/material/Box";
import {
  TextField,
  Typography,
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { SideNav } from "./SideNav";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import "../Dash.css";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PrintableView from "./PrintableView";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import CreditCardTwoToneIcon from "@mui/icons-material/CreditCardTwoTone";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";

import { useLocation } from "react-router-dom";
import { loadMeds } from "../api";
import { loadPrices } from "../api";
import { updateQuantity } from "../api";
import { useState, useEffect } from "react";

// import { Chart } from '../Chart';

export const Dashboard = () => {
  const [medNames, setMedNames] = useState([]);
  const [compareQuant, setCompareQuant] = useState(0);

  const location = useLocation();

  useEffect(() => {
    loadAllItems();
    // myPricing();
  }, []);

  const loadAllItems = async () => {
    // console.log("loading..");
    const rs = await loadMeds();
    // console.log(rs.data);
    setMedNames(rs.data);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [priceArr, setPriceArr] = useState([]);
  const [selectedMyItems, setSelectedMyItems] = useState();
  const [billItem, setBillItem] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [billBool, setBillBool] = useState(false);
  const [billAmt, setBillAmt] = useState(0);
  const [billName, setBillName] = useState("");
  const [billContact, setBillContact] = useState("");
  const [billDisc, setBillDisc] = useState(0);

  const myNames = [];

  medNames.map((item) => {
    myNames.push({
      name: item.name,
      quantity: item.quantity,
    });
  });

  const myFunc = async (event, newValue) => {
    if (newValue === null) {
      setBillItem(""); // Clear the billItem when Autocomplete is cleared
    } else {
      // console.log(newValue.name);
      setBillItem(newValue.name != null ? newValue.name : "");

      const selectedItemPrice = await fetchPriceByName(newValue.name);
      const selectedItemStockQuantity = await fetchQuantityByName(
        newValue.name
      );

      setCompareQuant(selectedItemStockQuantity);

      const selectedItemId = await fetchIdByName(newValue.name);

      console.log(selectedItemId);

      // Store the item name and quantity in selectedItems state
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        {
          name: newValue.name,
          quantity: 1,
          price: selectedItemPrice || 0,
          stockQuantity: selectedItemStockQuantity || 0,
          stockId: selectedItemId || 0,
        },
      ]);
    }
  };

  const fetchQuantityByName = async (itemName) => {
    let qty = await loadPrices();

    const myQty = qty.data.find((i) => i.name === itemName);
    return myQty ? myQty.quantity : 0;
  };

  const fetchPriceByName = async (itemName) => {
    let prices = await loadPrices();
    // console.log(prices.data);
    const selectedItem = prices.data.find((item) => item.name === itemName);
    return selectedItem ? selectedItem.price : 0;
  };

  const fetchIdByName = async (itemName) => {
    let ids = await loadPrices();
    console.log(ids.data);
    const myIds = ids.data.find((it) => it.name === itemName);
    console.log(myIds);
    return myIds ? myIds._id : 0;
  };

  const handleRemoveItem = (indexToRemove) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((_, index) => index !== indexToRemove)
    );
  };

  const myPricing = async () => {
    setInvoiceGenerated(true);
    const updatedSelectedItems = selectedItems.map((item) => ({
      ...item,
      amount: item.quantity * item.price,
    }));

    setSelectedItems(updatedSelectedItems);
    setBillBool(false);
  };

  let sum = 0;
  const calculateBill = () => {
    // console.log(selectedItems);

    selectedItems.map((item) => {
      console.log(item.amount);
      sum += item.amount;
    });
    // console.log(sum);
    setBillBool(true);
    setBillAmt(sum);
    // console.log(billAmt);
  };

  const handlePrint = () => {
    console.log();

    const printableArea = document.getElementById("printable-area");

    // Open the print dialog with the PrintableView content
    if (printableArea) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(printableArea.innerHTML);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }

    // console.log(selectedItems);
    // console.log(selectedItems[0].quantity);
    const finalQuantity =
      selectedItems[0].stockQuantity - selectedItems[0].quantity;
    updateQuant(finalQuantity, selectedItems[0].stockId);
  };

  const updateQuant = async (fQuantity, pid) => {
    console.log(fQuantity);
    await updateQuantity(fQuantity, pid);
  };

  const compareQuantities = (event) => {
    if (event.target.value > compareQuant) {
      setDialogOpen(true);
      // alert(`Only ${compareQuant} Available In The Stock`);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  return (
    <>
      <div className="bgColor">
        <Navbar userId={location.state} />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <SideNav userId={location.state} />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container>
              <Grid item xs={8}>
                <Stack spacing={2} direction="row">
                  <Card
                    sx={{ minWidth: 48 + "%", height: 151 }}
                    className="gradient"
                  >
                    <CardContent>
                      <div>
                        <CreditCardTwoToneIcon style={{ color: "white" }} />
                      </div>
                      <Typography
                        style={{ color: "white", marginTop: "10px" }}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        $500.00
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Order
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{ minWidth: 48 + "%", height: 151 }}
                    className="gradientLight"
                  >
                    <CardContent>
                      <div>
                        <ShoppingBagTwoToneIcon style={{ color: "white" }} />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ color: "white", marginTop: "10px" }}
                      >
                        $900.00
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total Earnings
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
                <Box height={20} />
                <Card sx={{ height: 300 + "vh", width: 98 + "%" }}>
                  <div
                    style={
                      {
                        // display: "flex",
                      }
                    }
                  >
                    <CardContent>
                      <Autocomplete
                        options={myNames}
                        getOptionLabel={(option) => option.name}
                        style={{ width: "650px" }}
                        value={selectedMyItems}
                        size="small"
                        onChange={(event, newValue) => {
                          setSelectedMyItems(newValue != null ? newValue : "");
                          myFunc(event, newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search here"
                            variant="outlined"
                            placeholder="Search here"
                          />
                        )}
                      />
                    </CardContent>
                  </div>

                  <Typography
                    gutterBottom
                    variant="h5"
                    style={{ marginLeft: "20px" }}
                  >
                    Purchases
                  </Typography>
                  <Divider />
                  <List sx={style} component="nav" aria-label="mailbox folders">
                    {selectedItems.map((item, index) => (
                      <ListItem key={index} style={{ width: "700px" }}>
                        {/* Display both item name and quantity */}
                        <ListItemText
                          style={{ padding: "0px 15px" }}
                          primary={`${item.name}`}
                          secondary={
                            <div>
                              <span>Qty: {item.quantity}</span>
                              <span style={{ marginLeft: "15px" }}>
                                Price (pc.): {item.price.toFixed(2)}
                              </span>
                            </div>
                          }
                        />
                        
                        <TextField
                          style={{ height: "40px" }}
                          size="small"
                          type="number"
                          defaultValue={item.quantity}
                          inputProps={{ min: 1 }}
                          onChange={(event) => {
                            const newQuantity = parseInt(
                              event.target.value,
                              10
                            );

                            const newAmount = parseInt(
                              item.price * newQuantity
                            );

                            setSelectedItems((prevSelectedItems) =>
                              prevSelectedItems.map((prevItem, i) =>
                                i === index
                                  ? {
                                      ...prevItem,
                                      quantity: newQuantity,
                                      amount: newAmount,
                                    }
                                  : prevItem
                              )
                            );

                            compareQuantities(event);
                          }}
                        />

                        <IconButton
                          aria-label="delete"
                          style={{
                            color: "red",
                            marginTop: "5px",
                            marginLeft: "9px",
                          }}
                          onClick={() => handleRemoveItem(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                    <Divider />
                    <Button
                      variant="contained"
                      color="success"
                      style={{ marginTop: "14px", marginLeft: "30px" }}
                      // onClick={() => setInvoiceGenerated(true)}
                      onClick={() => myPricing()}
                      size="small"
                    >
                      Bill Invoice
                    </Button>
                  </List>
                </Card>
              </Grid>

              <Grid item xs={4}>
                {/* sx={{ minWidth: 40 + "%", height: 151 }} */}
                <Card sx={{ height: 256 + "vh", width: "360px" }}>
                  <CardContent>
                    <Stack direction={"row"}>
                      <ReceiptIcon
                        style={{
                          marginTop: "19px",
                          marginRight: "4px",
                          color: "blue",
                        }}
                      />
                      <h3 style={{ marginBottom: "3px" }}>Bill Invoice</h3>
                    </Stack>

                    <Grid container spacing={2} style={{ marginTop: "0px" }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setBillName(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setBillContact(event.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="% Discount"
                          variant="outlined"
                          size="small"
                          onChange={(event) => {
                            setBillDisc(event.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                    {invoiceGenerated && (
                      <>
                        <br />
                        <Typography
                          gutterBottom
                          variant="p"
                          style={{ fontSize: "1.3rem", color: "green" }}
                        >
                          Invoice Items:
                        </Typography>
                        {{ billBool } ? (
                          <List
                            sx={style}
                            component="nav"
                            aria-label="invoice items"
                          >
                            {selectedItems.map((item, index) => (
                              <ListItem key={index}>
                                <ListItemText
                                  primary={item.name}
                                  secondary={
                                    <div>
                                      <span>Qty: {item.quantity}</span>
                                      <span style={{ marginLeft: "120px" }}>
                                        Amount: {item.amount}
                                      </span>
                                    </div>
                                  }
                                />
                              </ListItem>
                            ))}

                            <p style={{ color: "green", fontSize: "1.2rem" }}>
                              <span style={{ fontWeight: "bolder" }}>
                                Total Amt. {billAmt.toFixed(2)}/-
                              </span>
                            </p>
                          </List>
                        ) : (
                          <List
                            sx={style}
                            component="nav"
                            aria-label="invoice items"
                          >
                            {selectedItems.map((item, index) => (
                              <ListItem key={index}>
                                <ListItemText
                                  primary={item.name}
                                  secondary={
                                    <div>
                                      <span>Qty: {item.quantity}</span>
                                      <span style={{ marginLeft: "160px" }}>
                                        Amount: {item.amount}
                                      </span>
                                    </div>
                                  }
                                />
                              </ListItem>
                            ))}
                            <p>
                              -----------------------------------------------------------------
                            </p>
                          </List>
                        )}

                        <Button
                          variant="contained"
                          color="info"
                          size="small"
                          onClick={() => calculateBill()}
                        >
                          {/* <PictureAsPdfIcon /> */}
                          &nbsp; Calculate
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          style={{ marginLeft: "105px" }}
                          onClick={handlePrint}
                        >
                          <PictureAsPdfIcon />
                          &nbsp; Print
                        </Button>
                        {invoiceGenerated && (
                          <div id="printable-area" style={{ display: "none" }}>
                            <PrintableView
                              selectedItems={selectedItems}
                              billAmt={billAmt}
                              name={billName}
                              contact={billContact}
                              disc={billDisc}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: "red" }}>
              Only <b>{compareQuant}</b> pieces of <b>{billItem}</b> available
              in the stock
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
