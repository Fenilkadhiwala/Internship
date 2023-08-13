import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoginCredentials } from "../api";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./style.css";
const initialCredentials = {
  username: "",
  password: "",
};

const paperStyle = {
  padding: 20,
  height: "65vh",
  width: 320,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

export const Login = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const typeCredentials = (event) => {
    console.log(event.target.value);
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const checkCredentials = async () => {
    console.log(credentials);
    let resp = await checkLoginCredentials(credentials);
    const check = resp.data;

    // console.log(check);
    // console.log(check.isCorrect);

    // console.log("Login", check.userId);
    if (check.isCorrect) {
      let idObj = {
        id: check.userId,
      };
      navigate("/dash", { state: idObj });
    } else if (check.isText === "not") {
      setOpenDialog(true); // Open the dialog when sign up is needed
    } else {
      setShowInvalidMessage(true);
    }
  };

  return (
    <section className="bubble">
      <Grid style={{ marginTop: "80px" }}>
        <Paper elevation={5} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
            {showInvalidMessage && ( 
              <Typography style={{ color: "red", marginBottom: "10px" }}>
                Invalid Username Or Password
              </Typography>
            )}
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
            label="Password"
            placeholder="Enter password"
            type="password"
            name="password"
            fullWidth
            required
            style={{ marginTop: "8px" }}
            onChange={typeCredentials}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
            style={{ marginTop: "6px" }}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={checkCredentials}
          >
            Sign in
          </Button>
          <Typography style={{ marginTop: "10px" }}>
            <Link href="/forget">Forgot password ?</Link>
          </Typography>
          <Typography style={{ marginTop: "2px" }}>
            {" "}
            New User ?<Link href="/register">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Sign Up Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to sign up first to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignUp} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </section>
    
  );
};
