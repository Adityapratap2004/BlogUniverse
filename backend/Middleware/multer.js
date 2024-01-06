const multer=require('multer');
const storage=multer.memoryStorage();
const singlUpload=multer({storage}).single('file');

module.exports=singlUpload;