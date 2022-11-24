const express = require('express');
const router = express.Router();
 
const {PostInfor, GetTnfro, DeleteInfor} = require('../app/controllers/InforController');


router.post('/infor',PostInfor);
router.get('/infor', GetTnfro);
router.delete('/infor/:id',DeleteInfor);

module.exports = router;
