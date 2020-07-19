const { Subscribe } = require("../models/subscribeModel");
const catchAsync = require('../utils/catchAsync');
const { Comment } = require("../models/commentModel");


exports.getAllComments = catchAsync(async(req, res, next) => {
    const comments = await Comment.find({'postId': req.params.videoId}).populate('writer')
    res.status(200).json({
        status:'success',
        comments
    })
})
exports.comment = catchAsync(async(req, res, next) => {
    //console.log(req.body)
    const createdComment = await Comment.create(req.body)
    if(!createdComment) return res.status(404).json({status: 'fail', message: 'unable to comment'})
    const comment = await Comment.find({_id: createdComment._id}).populate('writer');
    //console.log(comment)
    res.status(200).json({
        status:'success',
        comment
    })
})
exports.uncommentMe = catchAsync(async(req, res, next) => {
    //console.log(req.body)
    const count = await Subscribe.findOneAndRemove({'subscribeTo': req.body.subscribeTo, 'subscribeFrom': req.body.subscribeFrom})
    if(!count) return res.status(404).json({status: 'fail', message: 'unable to unsubscribe'})
    res.status(200).json({
        status:'success'
    })
})

