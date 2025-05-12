"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middleware/authorization");
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
router.post('/loginAttempt', authorization_1.authorization, admin_1.loginAttempt);
router.put('/changePassword', authorization_1.authorization, admin_1.changePassword);
router.put('/updateProfileInfo', authorization_1.authorization, admin_1.updateProfileInfo);
exports.default = router;
