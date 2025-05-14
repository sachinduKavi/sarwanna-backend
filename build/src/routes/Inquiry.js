"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middleware/authorization");
const Inquiry_1 = require("../controllers/Inquiry");
const router = express_1.default.Router();
router.post('/sendInfo', authorization_1.authorization, Inquiry_1.inquiryRequest);
exports.default = router;
