const emailValidator = require("email-validator");

function checkEmail(req,res,next){
    const {email} = req.body;
    if(!emailValidator.validate(email)){
        return res.status(422).json({
			code:422,
			message:"Incorrect Email"
		});
    }

    else if(typeof email !== 'string'){
        return res.status(422).json({
			code:422,
			message:"Incorrect Email"
		});
    }

    else{
        next();
    }
}

module.exports = {checkEmail};