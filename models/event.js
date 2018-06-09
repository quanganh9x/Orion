const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    type: { // 1 realtime, 2 cron-schedule
        type: Number,
        min: 1,
        max: 2,
        required: true
    },
    cron: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    subscribers: [String],
    description: String
});

module.exports = mongoose.model('Event', EventSchema);