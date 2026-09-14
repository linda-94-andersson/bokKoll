import { useState, Dispatch, SetStateAction } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { addBook, getBookByISBN, getBooks } from "../../database/database";
import { normalizeISBN, isValidISBN } from "../../utils/isbn";
import type { Book, NewBook } from "../../types/Book";

type AddBookProps = {
  readonly setBooks: Dispatch<SetStateAction<Book[]>>;
  readonly onClose: () => void;
};

export default function AddBook({ setBooks, onClose }: AddBookProps) {
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
    onClose();
  };

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.heading}>Lägg till bok</Text>

            <Button title="×" onPress={onClose} />
          </View>

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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },

  input: {
    height: 45,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  message: {
    marginTop: 15,
  },
});
