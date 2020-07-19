const { Subscribe } = require("../models/subscribeModel");
const catchAsync = require('../utils/catchAsync');
const { Video } = require("../models/videoModel");


exports.getSubscribeCount = catchAsync(async(req, res, next) => {
    const subscribeCount = await Subscribe.find({'subscribeTo': req.params.subscribeId})
    const length = subscribeCount.length
    res.status(200).json({
        status:'success',
        count : length
    })
})
exports.subscribeMe = catchAsync(async(req, res, next) => {
    const count = await Subscribe.create(req.body)
    if(!count) return res.status(404).json({status: 'fail', message: 'unable to subscribe'})
    res.status(200).json({
        status:'success'
    })
})
exports.unsubscribeMe = catchAsync(async(req, res, next) => {
    //console.log(req.body)
    const count = await Subscribe.findOneAndRemove({'subscribeTo': req.body.subscribeTo, 'subscribeFrom': req.body.subscribeFrom})
    if(!count) return res.status(404).json({status: 'fail', message: 'unable to unsubscribe'})
    res.status(200).json({
        status:'success'
    })
})
exports.subscribeCheck = catchAsync(async(req, res, next) => {
    //console.log(req.body)
    const count = await Subscribe.find(req.body)
    if(count.length === 0) {
        return res.status(200).json({
            status:'fail',
            count
        })
    }
    res.status(200).json({
        status:'success',
        count
    })
    //console.log(count)
})
exports.subscriptions = catchAsync(async(req, res, next) => {
    //console.log(req.params.subscribeId)
    const data = await Subscribe.find({'subscribeFrom': req.params.subscribeId}).select('subscribeTo');
    if(data.length === 0) return res.status(200).json({status:'fail',message:'no subscriptions found'})
    //console.log(data)
    let subscriptions = [];

    data.map((subscriber, i) => {
        subscriptions.push(subscriber.subscribeTo)
    })

    const subscriptionVideos = await Video.find({"writer" : { "$in" : subscriptions}}).populate('writer')
    //console.log(subscriptionVideos)
    res.status(200).json({
        status:'success',
        videos: subscriptionVideos
    })
})