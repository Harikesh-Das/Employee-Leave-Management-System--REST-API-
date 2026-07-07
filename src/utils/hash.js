import bcrypt from 'bcrypt';

export const hashPassword=  async (password)=>{
    const hashedPassword = await bcrypt.hash(password,13);
    return hashedPassword;
}

export const comparePassword= async (password,hashedPassword) => {
    const comparedPassword= await bcrypt.compare(password,hashedPassword);
    return comparedPassword;

}
