import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("CarListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category").notNull(),
  condition: varchar("condition").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  driveType: varchar("driveType").notNull(),
  transmission: varchar("transmission").notNull(),
  fuelType: varchar("fuelType").notNull(),
  mileage: varchar("mileage").notNull(),
  color: varchar("color").notNull(),
  door: varchar("door").notNull(),
  engineSize: varchar("engineSize"),
  cylinder: varchar("cylinder"),
  vin: varchar("vin"),
  offerType: varchar("offerType"),
  listingDescription: varchar("listingDescription").notNull(),
  features: json("features"),
  createdBy: varchar("createdBy").notNull().default("kaanlatinlerhd@gmail.com"),
  userName: varchar("userName").notNull().default("Kaan Latinler"),
  userImageUrl: varchar("userImageUrl")
    .notNull()
    .default(
      "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
    ),
  postedOn: varchar("postedOn"),
});

export const CarImages = pgTable("CarImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  carListingId: integer("carListingId")
    .notNull()
    .references(() => CarListing.id),
});
