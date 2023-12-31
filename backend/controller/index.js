
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
var ObjectId = require('mongodb').ObjectID;
const express = require('express');
const productmodel=require('../model/Products')
const UserModel=require('../model/User')
const app = express.Router();



const mongooseToObject = function (sp) {
    return sp ? sp.toObject() : sp;
  }

const multiMongooseToObject = function (data) {
    return data.map((i) => mongooseToObject(i));
  };

app.get('/api/v1/product/list',  (req,res)=>{
    productmodel.find({}).then(data=>{  
        console.log("xuat list", data)
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

  

module.exports=app;