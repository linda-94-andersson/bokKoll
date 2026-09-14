import type { Dispatch, SetStateAction } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import {
  deleteBook,
  getBooks,
  updateBookReadStatus,
} from "../../database/database";
import type { Book } from "../../types/Book";

type BookListProps = {
  readonly books: Book[];
  readonly setBooks: Dispatch<SetStateAction<Book[]>>;
  readonly onSelectBook: (book: Book) => void;
};

export default function BookList({
  books,
  setBooks,
  onSelectBook,
}: BookListProps) {
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
      <View style={styles.container}>
        <Text style={styles.heading}>Mina böcker</Text>
        <Text>Du har inga böcker ännu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {books.map((book) => (
        <Pressable
          key={book.id}
          style={styles.book}
          onPress={() => onSelectBook(book)}
        >
          <Pressable onPress={() => onSelectBook(book)}>
            <Text style={styles.title}>{book.title}</Text>
          </Pressable>
          <Text>{book.author ?? "Okänd författare"}</Text>

          <Text>ISBN: {book.isbn}</Text>

          <Text>Status: {book.status}</Text>

          <Text style={styles.readStatus}>
            {book.isRead ? "✓ Lästa" : "○ Oläst"}
          </Text>

          <Button
            title={book.isRead ? "Markera som oläst" : "Markera som läst"}
            onPress={() => handleToggleRead(book)}
          />

          <Button title="Ta bort" onPress={() => handleDelete(book)} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },

  book: {
    width: "100%",
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  readStatus: {
    marginTop: 10,
    marginBottom: 10,
  },
});
