const { Like } = require("../models/likeModel");
const catchAsync = require('../utils/catchAsync');


exports.getLikesDislikes = catchAsync(async(req, res, next) => {
    const data =  await Like.find(req.body)
    const selectLikes = (value) => {
        return value.choice === 'like'
    }
    const selectdislikes = (value) => {
        return value.choice === 'dislike'
    }
    const likes = data.filter(selectLikes);
    const dislikes = data.filter(selectdislikes);
    return res.status(200).json({
        status:'success',
        likeCounts :  likes,
        dislikeCounts : dislikes ||[]
    })
})
exports.makeChoice = catchAsync(async(req, res, next) => {
    console.log(req.body.postId)
    if(req.body.postId){
        const object = {postId:req.body.postId, userId: req.body.userId}
        const deletedObj = await Like.deleteOne(object)
    }
    if(req.body.commentId){
        const object = {commentId:req.body.commentId, userId: req.body.userId}
        const deletedObj = await Like.deleteOne(object)
    }

    const createdChoice = await Like.create(req.body)
    if(!createdChoice) return res.status(201).json({status:'fail', message: 'unable to perform action'})
    res.status(200).json({
        status:'success',
        choice: req.body.choice
    })
})
exports.removeData = catchAsync(async(req, res, next) => {
    //console.log(req.body)
    const data = await Like.find(req.body);
    console.log(data[0]._id)
    if(!data) res.status(201).json({status:'fail',message:'no data found'});
    const deletedData = await Like.findByIdAndDelete(data[0]._id)
    res.status(200).json({
        status:'success'
    })
})