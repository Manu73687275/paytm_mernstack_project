const express=require("express");
const cors=require("cors")
const app=express();
const  mainroute  = require("./routes/index.js");

app.use(cors());
app.use(express.json());

app.use("/api/v1",mainroute)

app.listen(3000);