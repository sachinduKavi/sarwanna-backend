ALTER TABLE `admin` MODIFY COLUMN `admin_id` varchar(36) NOT NULL DEFAULT UUID();--> statement-breakpoint
ALTER TABLE `customer` MODIFY COLUMN `customer_id` varchar(36) NOT NULL DEFAULT UUID();--> statement-breakpoint
ALTER TABLE `order` MODIFY COLUMN `order_id` varchar(36) NOT NULL DEFAULT UUID();--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `product_id` varchar(36) NOT NULL DEFAULT UUID();--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `product_images` MODIFY COLUMN `image_id` varchar(36) NOT NULL DEFAULT UUID();