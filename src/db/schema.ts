import { relations } from "drizzle-orm";
import { mysqlTable, varchar, boolean, decimal } from "drizzle-orm/mysql-core";
import { randomUUID } from "crypto";


export const product = mysqlTable("product", {
    productId: varchar("product_id", { length: 36 }).primaryKey().default(randomUUID()),
    name: varchar("name", {length: 128}).notNull(),
    stock: boolean("stock").default(true).notNull(),
    description: varchar("description", {length: 1024}),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
    unitMeasure: varchar("unit_measure", { length: 16 }).notNull(),
    createdAt: varchar("created_at", { length: 36 }).default(randomUUID()).notNull(),
    updatedAt: varchar("updated_at", { length: 36 }).default(randomUUID()).notNull(),
})