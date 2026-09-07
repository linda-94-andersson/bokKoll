import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('bokkoll.db');

export default db;