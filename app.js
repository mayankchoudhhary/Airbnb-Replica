const express = require("express");
const app = express();
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))


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


//index route
app.get("/listings",async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings})
})


//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})



//show route
app.get("/listings/:id",async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
})


//create route
app.post("/listings",async(req,res)=>{
//     const {title,description,image,price,country,location}=req.body;
//    await Listing.insertOne({
//         title:title,
//         description:description,
//         price:price,
//         image:{
//             url:image
//         },
//         country:country,
//         location:location
//     })
const newlisting =new Listing(req.body.listing);
await newlisting.save();
res.redirect("/listings")
})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    const { id}=req.params;
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
})


//update route
app.put("/listings/:id",async(req,res)=>{
    const{id}=req.params;
    console.log(req.body.listing)
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect("/listings")
})


//delete route
app.delete("/listings/:id",async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})





// app.get("/testListing",(req,res)=>{
//     let samplelisting = new Listing({
//         title:"My new villa",
//         description:"by the beach",
//         price:12000,
//         location:"Calangute, Goa",
//         country:"India"
//     });
//     samplelisting.save().then((res)=>{
//         console.log(res)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//     res.send("testing-fine");
// })

app.listen(8080,()=>{
    console.log("server is listening on the port: 8080");
})