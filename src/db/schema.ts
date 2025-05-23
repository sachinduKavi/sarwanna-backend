import { relations } from "drizzle-orm";
import { mysqlTable, varchar, boolean, decimal, datetime, char, int } from "drizzle-orm/mysql-core";
import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/mysql-core";


// Admin table
export const admin = mysqlTable("admin", {
    adminId: varchar("admin_id", {length: 36}).primaryKey().default(sql`UUID()`),
    name: varchar("name", {length: 20}).notNull(),
    email: varchar("email", {length: 30}).notNull(),
    password: varchar("password", {length: 250}).notNull()
});


export const category = mysqlTable("category", {
    catId: varchar("cat_id", {length: 36}).primaryKey().default(sql`UUID()`),
    name: varchar("name", {length: 30}).notNull(),
})


// Product table
export const product = mysqlTable("product", {
    productId: varchar("product_id", { length: 36 }).primaryKey().default(sql`UUID()`),
    name: varchar("name", {length: 128}).notNull(),
    stock: boolean("stock").default(true).notNull(),
    catId: varchar("cat_id", {length: 36}).notNull().references(() => category.catId),
    topItem: boolean("top_item").default(false).notNull(),
    description: varchar("description", {length: 10000}),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
    unitMeasure: varchar("unit_measure", { length: 16 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const productRelation = relations(product, ({one}) => ({
    category: one(category, {
        fields: [product.catId],
        references: [category.catId]
    })
}));


// Product Images table
export const productImages = mysqlTable("product_images", {
    imageId: varchar("image_id", {length:36}).primaryKey().default(sql`UUID()`),
    productId: varchar("product_id", {length: 36}).notNull().references(() => product.productId),
    url: varchar("url", {length: 500}).notNull(),
    sortNo: int("sort_no").notNull().default(0)
})


// Product List 
export const productList = mysqlTable("product_list", {
    orderId: varchar("order_id", {length: 36}).notNull().references(() => order.orderId),
    productId: varchar("product_id", {length: 36}).notNull().references(() => product.productId),
    qty:int("qty").notNull().default(0),
    currentPrice:decimal("unit_price", { precision: 10, scale: 2 }).notNull()
})


// Inquiry table
export const customer = mysqlTable("customer", {
    customerId: varchar("customer_id", {length: 36}).primaryKey().default(sql`UUID()`),
    name: varchar("name", {length: 50}),
    mobileNumber: char("mobile_number", {length: 15}),
    email: varchar("email", {length: 30}),
    address: varchar("address", {length: 100})
})


// Order table
export const order = mysqlTable("order", {
    orderId: varchar("order_id", {length: 36}).primaryKey().default(sql`UUID()`),
    datetime: datetime("datetime").notNull(),
    note: varchar("note", {length: 1024}),
    status: boolean("status").default(true).notNull(),
    customerId: varchar("customer_id", {length: 36}).notNull().references(() => customer.customerId),
})