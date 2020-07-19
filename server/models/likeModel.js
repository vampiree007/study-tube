const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new mongoose.Schema({
    postId: {
        type:Schema.Types.ObjectId,
        ref: 'Video'
    },
    commentId: {
        type:Schema.Types.ObjectId,
        ref: 'Comment'
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    choice: {
        type: String
    }
},{ timestamps: true })


const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }