import { eq } from "drizzle-orm";
import Admin from "../../models/Admin";
import db from "../database";
import { admin } from "../schema";
import { checkPassword } from "../../middleware/hashing";

export default class AdminServices {
    // check admin password
    static async loginAttempt(userCredentials: Admin): Promise<boolean | Admin> {
        const result = await db.query.admin.findFirst({
            where: eq(admin.email, userCredentials.email?? '')
        })
        
        if(result && await checkPassword(userCredentials.password ?? '', result.password)) {
            const {password, ...rest} = result
            return rest;
        }

        return false
    }
}