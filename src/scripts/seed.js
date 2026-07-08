import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { initializeDatabase } from '../config/dbInit.js';

const seedUser = async () => {
    try {
        // Ensure tables exist before inserting
        await initializeDatabase();
        
        const password = 'password123';
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        const user = {
            manager_id: 'EMP007',
            name: 'raj',
            email: 'raj@example.com',
            password_hash: passwordHash,
            department: 'Engineering',
            role: 'admin'
        };

        const sql = `
            INSERT INTO users (employee_id, name, email, password_hash, department, role)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(sql, [user.manager_id, user.name, user.email, user.password_hash, user.department, user.role], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    console.log('User with this email or employee_id already exists.');
                    process.exit(0);
                }
                console.error('Error inserting user:', err.message);
                process.exit(1);
            }
            console.log(`User inserted successfully with ID: ${this.lastID}`);
            console.log('--- User Details ---');
            console.log('Manager ID:', user.manager_id);
            console.log('Email:', user.email);
            console.log('Password:', password);
            console.log('--------------------');
            process.exit(0);
        });
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

seedUser();
