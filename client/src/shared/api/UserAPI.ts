/** @format */

import Axios from "axios";

const productionAPI = "https://thawing-mountain-25749.herokuapp.com/";
const developmentAPI = "http://localhost:3001";

const LenderAPI = Axios.create({
  baseURL: developmentAPI,
  headers: { "Content-Type": "application/json" },
});

export default LenderAPI;
