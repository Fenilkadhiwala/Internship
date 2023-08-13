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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "../api";
// import { nodemailer } from "nodemailer";

import "./style.css";
const initialCredentials = {
  email: "",
  newPassword: "",
};

const paperStyle = {
  padding: 20,
  height: "52vh",
  width: 320,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "25px 0" };

export const Reset = () => {
  const [credentials, setCredentials] = useState(initialCredentials);

  const [emailSentDialog, setEmailSentDialog] = useState(false);
  const [mailErrorDialog, setMailErrorDialog] = useState(false);
  const typeCredentials = (event) => {
    console.log(event.target.value);
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const checkCredentials = async () => {
    const resetBool = await resetPassword(credentials);
    const f = resetBool.data.resetBool;
    console.log(f);

    if (f) {
      setEmailSentDialog(true);
    } else {
      setMailErrorDialog(true);
    }
  };

  const handleCloseDialogs = () => {
    setEmailSentDialog(false);
    navigate("/");
  };

  return (
    <section className="bubble">
      <Grid style={{ marginTop: "80px" }}>
        <Paper elevation={5} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Reset Your Password</h2>
          </Grid>
          <TextField
            label="Registered Email"
            placeholder="registered email"
            fullWidth
            name="email"
            required
            onChange={typeCredentials}
            autoComplete="off"
          />

          <TextField
            label="New Password"
            type="password"
            placeholder="new password"
            fullWidth
            name="newPassword"
            required
            onChange={typeCredentials}
            autoComplete="off"
          />

          <TextField
            label="Confirm Password"
            type="password"
            placeholder="confirm password"
            fullWidth
            required
            onChange={typeCredentials}
            autoComplete="off"
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={checkCredentials}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
      <Dialog open={emailSentDialog} onClose={handleCloseDialogs}>
        <DialogTitle>Email Sent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your password has been reset successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={mailErrorDialog} onClose={handleCloseDialogs}>
        <DialogTitle>Mail Error</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "red" }}>
            Something went wrong while reseting password. Please try again
            later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};
