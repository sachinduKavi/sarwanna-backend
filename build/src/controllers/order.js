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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.triggerOrderState = exports.fetchOrders = exports.testing = exports.placeOrder = void 0;
const Order_1 = require("../db/services/Order");
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        yield Order_1.OrderService.placeOrder(req.body.customer, req.body.order, req.body.productList);
        message = "order Successfully saved";
    }
    catch (error) {
        message = "order not places";
        proceed = false;
    }
    res.status(proceed ? 201 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.placeOrder = placeOrder;
const fetchOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        content = yield Order_1.OrderService.fetchOrders(req.body);
    }
    catch (e) {
        proceed = false;
        message = 'server error';
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.fetchOrders = fetchOrders;
const testing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('testing running...');
    let proceed = true, message = null, content = null;
    // OrderService.whatsAppMessage();
    res.status(proceed ? 201 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.testing = testing;
const triggerOrderState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        yield Order_1.OrderService.triggerOrderState(req.body.state, req.body.orderId);
    }
    catch (e) {
        console.error(e);
        proceed = false;
        message = 'server error';
    }
    res.status(proceed ? 201 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.triggerOrderState = triggerOrderState;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        yield Order_1.OrderService.deleteOrder(req.params.orderId);
    }
    catch (e) {
        console.error(e);
        proceed = false;
        message = 'deletion fail';
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.deleteOrder = deleteOrder;
