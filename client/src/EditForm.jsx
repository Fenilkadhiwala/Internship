// import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useRef } from "react";
import { useEffect } from "react";
import { getDetails } from "./api";

import { updateProduct } from "./api";

import { useParams } from "react-router-dom";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormGroup,
  styled,
  TextField,
  Autocomplete,
} from "@mui/material";
// import styled from "@emotion/styled";
// import { Autocomplete } from "@material-ui/lab";
import { addProduct } from "./api";

const initialData = {
  company: "",
  name: "",
  quantity: "",
  price: "",
  expiry: "",
};

const MyDiv = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  height: 500px;
  /* border: 2px solid black; */
  width: 700px;
  margin: 0px auto;
  /* background-color: white; */
`;

const Fields = styled(TextField)`
  margin: 12px 0px;
`;

const EditForm = (props) => {
  
  let idObj = {
    id: props.userId,
  };

  const resetForm = () => {
    setData(initialData);
    setSelectedState("");
    setSelectedCity("");
    setCities([]);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/all", { state: idObj });
  };

  const addData = async () => {
    // ... (existing code)
    await updateProduct(data, id);
    setOpen(true);
    resetForm();
  };

  const [data, setData] = useState(initialData);

  const typeData = (event, nm) => {
    // console.log(event.target.value);
    // console.log(nm, event.target.value);
    setData({ ...data, [nm]: event.target.value });
    console.log(data);
  };

  const typeMyData = (dt, nm) => {
    // console.log(event.target.value);
    // console.log(nm, event.target.value);
    setData({ ...data, [nm]: dt });
    console.log(data);
  };

  const { id } = useParams();

  useEffect(() => {
    loadValues();
  }, [props.userId]);

  const loadValues = async () => {
    const resp = await getDetails(id);
    setData(resp.data);
  };

  const navigate = useNavigate();

  const states = [
    {
      value: "Sun",
      label: "Sun Pharmaceutical Industries Ltd ",
    },
    { value: "Aurobindo Pharma Ltd", label: "Aurobindo Pharma Ltd" },
    { value: "Lupin Limited", label: "Lupin Limited" },
    { value: "Cipla", label: "Cipla" },
    { value: "Dr. Reddy's Laboratories", label: "Dr. Reddy's Laboratories" },
    { value: "Glenmark Pharmaceuticals", label: "Glenmark Pharmaceuticals" },
    { value: "Zydus Lifesciences", label: "Zydus Lifesciences" },
    { value: "Alkem Laboratories", label: "Alkem Laboratories" },
    { value: "Divi's Laboratories", label: "Divi's Laboratories" },
    { value: "Alembic Pharmaceuticals", label: "Alembic Pharmaceuticals" },
    { value: "Biocon", label: "Biocon" },
    { value: "Abbott India Ltd", label: "Abbott India Ltd" },
    { value: "Ajanta Pharma Ltd", label: "Ajanta Pharma Ltd" },
    { value: "Wockhardt Ltd", label: "Wockhardt Ltd" },
    { value: "Mankind Pharma Limited", label: "Mankind Pharma Limited" },
    { value: "Aventis Pharma", label: "Aventis Pharma" },
    { value: "Pfizer", label: "Pfizer" },
    { value: "Marksans Pharma Ltd", label: "Marksans Pharma Ltd" },
    { value: "Emcure Pharmaceuticals", label: "Emcure Pharmaceuticals" },
    { value: "Natco Pharma Ltd", label: "Natco Pharma Ltd" },
    { value: "Ranbaxy Laboratories", label: "Ranbaxy Laboratories" },
    { value: "Gufic Biosciences Ltd.", label: "Gufic Biosciences Ltd." },
    {
      value: "Intas Pharmaceuticals Limited",
      label: "Intas Pharmaceuticals Limited",
    },
    {
      value: "AstraZeneca Pharma India Ltd",
      label: "AstraZeneca Pharma India Ltd",
    },

    // Add more states as needed
  ];

  const citiesData = {
    Sun: [
      { value: "AB Phylline Capsule", label: "AB Phylline Capsule" },
      { value: "AB Phylline N Tablet", label: "AB Phylline N Tablet" },
      {
        value: "AB Phylline SR 200 Tablet",
        label: "AB Phylline SR 200 Tablet",
      },
      { value: "AEROTAZ INHALER", label: "AEROTAZ INHALER" },
      {
        value: "ALZOLAM FORTE 0.5MG/50MG TABLET",
        label: "ALZOLAM FORTE 0.5MG/50MG TABLET",
      },
      { value: "AMLODIL-L 5MG/5MG TABLET", label: "AMLODIL-L 5MG/5MG TABLET" },
      { value: "AMPREZ 5MG TABLET", label: "AMPREZ 5MG TABLET" },
      { value: "ARAVON TABLET", label: "ARAVON TABLET" },
      {
        value: "Abzorb Anti Fungal Dusting Powder",
        label: "Abzorb Anti Fungal Dusting Powder",
      },
      { value: "Acelast 100mg Capsule", label: "Acelast 100mg Capsule" },
      { value: "Acelast 50mg/5ml Syrup", label: "Acelast 50mg/5ml Syrup" },
      {
        value: "Acostin 1Million IU Injection",
        label: "Acostin 1Million IU Injection",
      },
      {
        value: "Acostin 3Million IU Injection",
        label: "Acostin 3Million IU Injection",
      },
      {
        value: "Acostin Forte 2MIU Injection",
        label: "Acostin Forte 2MIU Injection",
      },
      { value: "Actapro OD Tablet", label: "Actapro OD Tablet" },
      { value: "Adenoject 6mg Injection", label: "Adenoject 6mg Injection" },
      { value: "Adfovir 10mg Tablet", label: "Adfovir 10mg Tablet" },
      { value: "Adiuretin 0.2mg Tablet", label: "Adiuretin 0.2mg Tablet" },
      { value: "Adpace 2 mg/50 mg Tablet", label: "Adpace 2 mg/50 mg Tablet" },
      {
        value: "Aerotide Forte 400mcg/200mcg Diskette",
        label: "Aerotide Forte 400mcg/200mcg Diskette",
      },
      { value: "Alfakim 250mg Injection", label: "Alfakim 250mg Injection" },
      { value: "Almantin 5mg Tablet", label: "Almantin 5mg Tablet" },
      { value: "Alovent 5mg Tablet", label: "Alovent 5mg Tablet" },
      { value: "Altiva 120mg Tablet", label: "Altiva 120mg Tablet" },
      { value: "Amanat 5mg Tablet", label: "Amanat 5mg Tablet" },
      {
        value: "Amditor 5 mg/10 mg Tablet",
        label: "Amditor 5 mg/10 mg Tablet",
      },
      { value: "Amival 200 Tablet", label: "Amival 200 Tablet" },
      { value: "Amixide 10mg Tablet", label: "Amixide 10mg Tablet" },
      // Add cities for state1
    ],
    state2: [
      { value: "city3", label: "City 3" },
      { value: "city4", label: "City 4" },
      // Add cities for state2
    ],
    // Add more cities data for other states
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  const handleStateChange = (event, nm) => {
    const stateValue = event.target.value;
    // console.log(event.target.value);
    setSelectedState(stateValue);
    setSelectedCity(""); // Reset selected city when the state changes
    setCities(citiesData[stateValue] || []);

    typeData(event, nm);
  };

  const myFunc = (event, x, newValue, nm) => {
    // console.log(x);
    // event.target.value = x;
    // console.log(newValue.value);
    // console.log(event.target.value);
    setSelectedCity(event.target.value);
    // console.log(event);
    typeData(event, "name");
  };

  const dateFunc = (event, str) => {
    // console.log(str);
    // console.log(event.$d);
    // console.log(event);
    const dateString = event.$d;
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const result = `${month} ${year}`;
    // console.log(result);
    typeMyData(result, str);
    // typeData(event, str);
  };

  const statesData = states.map((state) => ({
    label: state.label,
    value: state.value,
  }));

  const citiesDataArray = selectedState ? citiesData[selectedState] || [] : [];
  const ref0 = useRef();

  return (
    <MyDiv>
      {/* <Fields label="Category" variant="filled" name="category"></Fields> */}
      <Autocomplete
        options={statesData}
        ref={ref0}
        name="company"
        getOptionLabel={(option) => option.label}
        value={
          statesData.find((state) => state.value === selectedState) || null
        }
        defaultValue={data.company}
        label="company"
        onChange={(event, newValue) =>
          handleStateChange(
            {
              target: { value: newValue ? newValue.value : "" },
            },
            "company"
          )
        }
        renderInput={(params) => (
          <Fields
            {...params}
            label="Company Name"
            variant="filled"
            autoComplete="off"
          />
        )}
      />
      <Autocomplete
        options={citiesDataArray}
        getOptionLabel={(option) => option.label}
        name="name"
        defaultValue={data.name}
        value={
          citiesDataArray.find((city) => city.value === selectedCity) || null
        }
        onChange={(event, newValue) =>
          // setSelectedCity(newValue ? newValue.value : "")
          myFunc(
            {
              target: { value: newValue ? newValue.value : "" },
            },
            event,
            newValue.value,
            newValue,
            "name"
          )
        }
        renderInput={(params) => (
          <Fields {...params} label="Item Name" variant="filled" name="name" />
        )}
      />

      <Fields
        label="Quantity"
        onChange={(event) => typeData(event, "quantity")}
        variant="filled"
        name="quantity"
        value={data.quantity}
      ></Fields>

      <Fields
        label="Price (pc.)"
        onChange={(event) => typeData(event, "price")}
        variant="filled"
        name="price"
        value={data.price}
      ></Fields>
      {/* <Fields
        label="Expiry Date"
        onChange={typeData}
        variant="filled"
        name="expiry"
      ></Fields> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          {/* <DatePicker
            name="expiry"
            label="Expiry Date"
            variant="filled"
            onChange={(event) => dateFunc(event, "expiry")}
          /> */}
          <DatePicker
            label={"Expiry"}
            views={["month", "year"]}
            onChange={(event) => dateFunc(event, "expiry")}
            defaultValue={data.expiry}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        onClick={addData}
      >
        Save Changes
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Product Updated Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The product has been updated successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </MyDiv>
  );
};

export default EditForm;
