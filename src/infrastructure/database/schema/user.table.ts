import { pgTable, uuid, varchar, uniqueIndex, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    firstName: varchar('first_name', { length: 200 }).notNull(),
    lastName: varchar('last_name', { length: 200 }).notNull(),
    email: varchar('email', { length: 200 }).notNull(),
    password: varchar('password', { length: 200 }).notNull(),
    role: varchar('role', { length: 20 }).notNull(),
    createdOnUtc: timestamp('created_on_utc', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('users_email_unique').on(table.email)],
);
