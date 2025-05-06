const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');




//Lets Register a new User
 const userReg =  async (req, res) => {
    try {
        const { name, email, password,
            role
         } = req.body;
        const alreadyUser = await User.findOne({
            email
        });
        if (alreadyUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({
           message : 'User Registered Successfully!'
        });

        // we can add login after registration
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server Error please try again later'
        });

    }
}

const userLogin = async (req, res) => {
    try {
        console.log("Login route hit");
    
        const { email, password } = req.body;
        console.log("Email received:", email);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
    
        if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
        }
    
        const userExist = await User.findOne({ email });
        if (!userExist) {
          console.log("User not found");
          return res.status(400).json({ message: "User does not exist" });
        }
    
        const passwordFound = await bcrypt.compare(password, userExist.password);
        if (!passwordFound) {
          console.log("Invalid password attempt");
          return res.status(400).json({ message: "Invalid password" });
        }
    
        const token = jwt.sign(
          {
            email: userExist.email,
            role: userExist.role,
            id: userExist._id
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
    
        console.log("User logged in:", userExist.email);
        res.status(200).json({ message: "Logged In", token });
    
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server Error, please try again later" });
      }
}
module.exports = {userReg, userLogin};