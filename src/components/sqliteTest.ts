// Web version: SQLite isn't used on web (AsyncStorage is), so there's nothing to test.
export async function runSqliteTest(): Promise<boolean> {
  throw new Error('SQLite is not available on web');
}
