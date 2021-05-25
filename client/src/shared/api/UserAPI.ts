import Axios from 'axios';

const API_URL = 'http://localhost:3001';

const LenderAPI = Axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export default LenderAPI;

