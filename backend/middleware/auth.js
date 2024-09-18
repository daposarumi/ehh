import jwt from 'jsonwebtoken';



const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        

        return res.json({success:false,message:"Not Authorized, Login again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(token_decode)
        req.body.userId = token_decode.id;
        next();
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
// const authMiddleware = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ success: false, message: "Not authorized, Login again." });
//     }
   
//     const token = authHeader.split(' ')[1]; // Extract token from Bearer scheme

//     console.log('Authorization Header:', authHeader);
// console.log('Extracted Token:', token);

//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decodedToken.id; // Set userId in the request object
//         next();
//     } catch (error) {
//         console.log("Token verification error:", error);
//         res.status(401).json({ success: false, message: "Invalid or expired token." });
//     }
// };


export default authMiddleware;
