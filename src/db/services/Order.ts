import db from "../database";
import {randomUUID} from "crypto";
import {customer, order, productImages, productList} from "../schema";

class OrderService {
    static async placeOrder(customerData: any, orderData: any,productListData: any) {
        const result = await db.transaction(async (trx) => {
            const orderId = randomUUID()
            const customerId = randomUUID()
            await trx.insert(customer).values({customerId: customerId, ...customerData})
            await trx.insert(order).values({orderId: orderId, customerId: customerId, ...orderData})


            for(const product of productListData) {
                await trx.insert(productList).values({orderId:orderId,productId: product.productId, qty:product.qty})
            }
        })
    }
}

export {
    OrderService
}