const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const donateSchema = new mongoose.Schema(
    {
       
        donarId: {
            type: ObjectId,
            ref: "User",
        },
        recieverId: {
            type: ObjectId,
            ref: "Ngo",
        },
        objectsdonated: {
            type: String,
            default: "",
            maxlength: 2000
        },
        amountdonated: {
            type: Number,
            default: 0
        },
        transactionId: {
            type: String,
            maxlength: 2000
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("DonateList", donateSchema);