/*
  Warnings:

  - The values [ALL] on the enum `Issue_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Issue` MODIFY `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED', 'null') NOT NULL DEFAULT 'OPEN';
