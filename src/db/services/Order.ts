import db from "../database";
import dotenv from 'dotenv'
import {randomUUID} from "crypto";
import {customer, order, product, productImages, productList} from "../schema";
import {sendCustomerOrderConfirmation} from "../../middleware/sendMessage";
import twilio from "twilio/lib/rest/Twilio";
import { BinaryOperator, desc, eq, or, like } from "drizzle-orm";
import { currencyFormat } from "../../middleware/formats";


dotenv.config()

const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

class OrderService {
    static async placeOrder(customerData: any, orderData: any, productListData: any) {
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
                        currentPrice:product.unitPrice
                    });
                }

                // await sendCustomerOrderConfirmation(customerData, productListData);
                let total: number = 0;
                let count: number = 0;
                const productArray: Array<string> = []

                productListData.forEach((element: any) => {
                    const name = element.name.toString().slice(0, 35); // Prevent overflow
                    const price = Number(element.unitPrice);
                    const qty = Number(element.qty);

                    if(count < 10) {
                        productArray.push(`${name} | LKR ${price.toFixed(2)} | ${qty}`)
                    }
                    count++;
                    total += qty * price;
                });

                while(count < 10) {
                    productArray.push("--")
                    count++;
                }

                await this.whatsAppMessageOrder(productArray, customerData, total, '764314505')
                // await OrderService.whatsAppMessage(productListString)
            });


            return result;
    }


    static async whatsAppMessageOrder(productArray: Array<string>, customerData: any, total: number, receiver: string) {
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
                    16: currencyFormat(total)
                })

        console.log(contentVariable)
        try {
            const message = await client.messages.create({
                contentSid: 'HX7067ffcf558f3754597ed8de2d66463e',
                contentVariables: contentVariable,
                from: 'whatsapp:+19786256028',
                to: `whatsapp:+94${receiver}`,
            });
            // console.log('WhatsApp message sent:', message);
        } catch (err) {
            console.error('Failed to send WhatsApp message:', err);
        }
    }


    static async whatsAppMessage(messageString: string) {
        try {


            const message = await client.messages.create({
                contentSid: 'HX673b8b5f098f715b921a588038e133e5',
                body: 'hello Sri lanaka',
                contentVariables: `{"1": "Hello India"}`,
                // messagingServiceSid: 'MG4e29d6f8c7d7b7997156a09365db20f0',
                from: 'whatsapp:+19786256028',
                to: 'whatsapp:+94764314505',
            });
            console.log('WhatsApp message sent:', message);
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
                unitPrice: productList.currentPrice,
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