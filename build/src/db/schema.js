"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = exports.customer = exports.productList = exports.productImages = exports.productRelation = exports.product = exports.category = exports.admin = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_2 = require("drizzle-orm");
const mysql_core_2 = require("drizzle-orm/mysql-core");
// Admin table
exports.admin = (0, mysql_core_1.mysqlTable)("admin", {
    adminId: (0, mysql_core_1.varchar)("admin_id", { length: 36 }).primaryKey().default((0, drizzle_orm_2.sql) `UUID()`),
    name: (0, mysql_core_1.varchar)("name", { length: 20 }).notNull(),
    email: (0, mysql_core_1.varchar)("email", { length: 30 }).notNull(),
    password: (0, mysql_core_1.varchar)("password", { length: 250 }).notNull()
});
exports.category = (0, mysql_core_1.mysqlTable)("category", {
    catId: (0, mysql_core_1.varchar)("cat_id", { length: 36 }).primaryKey().default((0, drizzle_orm_2.sql) `UUID()`),
    name: (0, mysql_core_1.varchar)("name", { length: 30 }).notNull(),
});
// Product table
exports.product = (0, mysql_core_1.mysqlTable)("product", {
    productId: (0, mysql_core_1.varchar)("product_id", { length: 36 }).primaryKey().default((0, drizzle_orm_2.sql) `UUID()`),
    name: (0, mysql_core_1.varchar)("name", { length: 128 }).notNull(),
    stock: (0, mysql_core_1.boolean)("stock").default(true).notNull(),
    catId: (0, mysql_core_1.varchar)("cat_id", { length: 36 }).notNull().references(() => exports.category.catId),
    topItem: (0, mysql_core_1.boolean)("top_item").default(false).notNull(),
    description: (0, mysql_core_1.varchar)("description", { length: 10000 }),
    unitPrice: (0, mysql_core_1.decimal)("unit_price", { precision: 10, scale: 2 }).notNull(),
    unitMeasure: (0, mysql_core_1.varchar)("unit_measure", { length: 16 }).notNull(),
    createdAt: (0, mysql_core_2.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_2.timestamp)("updated_at").defaultNow().notNull(),
});
exports.productRelation = (0, drizzle_orm_1.relations)(exports.product, ({ one }) => ({
    category: one(exports.category, {
        fields: [exports.product.catId],
        references: [exports.category.catId]
    })
}));
// Product Images table
exports.productImages = (0, mysql_core_1.mysqlTable)("product_images", {
    imageId: (0, mysql_core_1.varchar)("image_id", { length: 36 }).primaryKey().default((0, drizzle_orm_2.sql) `UUID()`),
    productId: (0, mysql_core_1.varchar)("product_id", { length: 36 }).notNull().references(() => exports.product.productId),
    url: (0, mysql_core_1.varchar)("url", { length: 500 }).notNull(),
    sortNo: (0, mysql_core_1.int)("sort_no").notNull().default(0)
});
// Product List 
exports.productList = (0, mysql_core_1.mysqlTable)("product_list", {
    orderId: (0, mysql_core_1.varchar)("order_id", { length: 36 }).notNull().references(() => exports.order.orderId),
    productId: (0, mysql_core_1.varchar)("product_id", { length: 36 }).notNull().references(() => exports.product.productId),
    qty: (0, mysql_core_1.int)("qty").notNull().default(0),
    currentPrice: (0, mysql_core_1.decimal)("unit_price", { precision: 10, scale: 2 }).notNull()
});
// Inquiry table
exports.customer = (0, mysql_core_1.mysqlTable)("customer", {
    customerId: (0, mysql_core_1.varchar)("customer_id", { length: 36 }).primaryKey().default((0, drizzle_orm_2.sql) `UUID()`),
    name: (0, mysql_core_1.varchar)("name", { length: 50 }),
    mobileNumber: (0, mysql_core_1.char)("mobile_number", { length: 15 }),
    email: (0, mysql_core_1.varchar)("email", { length: 30 }),
    address: (0, mysql_core_1.varchar)("address", { length: 100 })
});
// Order table
exports.order = (0, mysql_core_1.mysqlTable)("order", {
    orderId: (0, mysql_core_1.varchar)("order_id", { length: 36 }).primaryKey().default((0, drizzle_orm_2.sql) `UUID()`),
    datetime: (0, mysql_core_1.datetime)("datetime").notNull(),
    note: (0, mysql_core_1.varchar)("note", { length: 1024 }),
    status: (0, mysql_core_1.boolean)("status").default(true).notNull(),
    customerId: (0, mysql_core_1.varchar)("customer_id", { length: 36 }).notNull().references(() => exports.customer.customerId),
});
