const userModel = require('../models/UserModel')
const bcrypt = require ("bcrypt")

const signUpUser = async(req,res)=>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt)
        req.body.password=hashedPassword;
        const user = await userModel.create(req.body)
        res.status(201).json({
            message:"User registered",
            data: user,
        })
        
    }
    catch(err){
        res.status(500).json({
            message:"user not registered",
            error:err
           
        })
    }
}


const loginUser = async(req,res)=>{
    try{
        
        const email= req.body.email;
        const password= req.body.password;

        const findUserByEmail = await userModel.findOne({email:email})
        if(findUserByEmail != null){
            const isMatch= bcrypt.compareSync(password,findUserByEmail.password);

            if(isMatch==true){
             res.status(200).json({
                message:"Login Succesful",
                data:findUserByEmail
             })

            }
            else{
            res.status(404).json({
            message:"invalid credential..."
            });
         }
    }else{
        res.status(404).json({
            message:"email not found"
          });
    }
}
    catch(err){
        res.status(500).json({
            message:"login nahi hora ",
            error:err
        })
    }

}


const getAllUser=async(req,res)=>{
    try{
        const allUser = await userModel.find().populate("petData")

        res.status(200).json({
            message:"users fetched successfull",
            allUser,
        })
    }
    catch(err)
    {
        res.status(404).json({
            message:"users not found"
        })
    }
}

const getSingleUser = async(req,res) =>{

    try{
        const user =  await userModel.findById(req.params.id).populate("petData")
        res.status(200).json({
            message:"user fetched...",
            user
        })
    }catch(err){
        res.status(404).json({
            message:"user not found",
        })
    }

}

module.exports={
    signUpUser,
    loginUser,
    getAllUser,
    getSingleUser
}