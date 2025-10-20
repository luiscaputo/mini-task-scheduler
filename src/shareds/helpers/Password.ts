import * as bcrypt from "bcrypt";

export class Password {
  public static async comparePasswords(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  public static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
