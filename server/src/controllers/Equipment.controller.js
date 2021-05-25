import EquipmentModel from '../models/Equipment.model.js'
import StatusCode from '../configurations/StatusCode.js'
import UserModel from '../models/User.model.js'

const createEquipment = async (request, response) => {

    const equipment = new EquipmentModel({
        userId: request.body.userId,
        title: request.body.title,
        description: request.body.description,
        brand: request.body.brand,
        serialnumber: request.body.serialnumber,
        category: request.body.category
    })

    try {
        const user = await UserModel.findById({ _id: request.body.userId })
        user.loans.push(equipment);
        equipment.currentlyLoanedByUser = user
        /* await equipment.save() */
        const saveEquipment = await user.save()
        const databaseResponse = await equipment.save()
        response.status(StatusCode.CREATED).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const getEquipment = async (request, response) => {
    try {
        const databaseResponse = await EquipmentModel.find().populate('currentlyLoanedByUser')
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
    }
}

const deleteEquipment = async (request, response) => {
    try {
        const databaseResponse = await EquipmentModel.findByIdAndDelete(request.params.equipmentId)
        response.status(StatusCode.OK).send({ message: `Equipment with serial number ${databaseResponse.serialnumber} deleted.` })
    } catch (error) {
        response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: `Error occured when trying to delete equipment with ID: ${request.params.userId}.` })

    }
}

export default {
    getEquipment,
    createEquipment,
    deleteEquipment
}