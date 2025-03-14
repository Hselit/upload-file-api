var express = require('express');
var router = express.Router();
const db = require('../config/db');
const upload = require('../config/uploadfile');

router.post('/addfile',upload.single('image'), function(req,res) {
     if(!req.file){
          return res.status(400),json({message:"NO file uploaded!"});
     }

     const filepath = req.file.path;
     const sql = "insert into profile (imagepath) values (?)";
     db.query(sql,[filepath],(err,result)=>{
          if(err){
               return res.status(500).json({message:"Error occured "+err});
          } else {
               res.status(201).json({message:"Image Uploaded Successfully!",filepath:filepath});
          }
     });
});

module.exports = router;
