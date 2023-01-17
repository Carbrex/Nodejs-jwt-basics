// check username, password in post(login) request
// if exists create new JWT
// send back to frontend

// setup authentication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
    const { username, password } = req.body;
    // we can use these ways to check for valid values
    // mongoose validation
    // joi
    // check in the controller
    if (!(username || password)) {
        throw new BadRequestError('Please provide email and password');
    }
    // just for demo normally provided by db
    const id = new Date().getDate();

    // try to keep payload small, better experience for users
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn:'30d'});

    // console.log(username, password);
    res.status(200).json({msg:'user created',token});
}

const dashboard = async (req, res) => {
    // console.log(req.headers);
    // console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` });
}

module.exports = {
    login, dashboard
}