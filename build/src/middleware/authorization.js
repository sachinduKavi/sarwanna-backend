"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = authorization;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authorization(req, res, next) {
    // console.log('authorization', req.headers.authorization === process.env.BEARER_TOKEN)
    if (process.env.BEARER_TOKEN === req.headers.authorization)
        next();
    else {
        res.status(401).json({
            proceed: false,
            message: 'unauthorized access detected',
            content: null
        });
    }
}
