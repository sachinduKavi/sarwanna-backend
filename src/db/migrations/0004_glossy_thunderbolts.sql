CREATE TABLE `product_list` (
	`order_id` varchar(36) NOT NULL,
	`product_id` varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `admin` MODIFY COLUMN `admin_id` varchar(36) NOT NULL DEFAULT '4b3116ef-cad4-4fd3-aef4-868a245260c4';--> statement-breakpoint
ALTER TABLE `customer` MODIFY COLUMN `customer_id` varchar(36) NOT NULL DEFAULT 'a39eafe1-32dc-4770-8bc2-7d3eb32e9661';--> statement-breakpoint
ALTER TABLE `order` MODIFY COLUMN `order_id` varchar(36) NOT NULL DEFAULT 'b31e9c9b-1320-4f13-85bd-422f705ad727';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `product_id` varchar(36) NOT NULL DEFAULT '538a1dc9-47db-47ab-803d-08950e08c2c4';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `created_at` varchar(36) NOT NULL DEFAULT '8e0ba630-750f-40f9-bcc7-5c0cbaa8301b';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `updated_at` varchar(36) NOT NULL DEFAULT 'c072ed15-03c9-49a1-9a37-0dd6175aa519';--> statement-breakpoint
ALTER TABLE `product_images` MODIFY COLUMN `image_id` varchar(36) NOT NULL DEFAULT '649f1fba-8dfe-4cd4-ab5f-3b77c550fa99';--> statement-breakpoint
ALTER TABLE `product_list` ADD CONSTRAINT `product_list_order_id_order_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_list` ADD CONSTRAINT `product_list_product_id_product_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE no action ON UPDATE no action;