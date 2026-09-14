import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  deleteBook,
  getBooks,
  updateBookReadStatus,
} from "../../database/database";
import BookCover from "../BookCover/BookCover";
import type { Book } from "../../types/Book";

type BookListProps = {
  readonly books: Book[];
  readonly setBooks: Dispatch<SetStateAction<Book[]>>;
  readonly onSelectBook: (book: Book) => void;
  readonly isSearching: boolean;
};

export default function BookList({
  books,
  setBooks,
  onSelectBook,
  isSearching,
}: BookListProps) {
  const [expandedBookId, setExpandedBookId] = useState<number | null>(null);

  const handleToggleRead = (book: Book): void => {
    updateBookReadStatus(book.id, !book.isRead);
    setBooks(getBooks());
  };

  const handleDelete = (book: Book): void => {
    deleteBook(book.id);
    setBooks(getBooks());
  };

  if (books.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>
          {isSearching ? "Inga träffar" : "Inga böcker ännu"}
        </Text>

        <Text style={styles.emptyText}>
          {isSearching
            ? "Prova att söka efter en annan titel, författare eller ISBN."
            : "Tryck på + för att lägga till din första bok."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {books.map((book) => {
        const isExpanded = expandedBookId === book.id;

        return (
          <View key={book.id} style={styles.card}>
            <Pressable
              style={styles.cardContent}
              onPress={() => onSelectBook(book)}
            >
              <BookCover coverUrl={book.coverUrl} size="small" />
              <View style={styles.bookInfo}>
                <Text style={styles.title} numberOfLines={2}>
                  {book.title}
                </Text>

                <Text style={styles.author}>
                  {book.author ?? "Okänd författare"}
                </Text>

                <Text style={styles.isbn}>ISBN {book.isbn}</Text>
              </View>

              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    book.isRead ? styles.statusDotRead : styles.statusDotUnread,
                  ]}
                />

                <Text style={styles.statusText}>
                  {book.isRead ? "Läst" : "Oläst"}
                </Text>
              </View>
            </Pressable>

            <View style={styles.actions}>
              <Pressable
                style={styles.actionButton}
                onPress={() => handleToggleRead(book)}
              >
                <Text style={styles.actionText}>
                  {book.isRead ? "Markera oläst" : "Markera läst"}
                </Text>
              </Pressable>

              <Pressable
                style={styles.actionButton}
                onPress={() => setExpandedBookId(isExpanded ? null : book.id)}
              >
                <Text style={styles.actionText}>
                  {isExpanded ? "Mindre" : "Mer"}
                </Text>
              </Pressable>

              {isExpanded && (
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(book)}
                >
                  <Text style={styles.deleteText}>Ta bort</Text>
                </Pressable>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    gap: 12,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 14,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 2,
  },

  cardContent: {
    flexDirection: "row",
    padding: 16,
  },

  bookInfo: {
    flex: 1,
    paddingLeft: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 5,
  },

  author: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
  },

  isbn: {
    fontSize: 13,
    color: "#888",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 7,
  },

  statusDotRead: {
    backgroundColor: "#4A9B68",
  },

  statusDotUnread: {
    backgroundColor: "#B0B0B0",
  },

  statusText: {
    fontSize: 13,
    color: "#666",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FAFAFA",
  },

  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
    backgroundColor: "#EFEFEF",
  },

  actionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },

  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 8,
    backgroundColor: "#F2E5E5",
  },

  deleteText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9B3D3D",
  },

  emptyState: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
});
