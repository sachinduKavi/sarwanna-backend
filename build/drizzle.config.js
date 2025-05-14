"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    // driver: 'mysql2', // Removed as it is not a valid property
    dialect: 'mysql', // ✅ Add this line
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};
