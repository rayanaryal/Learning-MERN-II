require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router")
const connectDb = require("./utils/db");

app.use(express.json()); // middleware to work with json data

app.use("/api/auth", router);

const PORT = 500;
connectDb().then(()=>{
    app.listen(PORT, () =>{
        console.log(`server is running at port : ${PORT}`)
    });
});
