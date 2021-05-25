import mongoose from 'mongoose';
const { Schema } = mongoose;

const loanSchema = Schema({
    startdate: { type: Date, },
    enddate: { type: Date },
    createdByUser: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true }
)

const LoanModel = mongoose('loan', loan);
export default LoanModel;