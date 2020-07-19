const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    postId: {
        type:Schema.Types.ObjectId,
        ref: 'Video'
    },
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    commentTo: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    comment:{
        type: String,
        maxlength: 200
    },
    createdOn:{
        type: Number,
        default: Date.now()
    }
}, { timestamps: true })


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }