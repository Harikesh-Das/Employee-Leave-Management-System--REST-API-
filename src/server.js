import app from "./app.js";
import env from "./config/env.js";
import { initializeDatabase } from "./config/dbInit.js";

const PORT = env.port;

initializeDatabase()
    // Start the server after the database is initialized
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    });