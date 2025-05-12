"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middleware/authorization");
const order_1 = require("../controllers/order");
const router = express_1.default.Router();
router.post('/placeOrder', authorization_1.authorization, order_1.placeOrder);
router.get('/testing', order_1.testing);
router.put('/getOrders', authorization_1.authorization, order_1.fetchOrders);
router.put('/triggerOrderState', authorization_1.authorization, order_1.triggerOrderState);
router.delete('/deleteOrder/:orderId', authorization_1.authorization, order_1.deleteOrder);
exports.default = router;
