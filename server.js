const express = require("express");
const app = require("./app");
const chalk = require("chalk");

const port = process.env.PORT||8081;
const mongoose = require("mongoose");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const db_url = "mongodb://localhost:27017/local";
if(process.env.MONGO_DB_URI){
    db_url = process.env.MONGO_DB_URI;
}
var users = {};


app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static(__dirname+"/public"));



io.on("connection",(socket)=>{

    socket.on("usernamesent",(usernamefromajax,callbacktoajax)=>{
        console.log(chalk.yellow("username received from the socket is "));
        console.log(usernamefromajax);
        if(usernamefromajax in users){
            
            callbacktoajax(true);
        }else{
            socket.username = usernamefromajax;
            users[socket.username] = socket;
            console.log(chalk.red("The Socket Object is "));
            console.log(socket)
            callbacktoajax(false);
        }
    })

    socket.on("mynewmessage",(messagefromajax)=>{
        console.log(chalk.green("Message received from ajax is "));
        console.log(messagefromajax);
        io.sockets.emit("sendmessage",{msg:messagefromajax,user:socket.username});
    })

})

// Practise of Socket IO
// io.on("connection",(socket)=>{
//     socket.on("usernamesent",(usernamefromajax,callbacktoajax)=>{
//         console.log(chalk.yellow("username received from the socket is "));
//         console.log(usernamefromajax);
//         if(usernamefromajax in users){
//             callbacktoajax(true);
//         }
//         else{
//             socket.username = usernamefromajax;
//             console.log(chalk.red("The Socket Object is"));
//             users[socket.username] = socket;
//             console.log(users[socket.username]);
//             callbacktoajax(false);
//         }
//     });
// });


server.listen(port,()=>{
    console.log("App is listening on port %s",port);
});


mongoose.connect(db_url);
mongoose.connection.on("connected",()=>{
    console.log("Connected to mongodb successfully");
});


app.get("/",(req,res)=>{
    res.redirect("/home/");
});

