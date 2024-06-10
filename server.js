require('dotenv').config()
const express = require("express");
const dbConnect = require("./Database/dbConnection");
const bodyParser = require('body-parser');
const distributeRouter = require('./Controller/distributeRouter')
const clc = require("cli-color");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
        cluster.fork();
      });
    }
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   


const app=express()
const PORT=process.env.PORT || 8086


app.use(bodyParser.json());




app.use(express.json());

require("./Queue/taskQueue");

dbConnect();

app.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: "Server is up an run condition. ",
  });
});


//Define Routes
app.use("/api", distributeRouter);

app.listen(PORT,()=>{console.log(clc.yellowBright(`Server is running on PORT:${PORT}`));});