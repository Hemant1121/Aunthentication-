const mongoose = require('mongoose');

const customer = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type: String,
        require:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Customer',customer);