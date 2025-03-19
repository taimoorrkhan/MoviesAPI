const bcrypt = require('bcrypt');
const User = require('../models/Users');




//Lets Register a new User
 const userReg =  async (req, res) => {
    try {
        const { name, email, password } = req.body;
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
            password: hashedPassword
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
}



module.exports = userReg;