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
        
        if(result && await checkPassword(userCredentials.password ?? '', result.password)) {
            const {password, ...rest} = result
            return rest;
        }

        return false
    }

    static async changePassword(passwordInfo: Admin): Promise<boolean | Admin> {
        const result = await db.query.admin.findFirst({
            where: eq(admin.email, passwordInfo.email ?? '')
        });

        console.log( "result", result )
        if (result !== null && result !== undefined) {
            const isMatch= await bcrypt.compare(passwordInfo.currentPassword!, result.password);
            const newHashPassword = await createHash(passwordInfo.newPassword ?? '');

            if(isMatch){
                const updatedAdmin = await db
                    .update(admin)
                    .set({ password: newHashPassword })
                    .where(eq(admin.email, passwordInfo.email ?? ''));

                if (updatedAdmin) {
                    // const { password, ...rest } = updatedAdmin;
                    return true
                }
            }
        }

        return false;
    }

    static async updateProfileInfo(accountInfo: Admin): Promise<boolean | Admin> {
        // const result = await db.query.admin.findFirst({
        //     where: eq(admin.email, accountInfo.email?? '')
        // })
        //
        // if(result) {
        //     const updatedAdmin = await db
        //         .update(admin)
        //         .set({ username: accountInfo.username })
        //         .where(eq(admin.email, accountInfo.email ?? ''));
        //
        //     return true
        // }

        return false
    }

}