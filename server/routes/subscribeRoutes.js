const express = require('express');
const subscribeController = require('../controllers/subscribeController');
//const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);
router.get('/subscribecount/:subscribeId', subscribeController.getSubscribeCount)
router.post('/subscribeMe', subscribeController.subscribeMe )
router.post('/unsubscribeMe', subscribeController.unsubscribeMe )
router.post('/subscribeCheck', subscribeController.subscribeCheck )
router.get('/subscriptions/:subscribeId', subscribeController.subscriptions )


module.exports = router;