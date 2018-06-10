const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { autoIncrement } = require('mongoose-plugin-autoinc');

const UserSchema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    privilege: { // 0 admin, 1 staff, 2 member
        type: Number,
        min: 0,
        max: 2,
        default: 2
    },
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    profile_pic: String,
    locale: String,
    timezone: String,
    location: String,
    roomId: String,
    status: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    }
}, {
    timestamps: {createdAt: 'regDate', updateAt: 'modifiedDate'}
});

UserSchema.plugin(autoIncrement, {model: "User", field: "uid", startAt: 1, incrementBy: 1});


module.exports = mongoose.model('User', UserSchema);