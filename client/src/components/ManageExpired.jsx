import Box from "@mui/material/Box";
// import { Typography } from "@mui/material";
import { SideNav } from "./SideNav";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import ExpiredStock from "../ExpiredStock";

export const ManageExpired = () => {
  const location = useLocation();

  console.log(location);

  return (
    <>
      <Navbar userId={location.state} />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <SideNav userId={location.state} />
        <ExpiredStock />
      </Box>
    </>
  );
};
