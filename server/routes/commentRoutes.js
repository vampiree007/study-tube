const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/saveComment', commentController.comment )
router.get('/:videoId', commentController.getAllComments )
module.exports = router;