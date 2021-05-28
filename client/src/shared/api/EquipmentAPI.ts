import Axios from 'axios'

const productionAPI = 'https://thawing-mountain-25749.herokuapp.com/'
const developmentAPI = 'http://localhost:3001'

const EquipmentAPI = Axios.create({
    baseURL: developmentAPI,
    headers: { 'Content-Type': 'application/json' }
})

export default EquipmentAPI