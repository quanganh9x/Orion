const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    type: String,
    uid1: {
        type: String,
        required: true
    },
    uid2: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Room', RoomSchema);