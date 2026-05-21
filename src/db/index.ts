import { neon } from "@neondatabase/serverless";
import { config } from "../config";

const sql = neon(config.database_url);

sql`
    SELECT * FROM users
`;

export const initDB = async () => {
  await sql`
        CREATE TABLE IF NOT EXIST users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(75) NOT NULL,
            password TEXT NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            age INIT NOT NULL
            role VARCHAR(20)

            createdAt TIMESTAMP DEFAULT NOW(),
            updatedAt TIMESTAMP DEFAULT NOW()
        )
    `;

  await sql`
        CREATE TABLE IF NOT EXIST orders (
            id SERIAL PRIMARY KEY,
            customerID INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            
            quantity INT NOT NULL CHECK(quantity > 0),
            food TEXT NOT NULL,
            age INIT NOT NULL
            price NUMERIC(10, 2) NOT NULL,

            createdAt TIMESTAMP DEFAULT NOW(),
            updatedAt TIMESTAMP DEFAULT NOW()
        )
    `;

  console.log("Database is Connected!");
};
