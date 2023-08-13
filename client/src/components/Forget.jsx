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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../api";
import { sendEmail } from "../api";
// import { nodemailer } from "nodemailer";

import "./style.css";
const initialCredentials = {
  email: "",
};

const paperStyle = {
  padding: 20,
  height: "52vh",
  width: 320,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "25px 0" };

export const Forget = () => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [emailSentDialog, setEmailSentDialog] = useState(false);
  const [mailErrorDialog, setMailErrorDialog] = useState(false);
  const typeCredentials = (event) => {
    console.log(event.target.value);
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkCredentials = async () => {
    setLoading(true);
    const emailResp = await checkEmail(credentials);

    const st = emailResp.data.userStatus;

    if (st) {
      let emailStatus = await sendEmail(credentials.email);
      const flag = emailStatus.data.emStatus;

      if (flag) {
        setEmailSentDialog(true);
      } else {
        setMailErrorDialog(true);
      }
    } else {
      setOpenDialog(true);
    }
    setLoading(false);
  };

  const handleCloseDialogs = () => {
    setOpenDialog(false);
    setEmailSentDialog(false);
    setMailErrorDialog(false);
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
            {showInvalidMessage && ( // Conditionally render the invalid message
              <Typography style={{ color: "red", marginBottom: "10px" }}>
                Invalid Username Or Password
              </Typography>
            )}
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter registered email"
            fullWidth
            name="email"
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
            disabled={loading}
          >
            
            {loading ? "Loading..." : "Submit"}
          </Button>

          <Typography style={{ marginTop: "2px" }}>
            {" "}
            Log in?<Link href="/">Back</Link>
          </Typography>
        </Paper>
      </Grid>

      <Dialog open={emailSentDialog} onClose={handleCloseDialogs}>
        <DialogTitle>Email Sent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check your email. We've sent you a reset password link!
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
            Something went wrong while sending the email. Please try again
            later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={handleCloseDialogs}>
        <DialogTitle>No User Found</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "red" }}>
            The provided email address does not correspond to any registered
            user.
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
