import express from 'express';

import { AppUserModel } from '../db-utils/model.js';
import {mailOptions,transporter} from './mail.js';
import jwt from 'jsonwebtoken';

import { v4 } from 'uuid';


const authrouter=express.Router();

authrouter.post('/register',async (req,res)=> {
    try{
        const bodyReq=req.body;
        //checking the user email exist or not
        const appUser=await AppUserModel.findOne({email:bodyReq.email},{id:1,name:1,email:1 });
        
        if(appUser){
            res.status(409).send({ msg: 'User already exist'});
            return;
        }
        //encrypt/hashing the password stored in db
        //await bcrypt.hash(bodyReq.password,10,async(err,hash)=>{
          //  if(err){
            //    res.status(500).send({ msg: 'Error in Registering'});
              //  return;
            //}
            //const authUSer=AppUserModel({...bodyReq,password:hash,id:v4() });
            //await authUSer.save();
        //});
        const authUSer=AppUserModel({...bodyReq,id:v4(),isVerified: false });
        await authUSer.save();
        
        const verifyToken = jwt.sign({ email: bodyReq.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const link = `${process.env.FRONTEND_URL}/verify?token=${verifyToken}`
        await transporter.sendMail({ ...mailOptions, to: bodyReq.email, text: `Hi Hello, please Click On the Link ${link}` });

        res.send({ msg: 'User Registered Successfully' });
            }catch(err){
        console.log(`error in db registration ${err}`);
        res.status(500).send({ msg: 'Error in creating'});
    }
})

authrouter.get('/:email',async (req,res)=> {
    try{
        const email=req.params.email;
        const appUser=await AppUserModel.findOne({email},{id:1,name:1,email:1 });
        res.send(appUser);
    }catch(err){
        console.log(`error in db registration ${err}`);
        res.status(500).send({ msg: 'Error in creating'});
    }
})

authrouter.post('/forgotpasword',async (req,res)=> {
    try{
        const bodyReq=req.body;

        
    }catch(err){
        console.log(`error in sending mail:  ${err}`);
    }
})

authrouter.post('/verify', async function (req, res) {
    try {
        
      const token = req.body.token;

      jwt.verify(token, process.env.JWT_SECRET, async (err, ...result) => {
      await AppUserModel.updateOne( {email:result.email},{ '$set': { isVerified: true } });
      });
      
      console.log(token);
      res.send({ msg: 'User Verified' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: 'Error occuerred while fetching users' });
    }
  });

//Login

authrouter.post('/login', async function (req, res) {
    try {
  
      const bodyReq = req.body;
      const appUser = await AppUserModel.findOne({ email: bodyReq.email }, { id: 1, name: 1, email: 1,password: 1, _id: 0 });
      
      if(appUser){
            if(bodyReq.password == appUser.password){

                const responseObj=appUser.toObject();
                
                delete responseObj.password;
                res.send(responseObj);
            }else{
                
                res.status(401).send({code:0, msg: 'Invalid credentials'});
                return;
            }
      }else{
        res.status(404).send({ code:-1 ,msg: 'User Not Found'});
      }
      
    }catch(err){
        console.log(`error in db registration ${err}`);
        res.status(500).send({ msg: 'Error in creating'});
    }

})
export default authrouter;