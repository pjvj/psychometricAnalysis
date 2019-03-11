const express = require('express');
const app = express();
const port = 8889;
const bodyParser = require('body-parser');
var multer = require('multer');

var jsonfile = require('jsonfile');
const path =require('path');
const fs = require('fs');
const Dpath = `/Users/Pallavi/dldl/psychometricAnalysis/UsersData/`;


var Storage = multer.diskStorage({
   destination: function(req, file, callback) {
      
      //console.log(req.user);
      if(req.user && req.testname)
      callback(null, `${Dpath}${req.user}/${req.testname}/`+`Images2/`);
      else
      callback(null, `${Dpath}`);
      
   },
   filename: function(req, file, callback) {
      console.log(file,"heheheh");
       callback(null, file.originalname );
   }
});


var upload = multer({
   storage: Storage
}).array("imgUploader", 100);


let userexist = JSON.stringify({
   error:true,
   msg:"User already exist"
});
let usernotexist = JSON.stringify({
   error:true,
   msg:"User not exist"
});


function getImages(imageDir, callback) {
   var fileType1 = '.jpg';
   var fileType2 =  '.png';
   var fileType3 = '.jpeg';
   var files = [], i;
   fs.readdir(imageDir, function (err, list) {
       for(i=0; i<list.length; i++) {
           if(path.extname(list[i]) === fileType1 || path.extname(list[i]) === fileType2 || path.extname(list[i]) === fileType3) {
               files.push(list[i]); //store the file name into the array files
           }
       }
       callback(err, files);
   });
}

