const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const modemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const jwt = require('jsonwebtoken');


mongoose.connect("mongodb://localhost:27017/" ,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
}). then(() => {
   console.log("connected to MongoDB");
})
  .catch((err) => {
    console.log("Error connecting to mongoDB", err);
});

app.listen(port, () => {
    console.log("Server is running on port 8000");
});


const User = require('./models/user');
const Order = require('./models/order');

//function to send verification email to the user
const sendVerificationEmail = async (email, verficationToken) => {
      //create a nodemailer transporter

      const transporter = modemailer.createTransport({
        //configure the email service
        service: 'gmail',
        auth: {
             user:"ranjithkumarms28@gmail.com",
             pass:"ydyi gzdi qovv nogh"
       }
    });

    //compose the email message
    const mailOptions = {
        front: "amazon.com",
        to:email,
        subject:"Email Verification",
        text : `Please click the following link to verify your email: https://localhost:8000/verify/${verficationToken}`
};


//send the email
try{
   await transporter.sendMail(mailOptions);
  }  catch(error){
     console.log ("Error sending verification email",error);
   }

};



//endpoint to register in the app
app.post("/register",async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        
        //check if the user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
                return res.status(400).json({message:"User already exists"})

        }
        //create a new user
        const newUser = new User({name,email,password});
        //generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');

        //save the user to the database
        await newUser.save();

        //send verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);
    }catch(error){  
        console.log("error registering user", error);
        res.status(500).json({message:"Registration failer"})
    }

})



//endpoint to verify the email
app.get("/verfify/:token",async(req,res) => {
    try{
        const token = req.params.token;

        //find the user with the giving verfication token
        const user = await User.findOne({verficationToken: token });
        if (user){
            return res.start(404).json({message:"Invalid verification token"})
        }

        //Mark the user as verfied
        user.verfied = true;
        user.verficationToken = undefined;

        await user.save();

        res.sendStatus(200).json({message:"Email verified successfully"})
    } catch(error){
        res.status(500).json({ message: "Email verfication Failed" });
}
})
