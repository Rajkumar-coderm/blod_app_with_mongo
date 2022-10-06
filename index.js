require("./db/db");
const express = require("express"); /// this is line import express from npm.
const morgan = require('morgan');
require('dotenv').config()  /// this line is config .env file in over sever root.
const app = express();
app.use(express.json()); /// this is middelware it is comman sevice to join clint side to server side.
app.use(morgan('dev')); ///this is loger for log over sever is runing retung [Request Method and Status],
const userRouts = require("./routes/user_routes");
const blogRoutes = require('./routes/blog_routes');
app.use("/api/vi/user", userRouts);
app.use('/api/vi/blog',blogRoutes);

// const imageExtensions = require('image-extensions');

// console.log(imageExtensions);
// fs.writeFileSync('extentionfile.text',imageExtensions.toString());


app.use('*',(req,res)=>{
    res.status(404).send({
        message:"Page not Found",
    });
});

const port = process.env.PORT || 3000;

/// this is listen to the server to run over code with express..
app.listen(port, () => {
  console.log(`server is reaning at ${port}`);
});
