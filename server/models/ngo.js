const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ngoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        location: {
            type: String,
            required: true,
            maxlength: 200
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        photo: {
            data: Buffer,   //buffer datatype
            contentType: String     //.png or .pdf etc
        },
        certficate_photo: {
            data: Buffer,   //buffer datatype
            contentType: String     //.png or .pdf etc
        },
        schedule_photo: {
            data: Buffer,   //buffer datatype
            contentType: String     //.png or .pdf etc
        },
        rating: {
            type: Number,
            default: 0
        },
        phone: {
            type: String,
            required: true,
            maxlength: 10
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Ngo", ngoSchema);