var admin = (req,res,next) => {
    if(req.user.role === 0){
        return res.send('You do not have the correct permissions')
    }

    next();

    }

    module.exports = {admin}