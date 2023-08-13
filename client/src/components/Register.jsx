import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { addCredentials } from "../api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
const initialCredentials = {
  username: "",
  email: "",
  phone: "",
  password: "",
};

const paperStyle = {
  padding: 20,
  height: "80vh",
  width: 330,
  margin: "20px auto",
};

const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);

  const typeCredentials = (event) => {
    // console.log(event.target.value);
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/");
  };

  const checkCredentials = async () => {
    setLoading(true); // Set loading to true before making the API call

    await addCredentials(credentials);

    setLoading(false); // Set loading back to false after the API call completes
    handleDialogOpen();
  };

  return (
    <section className="bubble">
      <Grid style={{ marginTop: "60px" }}>
        <Paper elevation={5} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            name="username"
            required
            onChange={typeCredentials}
            autoComplete="off"
          />

          <TextField
            label="email"
            placeholder="Enter email"
            fullWidth
            name="email"
            required
            onChange={typeCredentials}
            style={{ marginTop: "8px" }}
            autoComplete="off"
          />
          <TextField
            label="Phone"
            placeholder="Enter contact number"
            fullWidth
            name="phone"
            required
            onChange={typeCredentials}
            style={{ marginTop: "8px" }}
            autoComplete="off"
          />
          <TextField
            label="Company Name"
            placeholder="Enter company name"
            fullWidth
            name="shop"
            required
            onChange={typeCredentials}
            style={{ marginTop: "8px" }}
            autoComplete="off"
          />
          <TextField
            label="Password"
            placeholder="Create password"
            type="password"
            name="password"
            fullWidth
            required
            onChange={typeCredentials}
            style={{ marginTop: "8px" }}
            autoComplete="off"
          />
          <TextField
            label="Confirm Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={typeCredentials}
            style={{ marginTop: "8px", marginBottom: "8px" }}
            autoComplete="off"
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={checkCredentials}
            disabled={loading} // Disable the button while loading is true
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <Typography>
            {" "}
            Already have an account ?<Link href="/">Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Registration Successful"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have been successfully registered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};
