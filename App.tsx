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

            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>⌕</Text>

              <TextInput
                style={styles.searchInput}
                placeholder="Sök titel, författare eller ISBN"
                placeholderTextColor="#999"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />

              {searchTerm.length > 0 && (
                <Pressable
                  style={styles.clearButton}
                  onPress={() => setSearchTerm("")}
                  accessibilityRole="button"
                  accessibilityLabel="Rensa sökning"
                >
                  <Text style={styles.clearButtonText}>×</Text>
                </Pressable>
              )}
            </View>

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
                isSearching={searchTerm.trim().length > 0}
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

  searchContainer: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginTop: 20,
    marginBottom: 16,
  },

  searchIcon: {
    fontSize: 23,
    color: "#777",
    marginRight: 9,
    marginTop: -2,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: "#222",
    paddingVertical: 0,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#171717",
    letterSpacing: -0.5,
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

  clearButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  clearButtonText: {
    fontSize: 24,
    lineHeight: 26,
    color: "#888",
  },
});
