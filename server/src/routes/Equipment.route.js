import EquipmentController from '../controllers/Equipment.controller.js';

const routes = server => {
    server.post('/equipment', EquipmentController.createEquipment)
    server.get('/equipment', EquipmentController.getEquipment);
    server.put('/equipment/:equipmentId', EquipmentController.updateEquipment);
    server.delete('/equipment/:equipmentId', EquipmentController.deleteEquipment)
}

export default { routes }