import Box from "@mui/material/Box";
// import { Typography } from "@mui/material";
import { SideNav } from "./SideNav";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
// import Title from "@mui/material";
import "../Dash.css";
import Form from "../Form";
import { useLocation } from "react-router-dom";

export const AddProduct = () => {
  const location = useLocation();

  console.log(location);

  return (
    <>
      <Navbar userId={location.state} />
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <SideNav userId={location.state} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Form userId={location.state} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
