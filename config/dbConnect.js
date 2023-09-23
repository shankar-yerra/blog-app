const mongoose=require("mongoose");

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DataBase Connected Successfully");
    }
    catch(error)
    {
        console.log("DataBase connection failed",error.message);
    }
};

dbConnect();