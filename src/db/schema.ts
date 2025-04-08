import { relations } from "drizzle-orm";
import { mysqlTable, varchar, boolean, decimal, datetime, char, int } from "drizzle-orm/mysql-core";
import { randomUUID } from "crypto";


// Admin table
export const admin = mysqlTable("admin", {
    adminId: varchar("admin_id", {length: 36}).primaryKey().default(randomUUID()),
    name: varchar("name", {length: 20}).notNull(),
    email: varchar("email", {length: 30}).notNull(),
    password: varchar("password", {length: 30}).notNull()
});


// Product table
export const product = mysqlTable("product", {
    productId: varchar("product_id", { length: 36 }).primaryKey().default(randomUUID()),
    name: varchar("name", {length: 128}).notNull(),
    stock: boolean("stock").default(true).notNull(),
    description: varchar("description", {length: 1024}),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
    unitMeasure: varchar("unit_measure", { length: 16 }).notNull(),
    createdAt: varchar("created_at", { length: 36 }).default(randomUUID()).notNull(),
    updatedAt: varchar("updated_at", { length: 36 }).default(randomUUID()).notNull(),
});


// Product Images table
export const productImages = mysqlTable("product_images", {
    imageId: varchar("image_id", {length:36}).primaryKey().default(randomUUID()),
    productId: varchar("product_id", {length: 36}).notNull().references(() => product.productId),
    url: varchar("url", {length: 500}).notNull(),
    sortNo: int("sort_no").notNull().default(0)
})


// Product List 
export const productList = mysqlTable("product_list", {
    orderId: varchar("order_id", {length: 36}).notNull().references(() => order.orderId),
    productId: varchar("product_id", {length: 36}).notNull().references(() => product.productId)
})


// Customer table
export const customer = mysqlTable("customer", {
    customerId: varchar("customer_id", {length: 36}).primaryKey().default(randomUUID()),
    name: varchar("name", {length: 50}),
    mobileNumber: char("mobile_number", {length: 15}),
    email: varchar("email", {length: 30}),
    address: varchar("address", {length: 100})
})


// Order table
export const order = mysqlTable("order", {
    orderId: varchar("order_id", {length: 36}).primaryKey().default(randomUUID()),
    datetime: datetime("datetime", {mode: "date"}).notNull(),
    note: varchar("note", {length: 1024}),
    status: boolean("status").default(true).notNull(),
    customerId: varchar("customer_id", {length: 36}).notNull().references(() => customer.customerId),
})