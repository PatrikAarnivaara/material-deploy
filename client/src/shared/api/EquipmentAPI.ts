import Axios from 'axios'

/* const productionAPI = '' */
const developmentAPI = 'http://localhost:3001'

const EquipmentAPI = Axios.create({
    baseURL: developmentAPI,
    headers: { 'Content-Type': 'application/json' }
})

export default EquipmentAPI