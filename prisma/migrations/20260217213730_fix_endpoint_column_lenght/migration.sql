-- DropIndex
DROP INDEX `push_subscription_endpoint_key` ON `push_subscription`;

-- AlterTable
ALTER TABLE `push_subscription` MODIFY `endpoint` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `push_subscription_endpoint_key` ON `push_subscription`(`endpoint`(512));
