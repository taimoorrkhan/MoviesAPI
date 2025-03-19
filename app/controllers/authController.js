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
                msg: 'User already exists'
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
        res.status(200).json({
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
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const passwordFound = await bcrypt.compare(password, userExist.password);
        if (!passwordFound) {
            return res.status(400).json({ message: "Invalid password" });
        }
        token = jwt.sign({ email: userExist.email, id: userExist._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ message : "Logged In", token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server Error please try again later'
        });
    }
}



module.exports = {userReg, userLogin};