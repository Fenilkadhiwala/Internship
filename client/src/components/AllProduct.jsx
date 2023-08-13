import Box from "@mui/material/Box";
// import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { SideNav } from "./SideNav";
import Navbar from "../components/Navbar";
import { MyTable } from "../Table";
import { useLocation } from "react-router-dom";

export const AllProduct = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <Navbar userId={location.state} />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <SideNav userId={location.state} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MyTable userId={location.state} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
