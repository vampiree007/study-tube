const express = require('express');
const videoController = require('../controllers/videoController');
//const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);
router.get('/', videoController.getAllVideos)
router.post('/uploadfile', videoController.fileHandler);
router.post('/thumbnails', videoController.thumbnailGenerator);
router.post('/uploadVideo', videoController.videoUpload)
router.get('/getVideo/:videoId', videoController.getVideo)

module.exports = router;