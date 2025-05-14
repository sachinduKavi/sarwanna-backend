"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = __importDefault(require("../database"));
const schema_1 = require("../schema");
const hashing_1 = require("../../middleware/hashing");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminServices {
    // check admin password
    static loginAttempt(userCredentials) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const result = yield database_1.default.query.admin.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.admin.email, (_a = userCredentials.email) !== null && _a !== void 0 ? _a : '')
            });
            if (result && (yield (0, hashing_1.checkPassword)((_b = userCredentials.password) !== null && _b !== void 0 ? _b : '', result.password))) {
                const { password, adminId } = result, rest = __rest(result, ["password", "adminId"]);
                return rest;
            }
            return false;
        });
    }
    static changePassword(passwordInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const result = yield database_1.default.query.admin.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.admin.email, (_a = passwordInfo.email) !== null && _a !== void 0 ? _a : '')
            });
            if (result !== null && result !== undefined) {
                const isMatch = yield bcrypt_1.default.compare(passwordInfo.currentPassword, result.password);
                const newHashPassword = yield (0, hashing_1.createHash)((_b = passwordInfo.newPassword) !== null && _b !== void 0 ? _b : '');
                if (isMatch) {
                    const updatedAdmin = yield database_1.default
                        .update(schema_1.admin)
                        .set({ password: newHashPassword })
                        .where((0, drizzle_orm_1.eq)(schema_1.admin.email, (_c = passwordInfo.email) !== null && _c !== void 0 ? _c : ''));
                    if (updatedAdmin) {
                        return true;
                    }
                }
            }
            return false;
        });
    }
    static updateProfileInfo(accountInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const result = yield database_1.default.query.admin.findFirst({
                where: (0, drizzle_orm_1.eq)(schema_1.admin.email, (_a = accountInfo.email) !== null && _a !== void 0 ? _a : '')
            });
            console.log(result);
            if (result !== null && result !== undefined) {
                const updatedAdmin = yield database_1.default
                    .update(schema_1.admin)
                    .set({ name: accountInfo.name })
                    .where((0, drizzle_orm_1.eq)(schema_1.admin.email, (_b = accountInfo.email) !== null && _b !== void 0 ? _b : ''));
                // console.log(admin.name)
                if (updatedAdmin) {
                    return true;
                }
            }
            return false;
        });
    }
}
exports.default = AdminServices;
