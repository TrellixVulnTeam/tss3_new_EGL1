let express = require("express");
let routes = express.Router();
let sha1 = require("sha1");
let mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;
let database = require("../config/database");
let collName = "user";
let rand = require("random-string-gen");
let path = require("path");
// routes.get("/demo", (req, res)=>{
//     MongoClient.connect(database.dbUrl, (err, con)=>{
//         console.log(err);
//         var db = con.db(database.dbName);
//         db.collection(collName).find().toArray((err, result)=>{
//             res.send(result);
//         })
//     })
// })



routes.post("/", (req, res)=>{
    // console.log(req.body.FormData);
    // console.log(req.files);
    // return;
    var formdata = JSON.parse(req.body.FormData);
    // console.log(formdata);
    // return;

    delete formdata.re_password;
    formdata.password = sha1(formdata.password);

    // console.log(req.files);
    // return;
    
    var image = req.files.picture;
    var name = image.name;
    var arr = name.split(".");
    var ext = arr[arr.length - 1];
    var newname = rand(20)+"."+ext;
    formdata.pic = newname;
    
    

    MongoClient.connect(database.dbUrl, (err, con)=>{
        var db = con.db(database.dbName);
        db.collection(collName).insertOne(formdata, (err)=>{
            image.mv(path.resolve()+"/assets/profile/"+newname, (err)=>{
                if(err){
                    console.log(err);
                    return;
                }
                res.send({ success : true});
            })
        })
    })
})





module.exports = routes;