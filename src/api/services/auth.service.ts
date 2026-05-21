import { sql } from "../../db";
import type { RUser } from "../../types";
import bcrypt from "bcrypt";

class AuthService {
  async createUser(user: RUser & { password: string }) {
    const { name, age, email, password, role } = user;

    const hasPassword = await bcrypt.hash(password, 10);

    const res = await sql`
        INSERT INTO users(name, age, email, password, role)
        VALUES(${name},${age},${email},${hasPassword},${role})
        RETURNING  name, age, email, role
    `;

    return res[0];
  }

  async validateUser(email: string, password: string) {
    const userData = sql`
      SELECT * FROM users WHERE email=${email}
    `;

    console.log("userData", userData);
  }
}

export default new AuthService();
