import * as SQLite from "expo-sqlite";
import type { Book, NewBook, BookStatus } from "../types/Book";

const db = SQLite.openDatabaseSync("bokkoll.db");

export function initializeDatabase(): void {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      isbn TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      author TEXT,
      coverUrl TEXT,
      description TEXT,
      publishedYear INTEGER,
      status TEXT DEFAULT 'owned',
      isRead INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Database initialized");
}

export function addBook(book: NewBook): void {
  db.runSync(
    `INSERT INTO books (
      isbn,
      title,
      author,
      coverUrl,
      description,
      publishedYear,
      status,
      isRead
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      book.isbn,
      book.title,
      book.author,
      book.coverUrl,
      book.description,
      book.publishedYear,
      book.status,
      book.isRead ? 1 : 0,
    ],
  );
}

export function getBooks(): Book[] {
  const rows = db.getAllSync<{
    id: number;
    isbn: string;
    title: string;
    author: string | null;
    coverUrl: string | null;
    description: string | null;
    publishedYear: number | null;
    status: string;
    isRead: number;
    createdAt: string;
  }>("SELECT * FROM books ORDER BY id DESC");

  return rows.map(
    (row): Book => ({
      id: row.id,
      isbn: row.isbn,
      title: row.title,
      author: row.author,
      coverUrl: row.coverUrl,
      description: row.description,
      publishedYear: row.publishedYear,
      status: row.status as BookStatus,
      isRead: row.isRead === 1,
      createdAt: row.createdAt,
    }),
  );
}

export function getBookByISBN(isbn: string): Book | null {
  const row = db.getFirstSync<{
    id: number;
    isbn: string;
    title: string;
    author: string | null;
    coverUrl: string | null;
    description: string | null;
    publishedYear: number | null;
    status: string;
    isRead: number;
    createdAt: string;
  }>("SELECT * FROM books WHERE isbn = ?", [isbn]);

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    isbn: row.isbn,
    title: row.title,
    author: row.author,
    coverUrl: row.coverUrl,
    description: row.description,
    publishedYear: row.publishedYear,
    status: row.status as BookStatus,
    isRead: row.isRead === 1,
    createdAt: row.createdAt,
  };
}

export function deleteBook(id: number): void {
  db.runSync("DELETE FROM books WHERE id = ?", [id]);
}

export default db;
