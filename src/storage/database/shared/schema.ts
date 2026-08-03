import { pgTable, serial, timestamp, varchar, integer, text, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export type GalleryCategory = 'hero' | 'core_values' | 'product' | 'app' | 'cert' | 'advantage';

export const galleryImages = pgTable(
  "gallery_images",
  {
    id: serial().primaryKey(),
    category: varchar("category", { length: 32 }).notNull(),
    file_key: varchar("file_key", { length: 512 }).notNull(),
    sort_order: integer("sort_order").notNull().default(0),
    title: varchar("title", { length: 255 }),
    product_tag: varchar("product_tag", { length: 32 }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("gallery_images_category_idx").on(table.category),
    index("gallery_images_sort_order_idx").on(table.sort_order),
    index("gallery_images_product_tag_idx").on(table.product_tag),
  ]
);

export type GalleryImage = typeof galleryImages.$inferSelect;
