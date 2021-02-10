//require the library
const express=require('express');
const db = require('../config/mongoose');
const TODO = require('../models/todolist');
const passport = require('passport');
const router=express.Router();
router.use(express.urlencoded());
const controller=require('../controllers/homecontroller');
// call controller 
router.get('/',passport.checkAuthentication,controller.home);
router.get('/index',controller.login);
router.post('/create',controller.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/index'},
), controller.createsession);
router.get('/signout',controller.destroy);
router.post('/create-task',controller.list);    
router.post('/delete-task',controller.delete);
module.exports=router;