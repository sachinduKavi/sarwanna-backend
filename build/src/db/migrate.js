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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mysql2_1 = require("drizzle-orm/mysql2");
const migrator_1 = require("drizzle-orm/mysql2/migrator");
const promise_1 = __importDefault(require("mysql2/promise"));
function runMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.default.createConnection(process.env.DATABASE_URL);
        const db = (0, mysql2_1.drizzle)(connection);
        yield (0, migrator_1.migrate)(db, {
            migrationsFolder: './src/db/migrations', // 🔁 use the path where your .sql files are
        });
        yield connection.end(); // ✅ Close MySQL connection
        console.log('Migrations completed successfully!');
    });
}
runMigrations().catch((error) => {
    console.error('Error running migrations:', error);
    process.exit(1);
});
