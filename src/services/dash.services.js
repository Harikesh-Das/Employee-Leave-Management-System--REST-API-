import { findUserById } from '../repositories/auth.repository.js';
import getDashboardStats from '../repositories/dash.repository.js';

// Getting leave stats service
const fetchDashboardStats= async (employeeId)=>{
    const checkEmpId= await findUserById(employeeId);
    if (!checkEmpId){
        const error= new Error (" No employee exists.");
        error.statusCode=404;
        throw error;
    }
   const result= await getDashboardStats(employeeId);

   return result;

}

export default fetchDashboardStats;