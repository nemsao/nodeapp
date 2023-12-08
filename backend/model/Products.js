const mongoose=require('mongoose')
const Schema=mongoose.Schema;


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









module.exports=mongoose.model('Products',ProductSchema);
