const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { autoIncrement } = require('mongoose-plugin-autoinc');

const UserSchema = new Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true
    },
    gender: String,
    profile_pic: String,
    locale: String,
    timezone: String
}, {
    timestamps: {createdAt: 'regDate', updateAt: 'modifiedDate'}
});

UserSchema.plugin(autoIncrement, {model: "User", field: "id", startAt: 1, incrementBy: 1});


module.exports = mongoose.model('User', UserSchema);