const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { autoIncrement } = require('mongoose-plugin-autoinc');

const EventSchema = new Schema({
    id: {
        type: String,
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

EventSchema.plugin(autoIncrement, {model: "Event", field: "id", startAt: 1, incrementBy: 1});

module.exports = mongoose.model('Event', EventSchema);