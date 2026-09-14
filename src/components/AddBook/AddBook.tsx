import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
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
    setMessage("");

    onClose();
  };

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          <Pressable
            style={styles.modal}
            onPress={(event) => event.stopPropagation()}
          >
            <View style={styles.header}>
              <Text style={styles.heading}>Lägg till bok</Text>

              <Pressable
                style={styles.closeButton}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Stäng"
              >
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.label}>Titel</Text>
            <TextInput
              style={styles.input}
              placeholder="T.ex. Harry Potter och de vises sten"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Författare</Text>
            <TextInput
              style={styles.input}
              placeholder="T.ex. J.K. Rowling"
              placeholderTextColor="#999"
              value={author}
              onChangeText={setAuthor}
            />

            <Text style={styles.label}>ISBN</Text>
            <TextInput
              style={styles.input}
              placeholder="978..."
              placeholderTextColor="#999"
              value={isbn}
              onChangeText={setIsbn}
              keyboardType="numeric"
            />

            {Boolean(message) && <Text style={styles.message}>{message}</Text>}

            <Pressable style={styles.saveButton} onPress={onAddBook}>
              <Text style={styles.saveButtonText}>Spara bok</Text>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
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

  keyboardContainer: {
    width: "100%",
    justifyContent: "center",
  },

  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  closeButtonText: {
    fontSize: 30,
    lineHeight: 32,
  },

  input: {
    height: 50,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
    fontSize: 16,
  },

  message: {
    marginBottom: 15,
  },

  saveButton: {
    height: 45,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
});
