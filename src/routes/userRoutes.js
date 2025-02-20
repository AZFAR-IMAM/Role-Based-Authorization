const express = require("express");

const route = express.Router();

//Only admin can access this route
route.get("/admin",(req,res)=>{
    let token;
    let authHeader = req.headers.authorization || req.header.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "No token, Authorization denied"})
        }
    }
})

//Both admin and manager can access this route
route.get("/manager",(req,res)=>{
    res.json({message:"Wellcome manager"})
})

//All can access this route
route.get("/user",(req,res)=>{
    res.json({message:"Wellcome user"})
})

module.exports = route;