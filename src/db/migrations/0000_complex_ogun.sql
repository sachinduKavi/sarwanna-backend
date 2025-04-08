CREATE TABLE `product` (
	`product_id` varchar(36) NOT NULL DEFAULT 'eaea547d-909f-4559-8859-b0b3603512f9',
	`name` varchar(128) NOT NULL,
	`stock` boolean NOT NULL DEFAULT true,
	`description` varchar(1024),
	`unit_price` decimal(10,2) NOT NULL,
	`unit_measure` varchar(16) NOT NULL,
	`created_at` varchar(36) NOT NULL DEFAULT '84dc7404-a53c-43a7-a9ff-d780717f85c2',
	`updated_at` varchar(36) NOT NULL DEFAULT '5e31a258-b53b-4f21-870e-ee11b5903829',
	CONSTRAINT `product_product_id` PRIMARY KEY(`product_id`)
);
