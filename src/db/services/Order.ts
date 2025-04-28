import db from "../database";
import dotenv from 'dotenv'
import {randomUUID} from "crypto";
import {customer, order, product, productImages, productList} from "../schema";
import {sendCustomerOrderConfirmation} from "../../middleware/sendMessage";
import twilio from "twilio/lib/rest/Twilio";
import { BinaryOperator, desc, eq, or, like } from "drizzle-orm";


dotenv.config()

const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

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

                console.log(accountSid, authToken);

                // await sendCustomerOrderConfirmation(customerData, productListData);
                let productListString: string = '';
                let total = 0;

                productListString += "*New Order Received (Sarvanna Floral).*\n";

                // Header row
                productListString += `Item Name | Price | Qty\n`;
                productListString += '-'.repeat(50) + '\n';

                productListData.forEach((element: any) => {
                    const name = element.name.toString().slice(0, 35); // Prevent overflow
                    const price = Number(element.unitPrice);
                    const qty = Number(element.qty);

                    productListString += `${name} | LKR ${price.toFixed(2)} | ${qty}\n`;
                    total += qty * price;
                });

                productListString += '-'.repeat(50) + '\n';
                productListString += `${'Total:'.padEnd(20)} LKR${total.toFixed(2)}\n\n`;

                productListString += "*Customer Details..*\n";
                productListString += `Customer Name : ${customerData.name}\n`;
                productListString += `Contact Number: ${customerData.mobileNumber}\n`;
                productListString += `Email: ${customerData.email}\n`;
                productListString += `Address: ${customerData.address}`;
                productListString += `Message:\n ${orderData.message}`;


                await OrderService.whatsAppMessage(productListString)
            });


            return result;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    }


    static async whatsAppMessage(messageString: string) {
        try {
            const message = await client.messages.create({
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+94763685923',
                body: messageString
            });
        } catch (err) {
            console.error('Failed to send WhatsApp message:', err);
        }
    }


    // Fetch orders
    static async fetchOrders({email = false, mobile = false}: {email?: string | boolean, mobile?: string | boolean} = {}) {
        const filters: Array<ReturnType<typeof eq>> = []
        if (typeof email === 'string') filters.push(like(customer.email, `%${email}%`));
        if (typeof mobile === 'string') filters.push(like(customer.mobileNumber, `%${mobile}%`));

        const result = await db.select({
            orderId: order.orderId,
            datetime: order.datetime,
            note: order.note,
            status: order.status,
            customer: customer,
            productList: {
                productId: product.productId,
                productName: product.name,
                unitPrice: product.unitPrice,
                unitMeasure: product.unitMeasure,
                qty: productList.qty
            }
        })
            .from(order).orderBy(desc(order.datetime)).leftJoin(customer, eq(customer.customerId, order.customerId))
            .innerJoin(productList, eq(order.orderId, productList.orderId)).innerJoin(product, eq(product.productId, productList.productId))
            .where(or(
                ...filters
            ))
        // console.log(result)


        const orderMap: Record<string, any> = {}
        for(const row of result) {
            if(!orderMap[row.orderId]) {
                orderMap[row.orderId] = {
                    ...row,
                    productList: []
                }
            }
            orderMap[row.orderId].productList.push(row.productList)
        }

        const finalList = []
        for(const value of Object.values(orderMap)) {
            finalList.push(value)
        }

        return finalList;
    }

    // Trigger order state
    static async triggerOrderState(state: boolean, orderId: string) {
        await db.update(order).set({status: state}).where(eq(order.orderId, orderId))
    }


    // Delete order 
    static async deleteOrder(orderId: string) {
        // Deleting items from the product list
        await db.delete(productList).where(eq(productList.orderId, orderId))
        await db.delete(order).where(eq(order.orderId, orderId))
    }

}

export {
    OrderService
}