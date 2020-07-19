const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = new mongoose.Schema({
    subscribeFrom: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    subscribeTo: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = { Subscribe }