/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer=require("multer");
const storage=multer.memoryStorage();

const upload=multer({storage:storage});

module.exports=upload;