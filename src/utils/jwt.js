import env from "../config/env.js"
import jwt from 'jsonwebtoken';

// Token Creation
const signAccessToken = ({ id, employee_id, role }) => {
  const jwtKey = env.jwt_secret
  const payload = { id, employee_id, role };
  const token = jwt.sign(payload, jwtKey, { expiresIn: "1h" });
  return token;
};

//Refresh Token
const signRefreshToken=({ id, employee_id, role })=>{
  const jwtKey=env.jwt_secret;
  const payload={ id, employee_id, role };
  const token=jwt.sign(payload,jwtKey,{expiresIn:"7d"});
  return token;
}


//Token Verification
const verifyToken = (token) => {
  try {
    return jwt.verify(token,env.jwt_secret);
  } catch (error) {
    error.statusCode=401;
    throw error;
  }
  
}

export { signAccessToken, signRefreshToken, verifyToken };
