const mongoose = require('mongoose');


const LinkShortnerSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    validity: {
        time: {
            type:Number
        },
        isApplicable: {
            type:Boolean,
            default:true,
        },
    },
    shortCode: {
        type: String,
        required:true,
    },
    shortLink:{
        type:String,
        default:"none"
    }
},{timestamps:true})
module.exports = mongoose.model('url', LinkShortnerSchema)
