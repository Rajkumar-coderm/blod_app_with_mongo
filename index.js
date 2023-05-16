require("./db/db");
var bodyParser = require('body-parser');
const express = require("express");
const morgan = require('morgan');
require('dotenv').config()  /// this line is config .env file in over sever root.
const app = express();
app.use(express.json({limit:"200mb"})); /// this is middelware it is comman sevice to join clint side to server side.
app.use(morgan('dev')); 
app.use(bodyParser.json({limit:'2gb'})); 
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.single()); 
const userRouts = require("./routes/user_routes");
const blogRoutes = require('./routes/blog_routes');
const fileUploadRoutes = require('./routes/flie_upload_routes');
const phoneNumberRout = require('./routes/phone_number_login_rotes');
const videoStreem = require('./routes/video_strreem_routes');


app.use("/api/v1/user", userRouts);
app.use('/api/v1/blog',blogRoutes);
app.use('/api/v1/file',fileUploadRoutes);
app.use('/api/v1/loginWithPhone',phoneNumberRout);
app.use('/api/v1/videoCall',videoStreem);




app.use('*',(req,res)=>{
    res.status(404).send({
        message:"Page not Found",
    });
});

const port = process.env.PORT || 3000;

/// this is listen to the server to run over code with express..
app.listen(port, () => {
  console.log(`server is reaning at http://localhost:${port}/api/v1/blog`);
});

// అఖిలం అఖిల