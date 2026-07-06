import 'dotenv/config';

function required(name){
    const value= process.env[name];
    if (!value) throw new Error(`Missing env variable: ${name}`);
    return value;
    
}

const env={
    port: Number(required('PORT')) || 3000,
    db: {
        file: required('DB_FILE')
    },
    jwt_secret: required('JWT_SECRET')

};
;
export default env;