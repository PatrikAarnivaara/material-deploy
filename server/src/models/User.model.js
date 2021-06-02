import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = Schema({
    firstname: { type: String, lowercase: true, required: true },
    lastname: { type: String, lowercase: true, required: true },
    schoolclass: {
        type: String, lowercase: true, required: true,
        length: [5, 'school class must be 5 characters long'],
        match: [/\w{2}\d{2}\w{1}/, 'is invalid']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        sparse: true
    },
    username: {
        type: String, unique: true, required: true, lowercase: true,
        minlength: [5, 'username must be longer than 5 characters'],
    },
    password: {
        type: String, required: true,
        minlength: [5, 'password must be longer than 6 characters'],
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    loans: [{
        type: Schema.Types.ObjectId,
        ref: 'equipment'
    }]
}, { timestamps: true })

const UserModel = mongoose.model('user', userSchema)
export default UserModel;