export default interface Admin {
    adminId?: string,
    name?: string,
    username?:string,
    email?: string,
    password?: string,
    currentPassword?: string,
    newPassword?: string
}