export type BookStatus = "owned" | "wishlist";

export type Book = {
  readonly id: number;
  readonly isbn: string;
  readonly title: string;
  readonly author: string | null;
  readonly coverUrl: string | null;
  readonly description: string | null;
  readonly publishedYear: number | null;
  readonly status: BookStatus;
  readonly isRead: boolean;
  readonly createdAt: string;
};

export type NewBook = {
  readonly isbn: string;
  readonly title: string;
  readonly author: string | null;
  readonly coverUrl: string | null;
  readonly description: string | null;
  readonly publishedYear: number | null;
  readonly status: BookStatus;
  readonly isRead: boolean;
};