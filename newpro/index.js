const express = require('express');
const app = express();
const port = 8889;
const bodyParser = require('body-parser');
var multer = require('multer');

var jsonfile = require('jsonfile');
const path =require('path');
const fs = require('fs');


var Storage = multer.diskStorage({
   destination: function(req, file, callback) {
      console.log(req.user);
       callback(null, `/Users/pallavi/college/psychometricAnalysis/UsersData/${req.user}/${req.testname}/`+`Images2/`);
   },
   filename: function(req, file, callback) {
      //console.log(file,"heheheh");
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
   var fileType2=  '.png';
   var files = [], i;
   fs.readdir(imageDir, function (err, list) {
       for(i=0; i<list.length; i++) {
           if(path.extname(list[i]) === fileType1 || path.extname(list[i]) === fileType2) {
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
      
      req.user = req.params.user;
      req.testname= req.params.testname;
      let json=JSON.stringify(req.body);
      //let json=req.body;
      console.log(json);
      const folderName = `/Users/pallavi/college/psychometricAnalysis/UsersData/${req.user}/${req.testname}/`+`Images2`;
      try {
         if (!fs.existsSync(folderName)){
            fs.mkdirSync(folderName,{recursive: true});
         }
         } catch (err) {
         console.error(err)
         }
      fs.openSync(`/Users/pallavi/college/psychometricAnalysis/UsersData/${req.user}/${req.testname}/`+"quesans.json",'w');
      fs.writeFileSync(`/Users/pallavi/college/psychometricAnalysis/UsersData/${req.user}/${req.testname}/`+"quesans.json", json, {spaces:2},function(err, result) {
         if(err) console.log('error', err);
         res.send(JSON.stringify({
            error:true,
            msg:"password not right"
         }));
       });
       

   });

   app.post("/upload/:user/:testname/", function(req, res) {
      req.user = req.params.user;
      req.testname= req.params.testname;
      const folderName = `/Users/pallavi/college/psychometricAnalysis/UsersData/${req.user}/${req.testname}/`+`Images2`;
      try {
         if (!fs.existsSync(folderName)){
            fs.mkdirSync(folderName,{recursive: true});
         }
         } catch (err) {
         console.error(err)
         }
      console.log("image upload k ander");
      
      upload(req, res, function(err) {
          if (err) {
             console.log(err);
              return res.end("Something went wrong!");
          }
          return res.end("File uploaded sucessfully!");
      });
   });

   app.get("/findtest/:user/:testname/", function(req, res) {
      console.log("yftgjhwefbkjsnvkljkhv");
      req.user = req.params.user;
      req.testname= req.params.testname;
      jsonfile.readFile(`/Users/pallavi/college/psychometricAnalysis/UsersData/${req.user}/${req.testname}/`+'quesans.json',(err,obj)=>{
         console.log("ander aaya get k");
         
         if(!err){
            console.log("no error give quesans");
            let data = obj["data"];
            res.send(JSON.stringify({
               error:false,
               msg:"Found the file",
               response:{
                     data
               }

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
      req.user = req.params.user;
      req.testname= req.params.testname;
      
      var imageDir=`/Users/pallavi/college/psychometricAnalysis/UsersData/${req.user}/${req.testname}/Images2/`;
      getImages(imageDir, function (err, files) {
         var imageLists = '<ul>';
         for (var i=0; i<files.length; i++) {
             imageLists += '<li><a href="/?image=' + files[i] + '">' + files[i] + '</li>';
         }
         imageLists += '</ul>';
         res.send(JSON.stringify({
            error:false,
            msg:"Found the file",
            response:{
               imageLists
            }

         }));
         //res.send(imageLists);
     });

      jsonfile.readFile(`/Users/pallavi/college/psychometricAnalysis/UsersData/${req.user}/${req.testname}/`+'quesans.json',(err,obj)=>{
         console.log("ander aaya get k");
         
         if(!err){
            console.log("no error give quesans");
            let data = obj["data"];
            res.send(JSON.stringify({
               error:false,
               msg:"Found the file",
               response:{
                     data
               }

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
      })
      // console.log(req.body.headers);
      //res.send("done");
   });


});
app.get('/firstapi/:apino',function (req,res) {
   let apino = req.params.apino;

   res.send("welcome"+apino);
});

