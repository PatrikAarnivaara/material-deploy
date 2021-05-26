import Axios from 'axios';

const productionAPI = 'https://thawing-mountain-25749.herokuapp.com/'
const API_URL = 'http://localhost:3001';

const LenderAPI = Axios.create({
    baseURL: productionAPI,
    headers: { 'Content-Type': 'application/json' }
});

export default LenderAPI;

