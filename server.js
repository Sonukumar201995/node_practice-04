const db=require("./db")

const express=require('express');
const app=express();

app.get("/",(req,res)=>{
    res.send("welcome to our library management system")
})

app.listen(3000,()=>{
    console.log("server is listen")
})