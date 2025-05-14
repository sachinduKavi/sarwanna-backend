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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileInfo = exports.changePassword = exports.loginAttempt = void 0;
const Admin_1 = __importDefault(require("../db/services/Admin"));
const loginAttempt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = false, message = null, content = null;
    try {
        console.log("login request", req.body);
        content = yield Admin_1.default.loginAttempt(req.body);
        if (content) {
            proceed = true;
            message = 'login success';
        }
        else
            message = 'invalid username or password';
    }
    catch (e) {
        proceed = false;
        message = 'server error';
    }
    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.loginAttempt = loginAttempt;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = false, message = null, content = null, status = false;
    try {
        content = yield Admin_1.default.changePassword(req.body);
        if (content) {
            message = 'password changed successfully';
            status = true;
        }
        else
            message = 'password change failed';
    }
    catch (e) {
        proceed = false;
        message = 'server error';
    }
    console.log(status, proceed, message, content);
    res.status(200).json({
        status: status,
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.changePassword = changePassword;
const updateProfileInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = false, message = null, content = null, status = false;
    try {
        content = yield Admin_1.default.updateProfileInfo(req.body);
        if (content) {
            status = true;
            proceed = true;
            message = 'Profile updated successfully';
        }
        else
            message = 'profile update failed';
    }
    catch (e) {
        proceed = false;
        status = false;
        message = 'server error';
    }
    console.log("response:", status, proceed, message, content);
    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.updateProfileInfo = updateProfileInfo;
