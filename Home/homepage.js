const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const fetch = require("node-fetch");
const newsdb = require("../model/news");
const app = require("../app");

// const server = require("http").createServer(app);



router.get("/",(req,res)=>{
    newsdb.find({}).sort({publishedon:-1}).limit(3).exec((err,data)=>{
        if(err){
            throw err;
        }
        console.log("The Data from news db is ");
        console.log(data);
        if(data!=""){
        res.render("customerhomepage",{details:data});
        }
        else{
            res.render("customerhomepage",{details:"nodata"})
        }
    })
});

router.get("/getweather",(req,res)=>{
    fetch("http://api.openweathermap.org/data/2.5/weather?lat="+req.query.lat+"&lon="+req.query.long+"&appid=9e2cc2c1a1f101ab63b4d87f9f58b246&units=metric").
    then((data)=>data.json()).then((weather)=>{

        console.log(weather.main.humidity);
        console.log(weather.main.temp);
        console.log(weather.main.pressure);
        res.send(weather);
    });
    
});

module.exports = router;