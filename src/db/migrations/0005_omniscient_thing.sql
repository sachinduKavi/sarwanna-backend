CREATE TABLE `category` (
	`cat_id` varchar(36) NOT NULL DEFAULT '99757f02-99a8-4db0-9578-1849bc1b8899',
	`name` varchar(30) NOT NULL,
	CONSTRAINT `category_cat_id` PRIMARY KEY(`cat_id`)
);
--> statement-breakpoint
ALTER TABLE `admin` MODIFY COLUMN `admin_id` varchar(36) NOT NULL DEFAULT '125ab237-487c-4e72-b6d4-423648a9cef1';--> statement-breakpoint
ALTER TABLE `customer` MODIFY COLUMN `customer_id` varchar(36) NOT NULL DEFAULT 'dc0d0a92-a03d-4422-8e4f-68c9431e0ad8';--> statement-breakpoint
ALTER TABLE `order` MODIFY COLUMN `order_id` varchar(36) NOT NULL DEFAULT 'eec0ea6c-1431-4940-a1ba-2daa0832f3c7';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `product_id` varchar(36) NOT NULL DEFAULT '8ff7f054-5dfd-4644-a27f-c3862a954aa9';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `created_at` varchar(36) NOT NULL DEFAULT 'f61a3ffd-c9e7-4427-9a39-30d852651f21';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `updated_at` varchar(36) NOT NULL DEFAULT '38b97c2f-ee07-4469-860d-345ce3a13b46';--> statement-breakpoint
ALTER TABLE `product_images` MODIFY COLUMN `image_id` varchar(36) NOT NULL DEFAULT '2552d186-20b0-475d-ad94-46e0e39bc3d1';--> statement-breakpoint
ALTER TABLE `product` ADD `cat_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `product` ADD `top_item` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_cat_id_category_cat_id_fk` FOREIGN KEY (`cat_id`) REFERENCES `category`(`cat_id`) ON DELETE no action ON UPDATE no action;