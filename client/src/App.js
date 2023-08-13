import "./App.css";
// import { SideNav } from "./components/SideNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AllProduct } from "./components/AllProduct";
import { AddProduct } from "./components/AddProduct";
import { EditProduct } from "./components/EditProduct";
import { ManageExpired } from "./components/ManageExpired";
import { Pending } from "./components/Pending";
import { DeletedHistory } from "./components/DeletedHistory";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Forget } from "./components/Forget";
import { Reset } from "./components/Reset";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/" exact element={<Login />} />
          <Route path="/dash" exact element={<Dashboard />} />
          <Route path="/all" exact element={<AllProduct />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id/:uid" element={<EditProduct />} />
          <Route path="/manage" element={<ManageExpired />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/deleted" element={<DeletedHistory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
