import * as SQLite from 'expo-sqlite';

// Native-only SQLite check used by StorageTest. The .native.ts extension keeps
// expo-sqlite out of the web bundle; web gets sqliteTest.ts instead.
export async function runSqliteTest(): Promise<boolean> {
  const db = await SQLite.openDatabaseAsync('test.db');
  await db.execAsync('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)');
  await db.runAsync('INSERT INTO test (value) VALUES (?)', ['Hello SQLite']);
  const result = await db.getFirstAsync('SELECT * FROM test ORDER BY id DESC LIMIT 1');
  return !!result;
}