app.listen(port,()=> {
    console.log("hey we are live on port",port);
   app.use(bodyParser.urlencoded({
      extended: true
   }));
  // app.use(cors);
   app.use(bodyParser.json());
   app.use(function (req,res,next) {
      //next();
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
      next();
   });


   app.post('/uploadtest/:user/:testname/',function(req, res){
      console.log("quesans upload k ander");
      
      let user = req.params.user;
      let testname= req.params.testname;
       
      req.user = req.params.user ;
      req.testname = req.params.testname ;
      let json=req.body;
      //let json=req.body;
      console.log(json);
      const folderName = `${Dpath}${user}/${testname}/`+`Images2`;
      try {
         if (!fs.existsSync(folderName)){
            fs.mkdirSync(folderName,{recursive: true});
         }
         } catch (err) {
         console.error(err)
         }
      fs.readFile(`${Dpath}${user}/testDetails.json`,(err,obj)=>{
         
         if(err)
         {
            console.log(err);
            let testsDetails = {};
            testsDetails[testname]={userslist:[],testDescription:json.description};   
            fs.writeFileSync(`${Dpath}${user}/testDetails.json`,JSON.stringify(testsDetails),{spaces:2});
         }
         else
         {
            console.log(obj);
            let testsDetails = JSON.parse(obj);
            testsDetails[testname]={
               userslist:[],
               testDescription:json.description
            }
            fs.writeFileSync(`${Dpath}${user}/testDetails.json`,JSON.stringify(testsDetails),{spaces:2});
         }
      })
      fs.openSync(`${Dpath}${user}/${testname}/`+"quesans.json",'w');
      fs.writeFileSync(`${Dpath}${user}/${testname}/`+"quesans.json", JSON.stringify(json.data), {spaces:2},function(err, result) {
         if(err) console.log('error', err);
         res.send(JSON.stringify({
            error:true,
            msg:"password not right"
         }));
       });
       

   });

   app.post("/upload/:user/:testname/", function(req, res) {
      let user = req.params.user;
      let testname= req.params.testname;
      
      req.user = req.params.user ;
      req.testname = req.params.testname ;
      const folderName = `${Dpath}${user}/${testname}/`+`Images2`;
      try {
         if (!fs.existsSync(folderName)){
            fs.mkdirSync(folderName,{recursive: true});
         }
         } catch (err) {
         console.error(err)
         }
      //console.log("image upload k ander");
      
      upload(req, res, function(err) {
          if (err) {
             console.log(err);
              return res.end("Something went wrong!");
          }
          return res.end("File uploaded sucessfully!");
      });
   });


   app.post("/uploadfer/", function(req, res) {
      //console.log("image upload k ander");
      upload(req, res, function(err) {
          if (err) {
             console.log(err);
              return res.end("Something went wrong!");
          }
          return res.end("File uploaded sucessfully!");
      });
   });


   app.post("/modifyimages/:user/:testname/", function(req, res) {
      console.log("modify image m response",req.body);
      let user = req.params.user;
      let testname= req.params.testname;
      
      req.user = req.params.user ;
      req.testname = req.params.testname ;
      let l=req.body;
      const folderName = `${Dpath}${user}/${testname}/`+`Images2`;
      try {
         if (!fs.existsSync(folderName)){
            fs.mkdirSync(folderName,{recursive: true});
         }
         } catch (err) {
         console.error(err)
         }
      //console.log("image upload k ander");
      for (var i =0; i<l.length;i++){
         fs.unlink(`${Dpath}${user}/${testname}/`+`Images2/${l[i]}`, function(error) {
            if (error) {
               throw error;
            }
            console.log('Deleted dog.jpg!!');
         });
      }
   });

   app.get('/getimage/:user/:test/:image',(req,res)=>{
      let user = req.params.user;
      let test = req.params.test;
      let image = req.params.image;
      res.sendFile(`${Dpath}${user}/${test}/Images2/${image}`);
   })

   app.get("/findtest/:user/:testname/", function(req, res) {
      console.log("yftgjhwefbkjsnvkljkhv");
      let user = req.params.user;
      let testname= req.params.testname;
      jsonfile.readFile(`${Dpath}${user}/${testname}/`+'quesans.json',(err,obj)=>{
         console.log("ander aaya get k");
         
         if(!err){
            console.log("no error give quesans");
            res.send(JSON.stringify({
               error:false,
               msg:"Found the file",
               response:obj
            }));
         }
         else
         {
            console.log("yes error give eeror");
            res.send(JSON.stringify({
               error:true,
               msg:err
            }));
         }
      });
   });

   app.get("/findimages/:user/:testname/", function(req, res) {
      console.log("inside find images");
      let user = req.params.user;
      let testname= req.params.testname;
      
      var imageDir=`${Dpath}${user}/${testname}/Images2/`;
      getImages(imageDir, function (err, files) {
         if(!err)
         {
         res.send(JSON.stringify({
            error:false,
            msg:"Found the file",
            response:
               files

         }));
      }
      else
      {
         res.send(JSON.stringify([]));
      }
     });
   });


   app.post('/getTests',(req,res)=>{
      let user = req.body.username;
      fs.readFile(`${Dpath}${user}/testDetails.json`,(err,obj)=>{
         if(err)
         {
            res.send(JSON.stringify([]));
         }
         else
         {
            obj = JSON.parse(obj);
            res.send(JSON.stringify(Object.keys(obj)));
         }
      })
   });


   app.post('/adminusersvalid/',(req,res)=>{
      let d = req.body;
      jsonfile.readFile('./users.json',(err,obj)=>{
         if(obj[d.username]&&obj[d.username].admin==d.admin)
         {
            let data = obj[d.username];
            if(data.password===d.password)
            {
               res.send(JSON.stringify({
                  error:false,
                  mag:"Successfully logged In",
                  response:{
                     username:d.username,
                     email:data.email,
                     fullname:data.name
                  }

               }));
            }
            else
            {
               res.send(JSON.stringify({
                  error:true,
                  msg:"password not right"
               }))
            }
         }
         else
         {
            res.send(usernotexist);
         }
      })
      
   })
   app.post('/registernewuser/',function(req,res){
      let d = req.body;
      console.log("body",d);
      jsonfile.readFile('./users.json',(err,obj)=>{
         if(!err)
         {
            if(obj[d.username])
            {
               res.send(userexist);
            }
            else
            {
               let entry = {
                  name:d.fullname,
                  email:d.email,
                  password:d.password,
                  admin:d.admin
               }
               obj[d.username]=entry;
               jsonfile.writeFileSync('./users.json',obj,{spaces:2});
               const folderName = '/Users/pallavi/college/psychometricAnalysis/UsersData/'+d.username;

               try {
               if (!fs.existsSync(folderName)){
                  fs.mkdirSync(folderName,{recursive: true});
               }
               } catch (err) {
               console.error(err)
               }

               res.send(JSON.stringify({
                  error:false,
                  msg:"user successfully created"
               }));

            }
         }
         else
         {
            let obj = {};
            let entry = {
                  name:d.fullname,
                  email:d.email,
                  password:d.password,
                  admin:d.admin
               }
               obj[d.username]=entry;
               jsonfile.writeFileSync('./users.json',obj,{spaces:2});
               const folderName = '/Users/pallavi/college/psychometricAnalysis/UsersData/'+d.username;

               try {
               if (!fs.existsSync(folderName)){
                  fs.mkdirSync(folderName,{recursive: true});
               }
               } catch (err) {
               console.error(err)
               }

               res.send(JSON.stringify({
                  error:false,
                  msg:"user successfully created"
               }));

         }
      })
      // console.log(req.body.headers);
      //res.send("done");
   });


});
app.get('/firstapi/:apino',function (req,res) {
   let apino = req.params.apino;

   res.send("welcome"+apino);
});

