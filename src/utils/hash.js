import bcrypt from 'bcrypt';

// Hashes a plaintext password using bcrypt.
export const hashPassword=  async (password)=>{
    const hashedPassword = await bcrypt.hash(password,13);
    return hashedPassword;
}

// Compares a plaintext password against a bcrypt hash.
export const comparePassword= async (password,hashedPassword) => {
    const comparedPassword= await bcrypt.compare(password,hashedPassword);
    return comparedPassword;

}
