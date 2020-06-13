# Migration `20200613113150`

This migration has been generated at 6/13/2020, 11:31:50 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."EventDetails" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"duration" Decimal(65,30)  NOT NULL ,"id" text  NOT NULL ,"price" integer  NOT NULL ,"spaces" integer  NOT NULL ,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Event" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"eventDetailsId" text  NOT NULL ,"id" text  NOT NULL ,"rule" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."EventException" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"date" timestamp(3)  NOT NULL ,"eventDetailsId" text  NOT NULL ,"eventId" text   ,"id" text  NOT NULL ,"originalDate" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."EventCancellation" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"eventId" text   ,"id" text  NOT NULL ,"originalDate" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("eventDetailsId")REFERENCES "public"."EventDetails"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."EventException" ADD FOREIGN KEY ("eventDetailsId")REFERENCES "public"."EventDetails"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."EventException" ADD FOREIGN KEY ("eventId")REFERENCES "public"."Event"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."EventCancellation" ADD FOREIGN KEY ("eventId")REFERENCES "public"."Event"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200613113150
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,50 @@
+datasource postgresql {
+  url      = env("DATABASE_URL")
+  provider = "postgresql"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+// Events
+model EventDetails {
+  id             String           @default(uuid()) @id
+  createdAt      DateTime         @default(now())
+  title          String
+  description    String
+  price          Int
+  spaces         Int
+  duration       Float
+  Event          Event[]
+  EventException EventException[]
+}
+
+model Event {
+  id             String              @default(uuid()) @id
+  createdAt      DateTime            @default(now())
+  rule           String
+  exceptions     EventException[]
+  cancellations  EventCancellation[]
+  eventDetails   EventDetails        @relation(fields: [eventDetailsId], references: [id])
+  eventDetailsId String
+}
+
+model EventException {
+  id             String       @default(uuid()) @id
+  createdAt      DateTime     @default(now())
+  originalDate   DateTime
+  date           DateTime
+  eventDetails   EventDetails @relation(fields: [eventDetailsId], references: [id])
+  eventDetailsId String
+  event          Event?       @relation(fields: [eventId], references: [id])
+  eventId        String?
+}
+
+model EventCancellation {
+  id           String   @default(uuid()) @id
+  createdAt    DateTime @default(now())
+  originalDate DateTime
+  Event        Event?   @relation(fields: [eventId], references: [id])
+  eventId      String?
+}
```


