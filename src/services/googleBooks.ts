import type { NewBook } from "../types/Book";
import { normalizeISBN } from "../utils/isbn";

type GoogleBookIdentifier = {
  readonly type: string;
  readonly identifier: string;
};

type GoogleBookVolumeInfo = {
  readonly title?: string;
  readonly authors?: string[];
  readonly description?: string;
  readonly publishedDate?: string;
  readonly imageLinks?: {
    readonly thumbnail?: string;
    readonly small?: string;
    readonly medium?: string;
    readonly large?: string;
  };
  readonly industryIdentifiers?: GoogleBookIdentifier[];
};

type GoogleBookItem = {
  readonly volumeInfo?: GoogleBookVolumeInfo;
};

type GoogleBooksResponse = {
  readonly totalItems: number;
  readonly items?: GoogleBookItem[];
};

export async function fetchBookFromGoogle(
  isbn: string,
): Promise<NewBook | null> {
  const cleanISBN = normalizeISBN(isbn);

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanISBN}`,
  );

  if (response.status === 429) {
    throw new Error(
      "Google Books API har tillfälligt begränsat antalet förfrågningar.",
    );
  }

  if (!response.ok) {
    throw new Error(`Google Books API returnerade status ${response.status}.`);
  }

  const data = (await response.json()) as GoogleBooksResponse;

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const volumeInfo = data.items[0].volumeInfo;

  if (!volumeInfo?.title) {
    return null;
  }

  const publishedYear = volumeInfo.publishedDate
    ? Number.parseInt(volumeInfo.publishedDate.slice(0, 4), 10)
    : null;

  return {
    isbn: cleanISBN,
    title: volumeInfo.title,
    author: volumeInfo.authors?.join(", ") ?? null,
    coverUrl:
      volumeInfo.imageLinks?.thumbnail ?? volumeInfo.imageLinks?.small ?? null,
    description: volumeInfo.description ?? null,
    publishedYear: Number.isNaN(publishedYear) ? null : publishedYear,
    status: "owned",
    isRead: false,
  };
}
