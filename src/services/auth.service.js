import {findUserByEmail, createUser, findUserById, updateEmployeeId} from "../repositories/auth.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken,verifyToken } from "../utils/jwt.js";


// Registraion Service
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
    role

  });


 const employeeID= "EMP" + String(userID).padStart(3,"0");

  const updatedUser= await updateEmployeeId(
    userID, 
    employeeID
  );

  const user= await findUserById(userID);
 
  const token=signToken({
    id: user.id,
    employee_id: user.employee_id,
    role: user.role
  });

  return {user,token};
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

  const token= signToken({
    id:user.id,
    employee_id:user.employee_id,
    role:user.role,
  });

  return {user,token};

}

export  {registerUser,loginUser};