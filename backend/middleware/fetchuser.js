const jwt= require('jsonwebtoken')
const JWT_SECRET = "Naviisaniceb0y";

const fetchUser=async (req,res,next)=>{
    try {
        const token = req.header("auth-token");
        if (!token) {
          res
            .status(401)
            .send({ error: "Please use the valiud token for authentication" });
        }
        const data =await jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Internal Server Error")
    }
}

module.exports= fetchUser