const mongoose=require('mongoose')
const Schema=mongoose.Schema;


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

module.exports=mongoose.model('Users',UserSchema);
