require("dotenv").config();

module.exports = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ["./src/core/data/database/entities/**/*"],
  migrations: ["./src/core/data/database/migrations/**/*"],
  cli: {
    entitiesDir: "./src/core/data/database/entities",
    migrationsDir: "./src/core/data/database/migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
