const mongoose=require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
var ObjectId = require('mongodb').ObjectID;
//.env
async function connection(){
   try{
    await mongoose.connect('mongodb://127.0.0.1/shop', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connect sucessfully")
   }catch(err){
     console.log("connect error",err);
   }
}



const UserSchema=new mongoose.Schema({
    'username':{
            type:String,
            require:[true,'please provide a unique username'],
           

    },
    'password':{
        type:String,
        require:[true,'please provide a password'],
          
    }
})
const ProductSchema=new mongoose.Schema({
    'name':{
            type:String,
            require:[true,'please provide a unique username'],
            unique:[true],

    },
    'img':{
        type: Buffer, required: true 
    },
    'gia':{
        type:String,
        require:[true,'please provide a price '],
           
    },
    'ngaycapngat':{
        type:String,
        require:[true,'please provide a update day'],
           
    },
    'mota':{
        type:String,
        require:[true,'please provide a description'],
          
    },
    'ngaytao':{
        type:String,
        require:[true,'please provide a created date'],
         
    }
})


const usermodel = mongoose.model('Users',UserSchema);
const productmodel = mongoose.model('Products',ProductSchema);



const app = express();
app.use(cors());
// Định nghĩa các định tuyến và xử lý yêu cầu tại đây

// Lắng nghe các yêu cầu đến từ cổng 5000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongooseToObject = function (sp) {
    return sp ? sp.toObject() : sp;
  }

const multiMongooseToObject = function (data) {
    return data.map((i) => mongooseToObject(i));
  };


app.use('/api/v1/product/list',  (req,res)=>{
    productmodel.find({}).then(data=>{  
        res.send( multiMongooseToObject(data))}   )
      .catch()
     
})

app.use('/api/v1/product/detail/',  (req,res)=>{
    const id = req.query.id;
    productmodel.find({_id:id}).then(data=>{  
        res.send( multiMongooseToObject(data))}   )
      .catch()
  
})

app.post('/api/v1/product/update/',  (req,res)=>{
    
    const { id } = req.params;
   console.log("da goi thanh  cong",id);
    var dataform=req.body;

      productmodel.updateOne({id},dataform).then(data=>{  
        res.send( "update thành công")}   )
      .catch(err=>console.log(err))
  
})

app.post('/api/v1/product/delete/',  (req,res)=>{
    
    const { id } = req.params;
   console.log("da goi thanh  cong",id);
    var dataform=req.body;

      productmodel.deleteOne({id},dataform).then(data=>{  
        res.send( "delete thành công")}   )
      .catch(err=>console.log(err))
  
})

app.post('/api/v1/user/register',  (req,res)=>{
    const {password,username}=req.body;
    bcrypt.hash(password, 10)
    .then( hashedPassword => {
        const user = new UserModel({
            username,
            password: hashedPassword, 
        });
        const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
        user.save()
            .then(result => res.status(201).json({ token:token }))
            .catch(error => res.status(501).send({error}))

    }).catch(error => {
        return res.status(502).send({
            error : "Enable to hashed password"
        })
    })
})

app.post('/api/v1/user/login',  (req,res)=>{
    
    const { username, password } = req.body;
    console.log(username,password)
  const hashedps=bcrypt.hash(password, 10)
  if (username === 'nam' && bcrypt.compare(password,"11111")) {
   
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
     console.log(token )
    res.send({ 'message':'succesful login',
    'status':200,
    token});
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
})



connection().then(()=>{
    try{
        app.listen(5000, () => {
            console.log('Backend server is running on port 5000');
          });
    }
    catch(err){
    console.log(err)}

}).catch(err=>console.log(err))