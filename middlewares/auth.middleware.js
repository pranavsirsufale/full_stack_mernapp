import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

const authMiddleware = async (req,res,next) => {
    
    let token = req.header("Authorization")
    if(!token){
        return res.status(401)
        .json({message : "Unauthorized HTTP, token not "})
    }
    
    // token = token.split(' ')[1]
    token = token.replace("Bearer","").trim()
    
    try {
    
        const isVerfied = jwt.verify(token, process.env.JWT_SECRET_KEY)
       
        const userData = await User.findById(isVerfied.userId).select('-password')
        
        req.user = userData;
        req.token = token;
        req.userId = userData._id
        
        next()
    } catch (error) {
        return res.status(401)
        .json({message : "Unauthorized HTTP, token not "}) 
    }

}

export { authMiddleware }