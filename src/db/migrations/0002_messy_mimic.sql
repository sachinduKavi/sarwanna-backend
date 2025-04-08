CREATE TABLE `admin` (
	`admin_id` varchar(36) NOT NULL DEFAULT '8f1c3647-fc55-43a6-9c88-f88d07d75483',
	`name` varchar(20) NOT NULL,
	`email` varchar(30) NOT NULL,
	`password` varchar(30) NOT NULL,
	CONSTRAINT `admin_admin_id` PRIMARY KEY(`admin_id`)
);
--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `product_id` varchar(36) NOT NULL DEFAULT 'c9ce794a-9f58-49d1-a39b-0f1c42446a0f';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `created_at` varchar(36) NOT NULL DEFAULT '41368b2e-0709-45d0-94ee-4a87c47e95f3';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `updated_at` varchar(36) NOT NULL DEFAULT '3c6e99cc-98f9-45ad-a260-341d8c9b2967';