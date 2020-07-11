const {ADMINS} = require('../config');

function checkAdminEmail(req,res,next){
    let admins = ADMINS.split(',');
    let {email} = req.body;
    //console.log(admins);
    if(admins.includes(email)){
        next();
    }
    else{
        return res.json({
            code:400,
            message:'Unathorized'
        });
    }
}

module.exports = {checkAdminEmail};