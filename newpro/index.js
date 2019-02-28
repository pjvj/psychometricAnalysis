const express = require('express');
const app = express();
const port = 8889;
const bodyParser = require('body-parser');

const jsonfile = require('jsonfile');


let userexist = JSON.stringify({
   error:true,
   msg:"User already exist"
});
let usernotexist = JSON.stringify({
   error:true,
   msg:"User not exist"
});

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
   app.post('/registernewuser',function(req,res){
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
               res.send(JSON.stringify({
                  error:false,
                  msg:"usesr successfully created"
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

