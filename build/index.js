"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("./src/routes/product"));
const admin_1 = __importDefault(require("./src/routes/admin"));
const order_1 = __importDefault(require("./src/routes/order"));
const Inquiry_1 = __importDefault(require("./src/routes/Inquiry"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3500;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://saravanaflora.lk', 'https://saravanaflora.lk', 'www.saravanaflora.lk', 'https://www.saravanaflora.lk', 'http://www.saravanaflora.lk'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/product', product_1.default);
app.use('/admin', admin_1.default);
app.use('/order', order_1.default);
app.use('/inquiry', Inquiry_1.default);
app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
});
