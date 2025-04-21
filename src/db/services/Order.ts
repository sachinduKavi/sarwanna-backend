import db from "../database";
import {randomUUID} from "crypto";
import {customer, order, productImages, productList} from "../schema";
import {sendCustomerOrderConfirmation} from "../../middleware/sendMessage";

class OrderService {
    static async placeOrder(customerData: any, orderData: any, productListData: any) {
        try {
            const result = await db.transaction(async (trx) => {
                const orderId = randomUUID();
                const customerId = randomUUID();
                orderData.datetime = new Date(orderData.datetime);
                await trx.insert(customer).values({ customerId: customerId, ...customerData });
                await trx.insert(order).values({ orderId: orderId, customerId: customerId, ...orderData });
                for (const product of productListData) {
                    await trx.insert(productList).values({
                        orderId: orderId,
                        productId: product.productId,
                        qty: product.qty,
                    });
                }
            });

            await sendCustomerOrderConfirmation(customerData, productListData);
            return result;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    }

}

export {
    OrderService
}