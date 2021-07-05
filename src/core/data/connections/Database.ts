import { Connection, createConnection } from "typeorm";

class Database {
  private static connection: Connection;

  public getConnection(): Connection {
    if (!Database.connection) {
      throw new Error("connection is not defined");
    }

    return Database.connection;
  }

  public async openConnection(): Promise<void> {
    if (!Database.connection) {
      try {
        Database.connection = await createConnection();
        console.log("📦 Database connected");
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export default new Database();
