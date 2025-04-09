/*
  Warnings:

  - The values [LOW,MEDIUM,HIGH] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS,COMPLETED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('Low', 'Medium', 'High');
ALTER TABLE "Task" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Progress', 'Completed');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;
