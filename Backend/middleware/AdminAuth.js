import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) =>{
    const {token} = req.headers
   
    try {
        
        if(!token){
            return res.json({success:false, msg:"Not authorized login again."});
        }
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, msg:"Not authorized login again."});
        }
        next();

    } catch (error) {
        console.log(error);
        res.json({success:false, msg:error});
    }

}

export default adminAuth;