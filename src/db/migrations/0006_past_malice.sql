ALTER TABLE `admin` MODIFY COLUMN `admin_id` varchar(36) NOT NULL DEFAULT '324860e7-a63a-4855-9e47-7a440f02d97f';--> statement-breakpoint
ALTER TABLE `category` MODIFY COLUMN `cat_id` varchar(36) NOT NULL DEFAULT UUID();--> statement-breakpoint
ALTER TABLE `customer` MODIFY COLUMN `customer_id` varchar(36) NOT NULL DEFAULT '591d9af4-26ce-49e4-a62f-4d239eb69c76';--> statement-breakpoint
ALTER TABLE `order` MODIFY COLUMN `order_id` varchar(36) NOT NULL DEFAULT '869e6b8b-feb7-442c-a3f5-d6816146ea19';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `product_id` varchar(36) NOT NULL DEFAULT '96d5a6a7-8ed0-4a74-9446-660d4295133a';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `created_at` varchar(36) NOT NULL DEFAULT '7f0025ae-f6e2-47b6-8629-393dd75711f7';--> statement-breakpoint
ALTER TABLE `product` MODIFY COLUMN `updated_at` varchar(36) NOT NULL DEFAULT '2d1d7614-548e-4b12-9dd4-dcc249df6056';--> statement-breakpoint
ALTER TABLE `product_images` MODIFY COLUMN `image_id` varchar(36) NOT NULL DEFAULT '1888de1d-3ec6-4314-95e8-f61446225691';