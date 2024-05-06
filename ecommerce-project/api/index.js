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

// mongodb://localhost:27017/
mongoose.connect("mongodb+srv://ranjithkumarms28:ranjith@cluster0.vr1k786.mongodb.net/" ,{
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
        text : `Please click the following link to verify your email: http://192.168.182.194:8000/verify/${verficationToken}`
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
        console.log("daaaaaaaaaaaaaaaaaaaa",req.body)
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
        res.status(201).json({message:"User registered successfully. Please verify your email to login"})

    }catch(error){  
        console.log("error registering user", error);
        res.status(500).json({message:"Registration failer"})
    }

})



//endpoint to verify the email
app.get("/verify/:token",async(req,res) => {
    try{
        const token = req.params.token;

        //find the user with the giving verfication token
        const user = await User.findOne({verificationToken: token }); 
        if (!user){
            return res.status(404).json({message:"Invalid verification token"})
        }

        //Mark the user as verfied
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({message:"Email verified successfully"})
    } catch(error){
        res.status(500).json({ message: "Email verification Failed" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
}


const secretKey = generateSecretKey();

//endpoint to login the user!
app.post("/login",async(req,res) => {
    try{
        const {email,password} = req.body;
        console.log("aaaaaaaaaaaaaa11999999999999",req.body)
        //check if the user exists
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }

        //check if the password is correct
        if (user.password !== password){
              return res.status(401).json({message:"Invalid password"});
        }
        console.log('mmmmmmmmmmmmmmmmmmmmmm')
       //generate a token
       const token = jwt.sign({userId:user._id},secretKey);
        console.log(token)
       res.status(200).json({token});
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Login Failed"});
    }

})

//endpoint to store a new address to the backend
app.post ("/addresses",async(req,res) =>{
    try{
        const {userId,address} = req.body

        //find the user by the Userid
        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({message:"User not found"});
        }

        //add the new address to the user's addresses array
        user.address.push(address )

        //save the updated user in the backend
        await user.save();

        res.status(200).json({message:"Address created SuccessFully"})


    } catch(error){
        console.log(error)
        res.status (500).json({message:"Error adding address"})
    }
})

//endpoint to get all the addresses of a particular user
app.get ("/addresses/:userId",async(req,res)=> {
    try{
        console.log("zzzzzzzzzzzzz")
        const userId = req.params.userId

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const addresses = user.address;
        res.status(200).json({addresses})

    } catch (error){
        res.status(500).json({message:"Error retrieveing the addresses"})
    }
})


//endpoint to store all the 0rders
app.post("/orders", async (req, res) => {
    try {
      const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
        req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const products = cartItems.map((item) => ({
        name: item?.title,
        quantity: item.quantity,
        price: item.price,
        image: item?.image,
      }));
      const order = new Order({
        user: userId,
        products: products,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
      });

      await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

// get the user profile
app.get("/profile/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving the user profile" });
    }
  });

  app.get("/orders/:userId",async(req,res) => {
    try{
      const userId = req.params.userId;
  
      const orders = await Order.find({user:userId}).populate("user");
  
      if(!orders || orders.length === 0){
        return res.status(404).json({message:"No orders found for this user"})
      }
  
      res.status(200).json({ orders });
    } catch(error){
      res.status(500).json({ message: "Error"});
    }
  })