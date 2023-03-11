import * as SQLite from "expo-sqlite";

export interface SavedLink {
  id?: number;
  link: string;
  dateSaved: string;
  priority: string;
}

class Database {
  db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase("mydb.db");

    this.db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS saved_links (id INTEGER PRIMARY KEY AUTOINCREMENT, link TEXT, dateSaved DATE, priority TEXT);"
      );
    });
  }

  saveLink(link: SavedLink): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO saved_links (link, dateSaved, priority) values (?, ?, ?)",
          [link.link, link.dateSaved, link.priority],
          (_, result) => {
            console.log("Inserted ID:", result.insertId);
            resolve(result.insertId as number);
          },
          (_, error) => {
            console.log("Error inserting link:", error);
            reject(error);
            return false;
          }
        );
      });
    });
  }

  getAllSavedLinks(limit: number, offset: number): Promise<SavedLink[]> {
    return new Promise<SavedLink[]>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM saved_links LIMIT ? OFFSET ?;`,
          [limit, offset],
          (_, result) => {
            const savedLinks: SavedLink[] = [];

            for (let i = 0; i < result.rows.length; i++) {
              savedLinks.push(result.rows.item(i));
            }

            resolve(savedLinks);
          },
          (_, error) => {
            console.log("Error getting saved links:", error);
            reject(error);
            return false;
          }
        );
      });
    });
  }

  deleteLink(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM saved_links WHERE id = ?;`,
          [id],
          (_, result) => {
            if (result.rowsAffected > 0) {
              console.log("Deleted link with ID:", id);
              resolve(true);
            } else {
              console.log("No link found with ID:", id);
              resolve(false);
            }
          },
          (_, error) => {
            console.log("Error deleting link:", error);
            reject(error);
            return false;
          }
        );
      });
    });
  }
}

export default Database;
