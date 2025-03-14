const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
     destination:function(req,file,cb){
          cb(null,'./uploads/');
     },
     filename:function(req,file,cb) {
          cb(null,Date.now() + path.extname(file.originalname));
     }
});

const fileFilter = (req,file,cb) =>{
     const allowedTypes = /jpeg|jpg|png/
     const extname = allowedTypes.test(path.extname(file.originalname).toLocaleLowerCase());
     const mimetype = allowedTypes.test(file.mimetype);

     if(extname && mimetype) {
          return cb(null, true);
     } else {
          return cb(new Error("Only  JPEG,JPG,PNG images are allowed"));
     }
};

const upload = multer({
     storage:storage,
     limits:{fieldSize: 5 * 1024 * 1024},
     fileFilter: fileFilter
});

module.exports = upload;