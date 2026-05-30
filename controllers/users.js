    const User=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=> {
      res.render("users/signup.ejs");
    };

module.exports.signup=async(req,res)=> {
        try {
        let{username,email,password}=req.body;
        const newUser = new User({email,username});
       const registeruser=await User.register(newUser,password);
       console.log(registeruser);
       req.login(registeruser,(err)=> {
        if(err) {
            return next(err);
        }
         req.flash("success","welcome to Wanderlust!");
         res.redirect("/listings");
       })
        } catch(e) {
            req.flash("error",e.message);
            res.redirect("/signup");
        }
    };

   module.exports.renderUserForm=(req,res)=> {
      res.render("users/login.ejs");
   };

   module.exports.login=async(req,res)=> {
        req.flash("success","Welcome back to Wanderlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
   };

   module.exports.logout=(req,res,next)=> {
    req.logout((err)=> {
        if(err) {
        next(err); 
        } 
        req.flash("success","You have logged Out");
        res.redirect("/listings");   
    });
   };