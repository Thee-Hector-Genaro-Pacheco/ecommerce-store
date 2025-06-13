import bcrypt from 'bcrypt';

export async function hashPassword(password: string) : Promise<string> {
    const saltRounds = 10; // Number of rounds for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}