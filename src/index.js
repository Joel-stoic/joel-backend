import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

const app=express()

dotenv.config({ path: "./.env" });

connectDB()
.then((result) => {
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Sever is running in,${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("MONGODB connection failed !!!", err)
});
