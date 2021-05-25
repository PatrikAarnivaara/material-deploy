import EquipmentController from '../controllers/Equipment.controller.js';

const routes = server => {
    server.post('/equipment', EquipmentController.createEquipment)
    server.get('/equipment', EquipmentController.getEquipment);
    server.delete('/equipment/:equipmentId', EquipmentController.deleteEquipment)
}

export default { routes }