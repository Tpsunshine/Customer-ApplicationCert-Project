const mongoose = require("mongoose");
const news = new mongoose.Schema({
                                title: {type:String},
                                description: {type:String},
                                imageurl: {type:String},
                                publishedat:{type:String},
                                publishedon:{type:Date}
                                })

module.exports = mongoose.model("New",news);