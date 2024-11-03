import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://LetsSaleDB_owner:BDOLKaMp41Px@ep-holy-lake-a2r1rt6x.eu-central-1.aws.neon.tech/LetsSaleDB?sslmode=require",
  },
});
