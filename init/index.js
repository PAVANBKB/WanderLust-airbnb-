const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");
const { object } = require("joi");

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
main().then(()=> {
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB =async ()=> {
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=> ({
        ...obj,
        owner:"6a10ef723546f4cdc1be1616",
    }));
    await listing.insertMany(initdata.data);
    console.log("data has intialized");

};

 initDB();







































