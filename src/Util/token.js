import jwt from 'jsonwebtoken';
const generationToken = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET, { 
            expiresIn: process.env.JWT_EXPIRE }
    );
};
export default generationToken;