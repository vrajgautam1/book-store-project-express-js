const path = require("path");
const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminSchema");
const bcrypt = require("bcrypt");

//1-Admin Signup

//get
router.get("/adminSignUp", (req, res) => {
  console.log(req)
  return res.render("adminSignUp", { error: null });
});

router.post("/adminSignUp", async (req, res)=>{

  try{
    const{email, password} = req.body;
    const adminExists = await adminModel.findOne({email});
  
    if(adminExists){
      return res.status(400).render("adminSignUp", { error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password,10)
    await adminModel.create({email, password:hashedPassword})
    res.redirect("/adminLogin")

  }catch(err){
    console.log(err)
    res.render("adminSignUp", {error: "An error occured during SignUp"})
  }
})



//2- Admin Login
router.get("/adminLogin", (req, res) => {
  return res.render("adminLogin", { error: null });
}); //get


router.post("/adminLogin", async (req, res)=>{
  const { email, password } = req.body;

  try{
    const admin = await adminModel.findOne({email}); //we are trying to fetch an admin if it exists

  if(!admin){
    return res.render("adminLogin", {error: "Admin does not exist."}) //handle if we couldnt find admin from our database
  }

  const passwordisCorrect = await bcrypt.compare(password, admin.password) //if admin exists then check if the password is correct.

  if(!passwordisCorrect){
    return res.render("adminLogin", {error: "email or password is incorrect"})//handle if the password is incorrect
  }

  return res.redirect("/adminPanel"); //if everything goes well then go to admin Panel page.
  }catch(err){
    console.log(err.message)
    res.render("adminLogin", {
      error:"Something went wrong"
    })
  }
})


module.exports = router;



//post
// router.post("/adminSignUp", async (req, res) => {
//   try {
//     //step-1 get the stuff in post request and check if it exists in the database.
//     const { email, password } = req.body;

//     //try to find the admin in our database using the email we got.
//     const adminExists = await adminModel.findOne({ email });

//     //step - 2: if admin exists then handle it
//     if (adminExists) {
//       return res.status(400).render("adminSignUp", { error: "admin already exists" });
//     }

//     //step - 3: if admin does not exists then (encrypt the password and add the admin object to the database)

//     //-1 encrypt the password field
//     const hashedPassword = await bcrypt.hash(password, 10);

//     //-2 add the object with {email, password: hashedPassword}
//     await adminModel.create({ email, password: hashedPassword });

//     //-3 procedd (redirect in this case) to the login page
//     return res.redirect("/adminLogin");
//   } catch (err) {
//     console.log(err.message);
//     res.render("adminSignUp", { error: "An error occured during SignUp" });
//   }
// });



// router.post("/adminLogin", (req, res) => {
//   const { email, password } = req.body;

//   const user = adminUsers.find((user) => {
//     return user.email === email && user.password === password;
//   });

//   if (!user) {
//     return res.render("adminLogin", { error: "inivalid email or password!" });
//   }

//   return res.redirect("/adminPanel");
// }); //post