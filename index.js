// require("./db/db");
// var bodyParser = require('body-parser');
// const express = require("express");
// const morgan = require('morgan');
// require('dotenv').config()  /// this line is config .env file in over sever root.
// const app = express();
// app.use(express.json({limit:"200mb"})); /// this is middelware it is comman sevice to join clint side to server side.
// app.use(morgan('dev')); 
// app.use(bodyParser.json({limit:'2gb'})); 
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(upload.single()); 
// const userRouts = require("./routes/user_routes");
// const blogRoutes = require('./routes/blog_routes');
// const fileUploadRoutes = require('./routes/flie_upload_routes');
// const phoneNumberRout = require('./routes/phone_number_login_rotes');

// app.use("/api/v1/user", userRouts);
// app.use('/api/v1/blog',blogRoutes);
// app.use('/api/v1/file',fileUploadRoutes);
// app.use('/api/v1/loginWithPhone',phoneNumberRout);

// // const imageExtensions = require('image-extensions');

// // console.log(imageExtensions);
// // fs.writeFileSync('extentionfile.text',imageExtensions.toString());


// app.use('*',(req,res)=>{
//     res.status(404).send({
//         message:"Page not Found",
//     });
// });

// const port = process.env.PORT || 3000;

// /// this is listen to the server to run over code with express..
// app.listen(port, () => {
//   console.log(`server is reaning at http://192.168.0.188:${port}/api/v1/blog`);
// });

// // అఖిలం అఖిల

const agora = require('agora-access-token');

const appID = '689a79372845442c93a3ffa522a416d2'; // replace with your Agora app ID
const appCertificate = '05f73296435247cba2c98b0e6fead39f'; // replace with your Agora app certificate
const channelName = 'chatApp'; // replace with the name of your video call channel
const uid = 0; // replace with the user ID of the caller

const expirationTimeInSeconds = 259200; // token expiration time in seconds
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

const token = agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, agora.RtcRole.PUBLISHER, privilegeExpiredTs);

console.log(token); // output the generated token
