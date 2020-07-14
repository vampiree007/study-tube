const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const { Video } = require("../models/videoModel");
const catchAsync = require('../utils/catchAsync');

////////////////////////////////////////////////////////////////////////////////////////
//Setting up storage for multer. storage includes - destination, filename, filefilter///
////////////////////////////////////////////////////////////////////////////////////////
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")

////////////////////////////////////////////////////////////////////////////////////////
//Uisng Multer after Initial configuration, configuration is performed above////////////
////////////////////////////////////////////////////////////////////////////////////////
exports.fileHandler = (req, res) => {

    upload(req, res, err => {
        if (err) {
            console.log('hey')
            return res.json({ success: false, err })
        }else{
            return res.status(200).json(
                { success: true, 
                filePath: res.req.file.path, 
                fileName: res.req.file.filename })
        }
        
    })
};

////////////////////////////////////////////////////////////////////////////////////////
//Uploading Video data to server after final submit by user/////////////////////////////
//video-Filepath, name, video-duration, writer information comes from the front end/////
////////////////////////////////////////////////////////////////////////////////////////
exports.videoUpload = catchAsync(async (req, res) => {

    const video =  await Video.create(req.body)

    return res.status(200).json({
        success: true 
    })

})
////////////////////////////////////////////////////////////////////////////////////////
//This can be used to generate thumbnail from video saved, call it after video upload///
////////////////////////////////////////////////////////////////////////////////////////
exports.getAllVideos = async(req, res, next) => {
    const videos = await Video.find()
    res.status(200).json({
        success: 'true',
        videos
    })
}
exports.getVideo = async(req, res, next) => {
    const video = await Video.find({"_id": req.params.videoId})
    res.status(200).json({
        success: 'true',
        video
    })
}
exports.thumbnailGenerator = (req, res) => {
    console.log(req.body.filePath)
    let thumbsFilePath ="";
    let fileDuration ="";
    const fileloc = req.body.filePath
    req.body.filepath =  fileloc.replace(/\\/g, "/");
    ffmpeg.ffprobe( req.body.filePath, function(err, videoInfo){
        //console.dir(metadata);
        //console.log(videoInfo.format.duration);
        fileDuration = videoInfo.format.duration
    })


    ffmpeg(req.body.filepath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumb1 = "uploads/thumbnails/" + filenames[0];
            thumb2 = "uploads/thumbnails/" + filenames[1];
            thumb3 = "uploads/thumbnails/" + filenames[2];
            thumb4 = "uploads/thumbnails/" + filenames[3];
        })
        .on('end', function () {
            //console.log('Screenshots taken');
            return res.json({ 
                success: true, 
                thumbsFilePath:[thumb1, thumb2, thumb3, thumb4] , 
                fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 4,
            folder: 'uploads/thumbnails',
            size:'1280x720',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

};
