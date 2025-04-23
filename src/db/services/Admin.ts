import { eq } from "drizzle-orm";
import Admin from "../../models/Admin";
import db from "../database";
import { admin } from "../schema";
import {checkPassword, createHash} from "../../middleware/hashing";

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

    static async changePassword(passwordInfo: Admin): Promise<{ success: String}> {
        const result = await db.query.admin.findFirst({
            where: eq(admin.email, passwordInfo.email ?? '')
        });

        if (result) {
            const newHashPassword = createHash(passwordInfo.newPassword ?? '');
            const currentHashPassword = createHash(passwordInfo.currentPassword??'');

            if(result.password == currentHashPassword){
                const updatedAdmin = await db
                    .update(admin)
                    .set({ password: newHashPassword })
                    .where(eq(admin.email, passwordInfo.email ?? ''));

                if (updatedAdmin) {
                    // const { password, ...rest } = updatedAdmin;
                    return { success: "password updated successfully"};
                }
            }
        }

        return { success: "An error occurred" };
    }

    static async updateProfileInfo(accountInfo: Admin): Promise<boolean | Admin> {
        const result = await db.query.admin.findFirst({
            where: eq(admin.email, accountInfo.email?? '')
        })

        if(result) {
            const updatedAdmin = await db
                .update(admin)
                .set({ username: accountInfo.username })
                .where(eq(admin.email, accountInfo.email ?? ''));

            return true
        }

        return false
    }

}