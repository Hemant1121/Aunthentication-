const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../../models/customer_user');
const {register_Validation,login_Validation} = require('../validation/validation');
require('dotenv').config()

exports.registerCustomer = registerCustomer;
exports.loginCustomer = loginCustomer;
exports.poste = poste


async function registerCustomer(req,res,next){

const {error} =  register_Validation(req.body);
  if (error) return res.json({error : error.message});
 

//Checking if the user is already in the database
const emailExist = await user.findOne({email: req.body.email});
if(emailExist) return res.status(400).json({message : 'Email Already exist'})

//create a new user
    try {
        const register = new user({
            name: req.body.name,
            email: req.body.email,
            password:req.body.password
        })

        register.password = await bcrypt.hash(register.password,10);
        const saveUser = await register.save();
        res.json(saveUser);
    } catch (err) {
        res.send('Error'+err);
    }
}
async function loginCustomer(req,res,next){

    const {error} =  login_Validation(req.body);
    if (error) return res.json({error : error.message});

    //checking if the eamil aleady exist
    const users = await user.findOne({email: req.body.email});
if(!users) return res.status(400).json({message : 'Email is Wrong'})

//PAssword Is Correct
const validPass = await bcrypt.compare(req.body.password, users.password);
if(!validPass) return res.status(400).send('Invalid Password')


//create and assign token
const token= jwt.sign({ _id: users._id}, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);

res.send('Log In')
}

async function poste(req,res,next){
    res.json({
        posts:{
            title: 'This is my First post',
            description: 'Welcome to my page. Thanks for visiting here'
        }
    })
}