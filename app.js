const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv')
const authorize = require("./auth-middle");
const nodecron=require('node-cron')
const shell=require('shelljs')
const config = require("./config");

const app = express();
const port = process.env.PORT || 5000;

// Request a token,
// DISCLAIMER: User should be authenticated!!!
app.get("/token", (req, res) => {
  const payload = {
    name: "Jimmy",
    scopes: ["data:read","data:create"]
  };

  const token = jwt.sign(payload, config.JWT_SECRET);
  res.send(token);
});

app.get("/data", authorize("data:read"), (req, res) => {
  nodecron.schedule("05 * * * * *",function(){
      console.log("data")
      if(shell.exec("dir").code!==0){
          console.log("something went wrong")
      }
  })
});



const server = app.listen(port, () => {
    console.log(`Server is listening on ${server.address().port}`);
  });