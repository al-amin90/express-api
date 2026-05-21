import { sql } from "../../db";
import type { RUser, User } from "../../types";
import bcrypt from "bcrypt";
import AppError from "../../utility/AppError";

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
    const userData = await sql`
      SELECT * FROM users WHERE email=${email}
    `;

    if (userData.length === 0) {
      throw new AppError(401, "Credential Wrong!");
    }

    const { password: passwordHash, ...user } = userData[0] as User;
    const isValid = await bcrypt.compare(password, passwordHash);

    console.log("isValid", isValid);

    return isValid ? user : null;
  }

  async getUser(id: number) {
    const userData = await sql`
      SELECT * FROM users WHERE id=${id}
    `;

    return userData;
  }
}

export default new AuthService();
