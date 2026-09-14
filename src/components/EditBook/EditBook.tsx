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
import { useLanguage } from "../../i18n/LanguageContext";

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
  const { t } = useLanguage();

  const onSave = (): void => {
    const cleanTitle = title.trim();
    const cleanISBN = normalizeISBN(isbn);

    if (!cleanTitle) {
      setMessage(t.editBook.titleRequired);
      return;
    }

    if (!cleanISBN) {
      setMessage(t.editBook.isbnRequired);
      return;
    }

    if (!isValidISBN(cleanISBN)) {
      setMessage(t.editBook.invalidIsbn);
      return;
    }

    const existingBook = getBookByISBN(cleanISBN);

    if (existingBook !== null && existingBook.id !== book.id) {
      setMessage(t.editBook.duplicateIsbn);
      return;
    }

    if (cleanISBN !== book.isbn) {
      Alert.alert(t.editBook.changeIsbnTitle, t.editBook.changeIsbnMessage, [
        {
          text: t.editBook.cancel,
          style: "cancel",
        },
        {
          text: t.editBook.changeIsbn,
          onPress: () => saveBook(cleanTitle, cleanISBN),
        },
      ]);

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
              <Text style={styles.heading}>{t.editBook.title}</Text>

              <Pressable
                style={styles.closeButton}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel={t.editBook.close}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.label}>{t.editBook.title}</Text>

            <TextInput
              style={styles.input}
              placeholder={t.editBook.bookTitle}
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              autoCapitalize="sentences"
            />

            <Text style={styles.label}>{t.editBook.author}</Text>

            <TextInput
              style={styles.input}
              placeholder={t.editBook.author}
              placeholderTextColor="#999"
              value={author}
              onChangeText={setAuthor}
              autoCapitalize="words"
            />

            <Text style={styles.label}>{t.editBook.isbn}</Text>

            <TextInput
              style={styles.input}
              placeholder={t.addBook.isbnPlaceholder}
              placeholderTextColor="#999"
              value={isbn}
              onChangeText={setIsbn}
              keyboardType="numeric"
            />

            {Boolean(message) && <Text style={styles.message}>{message}</Text>}

            <Pressable style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveButtonText}>{t.editBook.save}</Text>
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
