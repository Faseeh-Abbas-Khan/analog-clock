import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { DB_NAME } from '../../constant';
SQLite.enablePromise(true);

const DB = DB_NAME;

export interface TimeZone {
    id: string;
    zoneName: string;
    gmtOffset: number;
}

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return SQLite.openDatabase({ name: DB, location: 'default' });
};

export const createTables = async (db: SQLiteDatabase): Promise<void> => {
    const query = `
    CREATE TABLE IF NOT EXISTS TimeZones (
      zoneName TEXT PRIMARY KEY,
      gmtOffset INTEGER NOT NULL
    );
  `;

    const preferencesQuery = `
    CREATE TABLE IF NOT EXISTS UserPreferences (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `;
    await db.executeSql(query);
    await db.executeSql(preferencesQuery);
};

export const getTimeZonesFromDB = async (db: SQLiteDatabase): Promise<TimeZone[]> => {
    try {
        const timeZones: TimeZone[] = [];
        const results = await db.executeSql('SELECT * FROM TimeZones ORDER BY zoneName ASC');

        results.forEach((result: ResultSet) => {
            for (let index = 0; index < result.rows.length; index++) {
                timeZones.push(result.rows.item(index) as TimeZone);
            }
        });
        return timeZones;
    } catch (error) {
        console.error("Failed to load from DB:", error);
        throw error;
    }
};

export const saveTimeZonesToDB = async (db: SQLiteDatabase, timeZones: TimeZone[]): Promise<void> => {
    await db.executeSql('DELETE FROM TimeZones');

    const insertQuery = 'INSERT INTO TimeZones (zoneName, gmtOffset) VALUES (?, ?)';

    await db.transaction(tx => {
        timeZones.forEach(zone => {
            tx.executeSql(insertQuery, [zone.zoneName, zone.gmtOffset]);
        });
    });
};

export const saveUserSelectedZone = async (db: SQLiteDatabase, zone: TimeZone): Promise<void> => {
    const query = 'INSERT OR REPLACE INTO UserPreferences (key, value) VALUES (?, ?)';
    const stringifiedValue = JSON.stringify(zone);
    await db.executeSql(query, ['selectedZone', stringifiedValue]);
};

export const getUserSelectedZone = async (db: SQLiteDatabase): Promise<TimeZone | null> => {
    const query = 'SELECT value FROM UserPreferences WHERE key = ?';
    const results = await db.executeSql(query, ['selectedZone']);

    if (results[0].rows.length > 0) {
        const stringifiedValue = results[0].rows.item(0).value;
        try {
            return JSON.parse(stringifiedValue) as TimeZone;
        } catch (error) {
            console.error("Failed to parse saved time zone:", error);
            return null;
        }
    }
    return null;
};