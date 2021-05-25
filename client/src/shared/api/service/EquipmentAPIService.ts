import http from '../EquipmentAPI'

const getEquipment = () => {
    return http.get('/equipment')
}

const deleteEquipment = (equipmentId: string) => {
    http.delete(`/equipment/${equipmentId}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getEquipment,
    deleteEquipment
}

