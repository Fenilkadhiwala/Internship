import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { SideNav } from "./SideNav";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
// import Title from "@mui/material";
import "../Dash.css";
import EditForm from "../EditForm";

import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export const EditProduct = () => {
  const location = useLocation();
  const { uid } = useParams();

  // console.log(uid);

  return (
    <>
      <div>
        <Navbar userId={uid} />
        <Box height={80} />
        <Box sx={{ display: "flex" }}>
          <SideNav userId={uid} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <EditForm userId={uid} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};
