import * as SQLite from "expo-sqlite";

export interface SavedLink {
  id?: number;
  link: string;
  dateSaved: string;
  priority: string;
  favicon: string;
  title: string;
  description: string;
  image: string;
}

export interface WebsiteGroup { 
  title: string;
  favicon: string;
  count: number;
}


class Database {
  db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase("mydb.db");
    this.createTable();
  }

  createTable() {
    this.db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS saved_links (id INTEGER PRIMARY KEY AUTOINCREMENT, link TEXT, dateSaved DATE, priority TEXT, favicon TEXT, title TEXT, description TEXT, image TEXT);"
      );
    });
  }

  dropTable() {
    this.db.transaction((tx) => {
      tx.executeSql("DROP TABLE saved_links");
    });
  }

  saveLink(link: SavedLink): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO saved_links (link, dateSaved, priority, favicon, title, description, image) values (?, ?, ?, ?, ?, ?, ?)",
          [
            link.link,
            link.dateSaved,
            link.priority,
            link.favicon,
            link.title,
            link.description,
            link.image,
          ],
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
          `SELECT * FROM saved_links ORDER BY dateSaved DESC LIMIT ? OFFSET ? `,
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

  getLinkByLink(link: string): Promise<SavedLink | null> {
    return new Promise<SavedLink | null>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM saved_links WHERE link = ? LIMIT 1;`,
          [link],
          (_, result) => {
            if (result.rows.length > 0) {
              const savedLink: SavedLink = result.rows.item(0);
              resolve(savedLink);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            console.log("Error getting link by link:", error);
            reject(error);
            return false;
          }
        );
      });
    });
  }

  getAllDistinctTitlesAndFavicons(): Promise<WebsiteGroup[]> {
    return new Promise<WebsiteGroup[]>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          `SELECT title, favicon, COUNT(*) as count FROM saved_links GROUP BY title, favicon;`,
          [],
          (_, result) => {
            const distinctTitlesAndFavicons: WebsiteGroup[] = [];

            for (let i = 0; i < result.rows.length; i++) {
              distinctTitlesAndFavicons.push(result.rows.item(i));
            }

            resolve(distinctTitlesAndFavicons);
          },
          (_, error) => {
            console.log("Error getting distinct titles and favicons:", error);
            reject(error);
            return false;
          }
        );
      });
    });
  }

}

export default Database;
