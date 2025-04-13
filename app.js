const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

main().then((res)=>{
    console.log("connection successfull");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/",(req,res)=>{
    res.send("Hi , I am root");
})

app.get("/testListing",(req,res)=>{
    let samplelisting = new Listing({
        title:"My new villa",
        description:"by the beach",
        price:12000,
        location:"Calangute, Goa",
        country:"India"
    });
    samplelisting.save().then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err);
    })
    res.send("testing-fine");
})

app.listen(8080,()=>{
    console.log("server is listening on the port: 8080");
})