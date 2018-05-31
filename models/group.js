const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { autoIncrement } = require('mongoose-plugin-autoinc');

const GroupSchema = new Schema({
    gid: {
        type: String,
        required: true,
        unique: true
    },
    id: [String],
    subscribed: [Number]
});

GroupSchema.plugin(autoIncrement, {model: "Group", field: "gid", startAt: 1, incrementBy: 1});

module.exports = mongoose.model('Group', GroupSchema);