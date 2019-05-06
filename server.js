const express = require('express');
const mysql = require('mysql');
const app=express();
const config=require('./dbdetails.js');
// const moment=require("moment");
// const curr=require("currency.js");

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
   //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control',  'no-cache');
    next();
   });

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

let connection = mysql.createConnection(config);
connection.connect(function(err){
  if(err){
    return console.log('error:'+err);
  }
  console.log('Connected to database successfully');
});

setInterval(()=>{
    connection.query("select 1",(err_check_test,results_test_check)=>{
      if(err_check_test)
      {
        console.log("Error while running connection alive query");
        return false;
  
      }
      console.log("connection alive query");
      return true;
  
    })
  },10800000); 

app.post("/getLocations1",(req,res)=>{

    console.log("from get locations");

    const getQ="select * from locations where location_type=1";
    connection.query(getQ,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.send({get:false,dbError:true})
        }
        else
        {
            res.send({get:true,details:results});
        }
    })

})

app.post("/getLocations2",(req,res)=>{

    console.log("from get locations");

    const getQ="select * from locations where location_type=2";
    connection.query(getQ,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.send({get:false,dbError:true})
        }
        else
        {
            res.send({get:true,details:results});
        }
    })

})

app.listen(8080,()=>{
    console.log(`Server is above to start at port number 8080`);
  });