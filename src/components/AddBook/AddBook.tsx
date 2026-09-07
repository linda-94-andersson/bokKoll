import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { addBook, getBookByISBN, getBooks } from "../../database/database";
import { normalizeISBN, isValidISBN } from "../../utils/isbn";
import type { Book, NewBook } from "../../types/Book";

type AddBookProps = {
  readonly setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

export default function AddBook({ setBooks }: AddBookProps) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onAddBook = (): void => {
    const cleanTitle = title.trim();
    const cleanISBN = normalizeISBN(isbn);

    if (!cleanTitle) {
      setMessage("Du måste ange en titel.");
      return;
    }

    if (!cleanISBN) {
      setMessage("Du måste ange ett ISBN.");
      return;
    }

    if (!isValidISBN(cleanISBN)) {
      setMessage("ISBN-numret är inte giltigt.");
      return;
    }

    const existingBook = getBookByISBN(cleanISBN);

    if (existingBook) {
      setMessage("Den här boken finns redan i ditt bibliotek.");
      return;
    }

    const newBook: NewBook = {
      isbn: cleanISBN,
      title: cleanTitle,
      author: author.trim() || null,
      coverUrl: null,
      description: null,
      publishedYear: null,
      status: "owned",
      isRead: false,
    };

    addBook(newBook);

    setBooks(getBooks());

    setTitle("");
    setAuthor("");
    setIsbn("");
    setMessage("Boken har sparats!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lägg till bok</Text>

      <TextInput
        style={styles.input}
        placeholder="Titel"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Författare"
        value={author}
        onChangeText={setAuthor}
      />

      <TextInput
        style={styles.input}
        placeholder="ISBN"
        value={isbn}
        onChangeText={setIsbn}
        keyboardType="numeric"
      />

      <Button title="Spara bok" onPress={onAddBook} />

      {Boolean(message) && <Text style={styles.message}>{message}</Text>}
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

  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  message: {
    marginTop: 15,
  },
});
