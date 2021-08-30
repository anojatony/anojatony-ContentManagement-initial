
//library app // Main Server

const express=require('express');
const app = new express();
const multer = require('multer');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const User = require('./src/model/Userdata');
const Blog = require('./src/model/Blogdata');

email='admin@gmail.com';
password='Admin123@';

//PORT
const port=process.env.PORT || 8000;


app.use(cors());

// POST middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 


//middleware function..static
app.use(express.static('./public'));


// multer setup

// setting up storage folder destination and filename
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './public/images');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });
  
 // specifying file type
  const fileFilter = (req,file,callback)=>{
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
   callback(null,true);
   }
   else{
       callback(null,false);
   }
  }
  
  
  const upload = multer({
      storage: storage,
      fileFilter:fileFilter
    });
  

// multer ends

//middleware for verifying token
function verifyRootuser(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let rootuser = req.headers.authorization.split(' ')[1]
  if(rootuser === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(rootuser, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}




// get users
app.get('/users',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
        User.find()
        .then(function(users){
           res.send(users)     
        })
    })

// approve admin
app.put('/approve', verifyRootuser,(req,res)=>{
  console.log(req.body)
  id= req.body._id,
  firstname= req.body.firstname,
  lastname= req.body.lastname,
   email= req.body.email,
  password=req.body.password,
  phone= req.body.phone,
  role= "admin"
  
 User.findByIdAndUpdate({"_id":id},
                              {$set:{"firstname":firstname,
                              "lastname":lastname,
                              "email":email,
                              "password":password,
                              "phone":phone,
                               "role":role }})
 .then(function(){
     res.send();
 })
})

//Delete admin privilege
app.put('/deleteadmin',verifyRootuser,(req,res)=>{
  console.log(req.body)
  id= req.body._id,
  firstname= req.body.firstname,
  lastname= req.body.lastname,
   email= req.body.email,
  password=req.body.password,
  phone= req.body.phone,
  role= "user"
  
 User.findByIdAndUpdate({"_id":id},
                              {$set:{"firstname":firstname,
                              "lastname":lastname,
                              "email":email,
                              "password":password,
                              "phone":phone,
                               "role":role }})
 .then(function(){
     res.send();
 })
})


//create post
app.post('/post', upload.single('image'),function (req,res){
  // console.log("hi")
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    console.log(req.file);
 var blog={
   title:req.body.title,
   author:req.body.author,
   introduction:req.body.introduction,
   content:req.body.content,
   category:req.body.category,
   date:req.body.date,
   image: 'http://localhost:8000/images/'+ req.file.filename
}
var post = Blog(blog);
post.save();
})

// app.post('/approve',verifyRootuser,function (req,res){
//     res.header("Access-Control-Allow-Origin","*")
//     res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
//     console.log(req.body);

//     Admin.findOne({email : req.body.email}).exec(function(err,user){

//       if(user){
//         res.status(401).send({user})
//         console.log("Already approved");
//       }
//       else{
//         var admin={
//           firstname:req.body.firstname,
//           lastname:req.body.lastname,
//           email:req.body.email,
//           password:req.body.password,
//           phone: req.body.phone
//        }
//        var admin = Admin(admin);
//        admin.save();
//       }
//     });
 
// })

//  //delete approved user
// app.delete('/userdelete/:id',(req,res)=>{
   
//   // console.log("hi")
//   id = req.params.id;
//   User.findByIdAndDelete({"_id":id})
//   .then(()=>{
//       console.log('User Deleted')
//       res.send();
//   })
// })


// // get admins
// app.get('/admins',function(req,res){
//   res.header("Access-Control-Allow-Origin","*")
//   res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
//       Admin.find()
//       .then(function(admins){
//          res.send(admins)     
//       })
//   })


//  //delete admin
//  app.delete('/deleteadmin/:id',verifyRootuser,(req,res)=>{
   
//   // console.log("hi")
//   id = req.params.id;
//   Admin.findByIdAndDelete({"_id":id})
//   .then(()=>{
//       console.log('User Deleted')
//       res.send();
//   })
// })

// // approve user
// app.post('/approveuser',function (req,res){
//   res.header("Access-Control-Allow-Origin","*")
//   res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
//   console.log(req.body);

//   User.findOne({email : req.body.email}).exec(function(err,user){

//     if(user){
//       res.status(401).send({user})
//       console.log("Already user exists");
//     }
//     else{
//       var user={
//         firstname:req.body.firstname,
//         lastname:req.body.lastname,
//         email:req.body.email,
//         password:req.body.password,
//         phone: req.body.phone
//      }
//      var user = User(user);
//      user.save();
//     }
//   });

// })

//getting id
// app.get('/book/:id',  (req, res) => {
  
//   const id = req.params.id;
//     Bookdata.findOne({"_id":id})
//     .then((book)=>{
//         res.send(book);
//     });
// })


// //updatebook
// app.put('/updatebook',upload.single('image'),(req,res)=>{
//   console.log(req.file)
//   console.log(req.body)
//   id=req.body.id,
//   title= req.body.title,
//   author = req.body.author,
//   genre = req.body.genre,
//   content = req.body.content,
//   image = 'http://localhost:8000/images/'+ req.file.filename
  
//  Bookdata.findByIdAndUpdate({"_id":id},
//                               {$set:{"title":title,
//                               "author":author,
//                               "genre":genre,
//                               "content":content,
//                               "image":image}})
//  .then(function(){
//      res.send();
//  })
// })



 


    //signup
    
      app.post('/signup', (req, res) => {
      res.header("Access-Control-Allow-Origin","*")
      res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      // console.log("hi")
        console.log(req.body);
         User.findOne({email : req.body.email}).exec(function(err,user){
        console.log(user);
        if(user) {
          res.status(401).send({user})
          console.log("user exists");
        } 

        else{

         var data = {
              firstname : req.body.firstname,
              lastname: req.body.lastname,
              email : req.body.email,
              password : req.body.password,
              phone: req.body.phone
    }
    var data = new User(data);
    data.save();
    res.status(200).send();
  }
})
 })
 


//login
app.post('/login', async(req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

  let emaild=req.body.email;
  let pwdd=req.body.password;
  // console.log(emaild);
  // console.log(pwdd);
      
  let user = await User.findOne({role:"user",email: req.body.email, password:req.body.password})
  let token =  await User.findOne({role:"admin",email: req.body.email, password:req.body.password})

     try{

    if(req.body.email=="admin@gmail.com" && req.body.password=="Admin123@"){
        let payload={subject:email+password}
       let rootuser=jwt.sign(payload,'secretKey')  
       res.status(200).send({rootuser})
      }
     else if(user){
      let payload={subject:emaild+pwdd}
      let user=jwt.sign(payload,'secretKey')  
      res.status(200).send({user})
       console.log("success")
     }
     else if(token){
      let payload={subject:emaild+pwdd}
      let token=jwt.sign(payload,'secretKey')  
      res.status(200).send({token})
       console.log("admin")
     }
     else{
       res.status(401).send();
     }
    
     }
     catch(err){
      console.log(err)
     }
    
  })
  

//port

app.listen(port,()=>{
    console.log("Server Ready at"+port);
});