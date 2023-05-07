const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true,
        maxLenght:255
    }}
    ,{timestamps:true}
);

module.exports = mongoose.model("Notification", NotificationSchema);
