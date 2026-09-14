import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getBookByISBN, getBooks, updateBook } from "../../database/database";
import { isValidISBN, normalizeISBN } from "../../utils/isbn";
import type { Book } from "../../types/Book";

type EditBookProps = {
  readonly book: Book;
  readonly setBooks: Dispatch<SetStateAction<Book[]>>;
  readonly onClose: () => void;
  readonly onSaved: (book: Book) => void;
};

export default function EditBook({
  book,
  setBooks,
  onClose,
  onSaved,
}: EditBookProps) {
  const [title, setTitle] = useState<string>(book.title);
  const [author, setAuthor] = useState<string>(book.author ?? "");
  const [isbn, setIsbn] = useState<string>(book.isbn);
  const [message, setMessage] = useState<string>("");

  const onSave = (): void => {
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

    if (existingBook !== null && existingBook.id !== book.id) {
      setMessage("En annan bok med det här ISBN-numret finns redan.");
      return;
    }

    if (cleanISBN !== book.isbn) {
      Alert.alert(
        "Ändra ISBN?",
        "ISBN används för att identifiera boken i ditt bibliotek. Är du säker på att du vill ändra ISBN-numret?",
        [
          {
            text: "Avbryt",
            style: "cancel",
          },
          {
            text: "Ändra ISBN",
            onPress: () => saveBook(cleanTitle, cleanISBN),
          },
        ],
      );

      return;
    }

    saveBook(cleanTitle, cleanISBN);
  };

  const saveBook = (cleanTitle: string, cleanISBN: string): void => {
    const updatedBook: Book = {
      ...book,
      title: cleanTitle,
      author: author.trim() || null,
      isbn: cleanISBN,
    };

    updateBook(book.id, {
      isbn: updatedBook.isbn,
      title: updatedBook.title,
      author: updatedBook.author,
      coverUrl: updatedBook.coverUrl,
      description: updatedBook.description,
      publishedYear: updatedBook.publishedYear,
      status: updatedBook.status,
      isRead: updatedBook.isRead,
    });

    const updatedBooks = getBooks();

    setBooks(updatedBooks);

    const savedBook = updatedBooks.find((item) => item.id === book.id);

    if (savedBook !== undefined) {
      onSaved(savedBook);
    }

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
              <Text style={styles.heading}>Redigera bok</Text>

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
              placeholder="Titel"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              autoCapitalize="sentences"
            />

            <Text style={styles.label}>Författare</Text>

            <TextInput
              style={styles.input}
              placeholder="Författare"
              placeholderTextColor="#999"
              value={author}
              onChangeText={setAuthor}
              autoCapitalize="words"
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

            <Pressable style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveButtonText}>Spara ändringar</Text>
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

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
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
    color: "#9B3D3D",
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
});
