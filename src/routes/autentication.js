const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get ('/signup', (req, res) =>{
res.render('./auth/signup');
});


    

    



module.exports =router; 