const mongoose=require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
var ObjectId = require('mongodb').ObjectID;

const routAndAction=require("./controller")
//.env
async function connection(){
   try{
    await mongoose.connect('mongodb://127.0.0.1/shop', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connect sucessfully")
   }catch(err){
     console.log("connect error",err);
   }
}

const app = express();
app.use(cors());
// Định nghĩa các định tuyến và xử lý yêu cầu tại đây

// Lắng nghe các yêu cầu đến từ cổng 5000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',routAndAction)



 connection().then(()=>{
  console.log("ket noi thanh cong ")

}).then( ()=>{
    

    app.listen(5000, () => {
            console.log('Backend server is running on port 5000');
          })  })
 .catch(err=>console.log(err))



