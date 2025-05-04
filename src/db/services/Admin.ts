import { eq } from "drizzle-orm";
import Admin from "../../models/Admin";
import db from "../database";
import { admin } from "../schema";
import {checkPassword, createHash} from "../../middleware/hashing";
import bcrypt from "bcrypt";

export default class AdminServices {
    // check admin password
    static async loginAttempt(userCredentials: Admin): Promise<boolean | Admin> {
        const result = await db.query.admin.findFirst({
            where: eq(admin.email, userCredentials.email?? '')
        })
        console.log(result)
        if(result && await checkPassword(userCredentials.password ?? '', result.password)) {
            const {password,adminId, ...rest} = result
            return rest;
        }

        return false
    }

    static async changePassword(passwordInfo: Admin): Promise<boolean | Admin> {
        const result = await db.query.admin.findFirst({
            where: eq(admin.email, passwordInfo.email ?? '')
        });

        if (result !== null && result !== undefined) {
            const isMatch= await bcrypt.compare(passwordInfo.currentPassword!, result.password);
            const newHashPassword = await createHash(passwordInfo.newPassword ?? '');

            if(isMatch){
                const updatedAdmin = await db
                    .update(admin)
                    .set({ password: newHashPassword })
                    .where(eq(admin.email, passwordInfo.email ?? ''));

                if (updatedAdmin) {
                    return true
                }
            }
        }

        return false;
    }

    static async updateProfileInfo(accountInfo: Admin): Promise<boolean | Admin> {
        const result = await db.query.admin.findFirst({
            where: eq(admin.email, accountInfo.email?? '')
        })
        console.log(result)
        if(result !== null && result !== undefined) {
            const updatedAdmin = await db
                .update(admin)
                .set({ name: accountInfo.name })
                .where(eq(admin.email, accountInfo.email ?? ''));
            // console.log(admin.name)

            if(updatedAdmin){
                return true
            }
        }
        return false
    }

}