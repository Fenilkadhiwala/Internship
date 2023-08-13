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

import { addCredentials, whetherUserExist, emailAlreadyExists } from "../api";

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
  height: "83vh",
  width: 330,
  margin: "20px auto",
};

const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogEmailOpen, setDialogEmailOpen] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [usernameExists, setUsernameExists] = useState(false); // State to track whether the username exists
  const [usernameChecked, setUsernameChecked] = useState(false); // State to track if the username availability has been checked
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validPhone, setValidPhone] = useState(true);

  const typeCredentials = async (event) => {
    // console.log(event.target);
    const { name, value } = event.target;

    // console.log(name, value);
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

    if (name === "username") {
      setUsernameChecked(false);
      setUsernameExists(false);
    }

    if (value) {
      try {
        const usernameBool = await whetherUserExist(value);
        setUsernameExists(usernameBool.data.taken);
      } catch (err) {
        console.log(err);
      }
      setUsernameChecked(true);
    }

    if (name === "password" || name === "confirmPassword") {
      const newPassword = name === "password" ? value : credentials.password;
      const newConfirmPassword =
        name === "confirmPassword" ? value : credentials.confirmPassword;
      setPasswordMatch(
        newPassword === newConfirmPassword || newConfirmPassword === ""
      );
    }

    if (name === "phone") {
      const phoneLength = value.length;

      // console.log(phoneLength);

      if (phoneLength !== 10) {
        setValidPhone(false);
      } else {
        setValidPhone(true);
      }
    }
  };

  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleEmailDialogOpen = () => {
    setDialogEmailOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/");
  };

  const handleEmailDialogClose = () => {
    setDialogEmailOpen(false);
    navigate("/");
  };

  const checkCredentials = async () => {
    if (!passwordMatch) {
      return; // Don't proceed if passwords don't match
    }
    setLoading(true);
    console.log(credentials);
    const userEmail = credentials.email;

    const accountBool = await emailAlreadyExists(userEmail);

    const emailBool = accountBool.data.alreadyHasAccount;

    if (emailBool) {
      // alert("You Already Have Account");
      handleEmailDialogOpen();
    } else {
      await addCredentials(credentials);
      setLoading(false); // Set loading back to false after the API call completes
      handleDialogOpen();
    }
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
            error={usernameChecked && usernameExists}
            helperText={
              usernameChecked && usernameExists ? "Username not available" : ""
            }
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
            error={!validPhone}
            helperText={
              !validPhone ? "Phone number should be 10 digits long!" : ""
            }
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
            style={{
              marginTop: "8px",
              borderColor: passwordMatch ? "" : "red",
            }}
            autoComplete="off"
          />
          <TextField
            label="Confirm Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            name="confirmPassword"
            onChange={typeCredentials}
            style={{
              marginTop: "8px",
              marginBottom: "8px",
              borderColor: !passwordMatch ? "red" : "",
            }}
            autoComplete="off"
            error={!passwordMatch}
            helperText={!passwordMatch ? "Passwords do not match" : ""}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={checkCredentials}
            disabled={!passwordMatch}
          >
            Sign Up
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
      <Dialog
        open={dialogEmailOpen}
        onClose={handleEmailDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Registration Fail"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You already have an account please login!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};
