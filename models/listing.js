const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const listingSchema =new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        filename:String,
        url:{
            type:String,
        default:"https://images.unsplash.com/photo-1505968409348-bd000797c92e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        set:(v) => v=== "" ? "https://images.unsplash.com/photo-1505968409348-bd000797c92e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D" : v
    }},
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
})

const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing;