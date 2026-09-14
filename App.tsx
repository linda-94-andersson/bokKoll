import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  deleteBook,
  getBooks,
  initializeDatabase,
  updateBookReadStatus,
} from "./src/database/database";
import ErrorBoundary from "./src/components/ErrorBoundary/ErrorBoundary";
import AddBook from "./src/components/AddBook/AddBook";
import BookList from "./src/components/BookList/BookList";
import BookDetails from "./src/components/BookDetails/BookDetails";
import type { Book } from "./src/types/Book";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddBookVisible, setIsAddBookVisible] = useState(false);

  useEffect(() => {
    initializeDatabase();

    const booksFromDatabase = getBooks();
    setBooks(booksFromDatabase);

    console.log("Books loaded:", booksFromDatabase);
  }, []);

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return true;
    }

    return (
      book.title.toLowerCase().includes(term) ||
      book.author?.toLowerCase().includes(term) ||
      book.isbn.includes(term)
    );
  });

  const handleToggleRead = (book: Book): void => {
    updateBookReadStatus(book.id, !book.isRead);
    const updatedBooks = getBooks();

    setBooks(updatedBooks);

    const updatedBook = updatedBooks.find((item) => item.id === book.id);

    setSelectedBook(updatedBook ?? null);
  };

  const handleDelete = (book: Book): void => {
    deleteBook(book.id);
    setBooks(getBooks());
    setSelectedBook(null);
  };

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.safeArea}>
        <>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Text style={styles.heading}>Mina böcker</Text>

              <Pressable
                style={styles.addButton}
                onPress={() => {
                  setIsAddBookVisible(true);
                }}
              >
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            </View>

            <StatusBar style="auto" />

            <TextInput
              style={styles.searchInput}
              placeholder="Sök titel, författare eller ISBN"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />

            {selectedBook !== null ? (
              <BookDetails
                book={selectedBook}
                onBack={() => setSelectedBook(null)}
                onDelete={handleDelete}
                onToggleRead={handleToggleRead}
              />
            ) : (
              <BookList
                books={filteredBooks}
                setBooks={setBooks}
                onSelectBook={setSelectedBook}
              />
            )}
          </ScrollView>

          {isAddBookVisible && (
            <AddBook
              setBooks={setBooks}
              onClose={() => setIsAddBookVisible(false)}
            />
          )}
        </>
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  searchInput: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 32,
  },
  safeArea: {
    flex: 1,
  },
});
