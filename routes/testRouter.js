const express=require('express')
const { testController } = require('../controllers/testController')
const router=express.Router()

router.get('/test-user',testController);
module.exports=router;