import axios from "axios";

const URL = "http://localhost:5000";

export const addProduct = async (data) => {
  try {
    console.log(data);

    return await axios.post(`${URL}/add`, data);
  } catch (err) {
    console.log("Something Went Wrong While Adding Product");
  }
};

export const getData = async () => {
  try {
    return await axios.get(`${URL}/all`);
  } catch (err) {
    console.log("Something Went Wrong While Displaying Data");
  }
};

export const getDetails = async (id) => {
  try {
    return await axios.get(`${URL}/api/${id}`);
  } catch (err) {
    console.log("Something Went Wrong While Displaying Previous Data");
  }
};

export const updateProduct = async (data, id) => {
  try {
    return await axios.put(`${URL}/${id}`, data);
  } catch {
    console.log("Something Went Wrong While Updating Product");
  }
};

export const deleteData = async (id) => {
  try {
    return axios.delete(`${URL}/${id}`);
  } catch {
    console.log("Something Went Wrong While Deleting Product");
  }
};

export const addCredentials = async (credentials) => {
  try {
    return axios.post(`${URL}/credentials`, credentials);
  } catch (err) {
    console.log("Something Went Wrong While Signing Up");
  }
};

export const checkLoginCredentials = async (credentials) => {
  try {
    return axios.post(`${URL}/login`, credentials);
  } catch (e) {
    console.log("Something Went Wrong While Signing In");
  }
};

export const companyName = async (id) => {
  try {
    return await axios.post(`${URL}/company/${id}`);
  } catch (err) {
    console.log("Something Went Wrong While Fetching Company's Name");
  }
};

export const loadMeds = async () => {
  try {
    return await axios.post(`${URL}/meds`);
  } catch (err) {
    console.log("Something Went Wrong While Fetching Med's Name For Billing");
  }
};

export const loadPrices = async () => {
  try {
    return await axios.post(`${URL}/prices`);
  } catch (err) {
    console.log("Something Went Wrong While Fetching Price For Billing");
  }
};

export const updateQuantity = async (fQuantity, pid) => {
  try {
    return await axios.post(`${URL}/updateStock/${pid}`, fQuantity);
  } catch {
    console.log("Something Went Wrong While Updating Quantity");
  }
};

export const loadAllExpired = async () => {
  try {
    return await axios.post(`${URL}/expired`);
  } catch {
    console.log("Something Went Wrong While Fetching All Expired Data");
  }
};

export const checkEmail = async (credentials) => {
  try {
    return await axios.post(`${URL}/email`, credentials);
  } catch {
    console.log("Something Went Wrong While checking email");
  }
};

export const sendEmail = async (emailToSend) => {
  try {
    return await axios.post(`${URL}/sendemail`, emailToSend);
  } catch {
    console.log("Something Went Wrong While sending email");
  }
};

export const resetPassword = async (newPassword) => {
  try {
    return await axios.post(`${URL}/resetPassword`, newPassword);
  } catch {
    console.log("Something Went Wrong reseting password");
  }
};

export const fetchTokensFromServer = async () => {
  try {
    return await axios.post(`${URL}/fetchBothTokens`);
  } catch {
    console.log("Something Went Wrong While fetching tokens from backend");
  }
};

export const isAuthenticated = async () => {
  try {
    console.log("djd");
    return await axios.post(`${URL}/verifyAuth`);
  } catch {
    console.log("Something Went Wrong While fetching tokens from backend");
  }
};

export const whetherUserExist = async (value) => {
  try {
    return await axios.post(`${URL}/takenOrNot`, value);
  } catch {
    console.log(
      "Something Went Wrong While Checking Whether Username Has Been Already Taken"
    );
  }
};

export const emailAlreadyExists = async (userEmail) => {
  try {
    return await axios.post(`${URL}/emailAlreadyExists`, userEmail);
  } catch {
    console.log(
      "Something Went Wrong While Checking Whether User Has An Account Or not"
    );
  }
};
