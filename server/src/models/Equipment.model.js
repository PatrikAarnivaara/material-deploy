import mongoose from 'mongoose';
const { Schema } = mongoose;

const equipmentSchema = Schema({
    title: {
        type: String, required: true, allowNull: false,
        minlength: [4, 'username must be longer than 5 characters'],
        maxlength: [20, 'username cannot be longer than 20 characters']
    },
    description: {
        type: String, required: true, allowNull: false,
        minlength: [10, 'description must be longer than 10 characters']
    },
    brand: {
        type: String, required: true, allowNull: false,
        minlength: [1, 'brand must be longer than 1 characters']
    },
    serialnumber: {
        type: String, unique: true, allowNull: false, required: true,
        minlength: [10, 'serial number needs to be 10 characters long']
    },
    category: {
        type: String, allowNull: false, required: true,
    },
    currentlyLoanedByUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const EquipmentModel = mongoose.model('equipment', equipmentSchema)
export default EquipmentModel;