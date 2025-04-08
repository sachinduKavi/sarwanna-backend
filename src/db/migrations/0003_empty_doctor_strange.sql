CREATE TABLE `customer` (
	`customer_id` varchar(36) NOT NULL DEFAULT '991baaf0-ba46-4b2f-90c4-f0c45746867b',
	`name` varchar(50),
	`mobile_number` char(15),
	`email` varchar(30),
	`address` varchar(100),
	CONSTRAINT `customer_customer_id` PRIMARY KEY(`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `order` (
	`order_id` varchar(36) NOT NULL DEFAULT 'e2d27ef7-2baa-4ba3-9352-1393ee235f13',
	`datetime` datetime NOT NULL,
	`note` varchar(1024),
	`status` boolean NOT NULL DEFAULT true,
	`customer_id` varchar(36) NOT NULL,
	CONSTRAINT `order_order_id` PRIMARY KEY(`order_id`)
);
--> statement-breakpoint
CREATE TABLE `product_images` (
	`image_id` varchar(36) NOT NULL DEFAULT 'f98e4d4e-da78-4425-ab4a-f200d8f785ac',
	`product_id` varchar(36) NOT NULL,
	`url` varchar(500) NOT NULL,
	`sort_no` int NOT NULL DEFAULT 0,
	CONSTRAINT `product_images_image_id` PRIMARY KEY(`image_id`)
);
--> statement-breakpoint
ALTER TABLE `admin` MODIFY COLUMN `admin_id` varchar(36) NOT NULL DEFAULT '3d4cb253-6c63-4668-978c-9e992b50970a';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `product_id` varchar(36) NOT NULL DEFAULT 'c1d0d377-09d1-4263-bdca-069710003e07';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `created_at` varchar(36) NOT NULL DEFAULT '8bea13ff-ae99-4320-9be5-b51062d27a10';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `updated_at` varchar(36) NOT NULL DEFAULT '5e6fe80a-d5c0-488b-9f99-f7ba623184ab';--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_customer_id_customer_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_product_id_product_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE no action ON UPDATE no action;