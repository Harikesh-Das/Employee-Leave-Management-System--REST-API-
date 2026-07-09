import {findUserByEmail, createUser, findUserById, updateEmployeeId} from "../repositories/auth.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signAccessToken, signRefreshToken, verifyToken } from "../utils/jwt.js";
import {saveRefreshToken,findRefreshToken,deleteRefreshToken} from "../repositories/refreshToken.repository.js";



// Registration Service
const registerUser= async ({name, email, password, department, role})=>{
    const checkExistingUser = await findUserByEmail(email);
  if (checkExistingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }
  const password_hash = await hashPassword(password);

  const userID= await createUser({
    name,
    email,
    password_hash,
    department,
    role,
  });


 const employeeID= "EMP" + String(userID).padStart(3,"0");

 await updateEmployeeId(
  userID,
  employeeID
 )

  const user= await findUserById(userID);
 


  return {user};
};


// Login Service
const loginUser= async ({email,password}) =>{
  const user= await findUserByEmail(email);
  if (!user) {
    const error = new Error("User doesn't exist");
    error.statusCode = 401;
    throw error;
  }

  const verifyPassword= await comparePassword(password, user.password_hash);

  if (!verifyPassword){
    const error= new Error ("Incorrect Password");
    error.statusCode=401;
    throw error;
  }

  const accessToken= signAccessToken({
    id:user.id,
    employee_id:user.employee_id,
    role:user.role,
  });
  const refreshToken= signRefreshToken({
    id:user.id,
    employee_id:user.employee_id,
    role:user.role
 });

 const expires_at = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
).toISOString();

await saveRefreshToken({
  user_id:user.id,
  token: refreshToken,
  expires_at
});

  return {user, accessToken, refreshToken};

}


// Refreshing user token service
const refreshUserToken= async (refreshToken)=>{
  const checkRefreshToken= await findRefreshToken(refreshToken);
  if (!checkRefreshToken){
    const error= new Error("Refresh Token not found, Unauthorized!");
    error.statusCode=401;
    throw error;
  }
  const verified_refreshToken=  await verifyToken(refreshToken);

  const user=await findUserById(verified_refreshToken.id);
  if (!user){
    const error= new Error ("User doesn't exist!");
    error.statusCode=401;
    throw error;
  }

  const accessToken= signAccessToken({
    id:user.id,
    employee_id:user.employee_id,
    role:user.role
  });

  return {accessToken};

}

//Logout Service
const logoutUser= async (refreshToken) => {
  const checkRefreshToken= await findRefreshToken(refreshToken);
  if (!checkRefreshToken){
    const error= new Error("Already logged out or invalid refresh Token");
    error.statusCode=401;
    throw error;
  }

  await verifyToken(refreshToken); // Verify token is valid or not expired.

  await deleteRefreshToken(refreshToken);

  return {
    message: "Logged out successfully."
  }
}

export  {registerUser,loginUser,refreshUserToken,logoutUser};