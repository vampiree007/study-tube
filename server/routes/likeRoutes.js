const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

// Protect all routes after this middleware

router.post('/create', likeController.makeChoice)
router.post('/getLikesAndDislikes', likeController.getLikesDislikes )
router.post('/remove', likeController.removeData )


module.exports = router;