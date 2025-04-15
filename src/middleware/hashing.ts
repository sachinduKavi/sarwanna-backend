import bcrypt from 'bcrypt'
const SALT_ROUNDS = 12

export async function createHash(plainText: string): Promise<string> {
    return await bcrypt.hash(plainText, SALT_ROUNDS)
} 


export async function checkPassword(plainPass: string, hashPass: string): Promise<boolean> {
    return await bcrypt.compare(plainPass, hashPass)
}