
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const messageCtrl = require('../controllers/messages');

//const multer = require('../middleware/multer-config');


router.post('/', auth, messageCtrl.createMessage);
router.post('/:message_id', auth, messageCtrl.createComment);
router.put('/', auth, messageCtrl.modifyMessage);
router.get('/', auth, messageCtrl.getAllMessage);
router.get('/:message_id', auth, messageCtrl.getComment);
router.get('/user:user_id', auth, messageCtrl.getUserMessage);
router.delete('/', auth, messageCtrl.deleteMessage);

module.exports = router;