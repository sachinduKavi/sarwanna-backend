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
exports.OrderService = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
const schema_1 = require("../schema");
const sendMessage_1 = require("../../middleware/sendMessage");
const Twilio_1 = __importDefault(require("twilio/lib/rest/Twilio"));
const drizzle_orm_1 = require("drizzle-orm");
const formats_1 = require("../../middleware/formats");
dotenv_1.default.config();
const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;
const client = new Twilio_1.default(accountSid, authToken);
class OrderService {
    static placeOrder(customerData, orderData, productListData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const orderId = (0, crypto_1.randomUUID)();
                const customerId = (0, crypto_1.randomUUID)();
                orderData.datetime = new Date(orderData.datetime);
                yield trx.insert(schema_1.customer).values(Object.assign({ customerId: customerId }, customerData));
                yield trx.insert(schema_1.order).values(Object.assign({ orderId: orderId, customerId: customerId }, orderData));
                for (const product of productListData) {
                    yield trx.insert(schema_1.productList).values({
                        orderId: orderId,
                        productId: product.productId,
                        qty: product.qty,
                        currentPrice: product.unitPrice
                    });
                }
                yield (0, sendMessage_1.sendCustomerOrderConfirmation)(customerData, productListData);
                let total = 0;
                let count = 0;
                const productArray = [];
                productListData.forEach((element) => {
                    const name = element.name.toString().slice(0, 35); // Prevent overflow
                    const price = Number(element.unitPrice);
                    const qty = Number(element.qty);
                    if (count < 10) {
                        productArray.push(`${name} | LKR ${price.toFixed(2)} | ${qty}`);
                    }
                    count++;
                    total += qty * price;
                });
                while (count < 10) {
                    productArray.push("--");
                    count++;
                }
                // await OrderService.whatsAppMessage(productListString)
                yield this.whatsAppMessageOrder(productArray, customerData, total, '759754189');
                yield this.whatsAppMessageOrder(productArray, customerData, total, '755248731');
                yield (0, sendMessage_1.sendCustomerOrderConfirmation)(customerData, productListData);
            }));
            return result;
        });
    }
    static whatsAppMessageOrder(productArray, customerData, total, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentVariable = JSON.stringify({
                1: productArray[0],
                2: productArray[1],
                3: productArray[2],
                4: productArray[3],
                5: productArray[4],
                6: productArray[5],
                7: productArray[6],
                8: productArray[7],
                9: productArray[8],
                10: productArray[9],
                11: customerData.name,
                12: customerData.mobileNumber,
                13: customerData.email,
                14: customerData.address,
                15: customerData.note,
                16: (0, formats_1.currencyFormat)(total)
            });
            console.log(contentVariable);
            try {
                const message = yield client.messages.create({
                    contentSid: 'HX7067ffcf558f3754597ed8de2d66463e',
                    contentVariables: contentVariable,
                    from: 'whatsapp:+19786256028',
                    to: `whatsapp:+94${receiver}`,
                });
                // console.log('WhatsApp message sent:', message);
            }
            catch (err) {
                console.error('Failed to send WhatsApp message:', err);
            }
        });
    }
    static whatsAppMessage(messageString) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield client.messages.create({
                    contentSid: 'HX673b8b5f098f715b921a588038e133e5',
                    body: 'hello Sri lanaka',
                    contentVariables: `{"1": "Hello India"}`,
                    // messagingServiceSid: 'MG4e29d6f8c7d7b7997156a09365db20f0',
                    from: 'whatsapp:+19786256028',
                    to: 'whatsapp:+94764314505',
                });
                console.log('WhatsApp message sent:', message);
            }
            catch (err) {
                console.error('Failed to send WhatsApp message:', err);
            }
        });
    }
    // Fetch orders
    static fetchOrders() {
        return __awaiter(this, arguments, void 0, function* ({ email = false, mobile = false } = {}) {
            const filters = [];
            if (typeof email === 'string')
                filters.push((0, drizzle_orm_1.like)(schema_1.customer.email, `%${email}%`));
            if (typeof mobile === 'string')
                filters.push((0, drizzle_orm_1.like)(schema_1.customer.mobileNumber, `%${mobile}%`));
            const result = yield database_1.default.select({
                orderId: schema_1.order.orderId,
                datetime: schema_1.order.datetime,
                note: schema_1.order.note,
                status: schema_1.order.status,
                customer: schema_1.customer,
                productList: {
                    productId: schema_1.product.productId,
                    productName: schema_1.product.name,
                    unitPrice: schema_1.productList.currentPrice,
                    unitMeasure: schema_1.product.unitMeasure,
                    qty: schema_1.productList.qty
                }
            })
                .from(schema_1.order).orderBy((0, drizzle_orm_1.desc)(schema_1.order.datetime)).leftJoin(schema_1.customer, (0, drizzle_orm_1.eq)(schema_1.customer.customerId, schema_1.order.customerId))
                .innerJoin(schema_1.productList, (0, drizzle_orm_1.eq)(schema_1.order.orderId, schema_1.productList.orderId)).innerJoin(schema_1.product, (0, drizzle_orm_1.eq)(schema_1.product.productId, schema_1.productList.productId))
                .where((0, drizzle_orm_1.or)(...filters));
            // console.log(result)
            const orderMap = {};
            for (const row of result) {
                if (!orderMap[row.orderId]) {
                    orderMap[row.orderId] = Object.assign(Object.assign({}, row), { productList: [] });
                }
                orderMap[row.orderId].productList.push(row.productList);
            }
            const finalList = [];
            for (const value of Object.values(orderMap)) {
                finalList.push(value);
            }
            return finalList;
        });
    }
    // Trigger order state
    static triggerOrderState(state, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.update(schema_1.order).set({ status: state }).where((0, drizzle_orm_1.eq)(schema_1.order.orderId, orderId));
        });
    }
    // Delete order 
    static deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Deleting items from the product list
            yield database_1.default.delete(schema_1.productList).where((0, drizzle_orm_1.eq)(schema_1.productList.orderId, orderId));
            yield database_1.default.delete(schema_1.order).where((0, drizzle_orm_1.eq)(schema_1.order.orderId, orderId));
        });
    }
}
exports.OrderService = OrderService;
