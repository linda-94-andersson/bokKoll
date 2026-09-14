import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  initializeDatabase,
  getBooks,
  getBookByISBN,
  deleteBook,
} from "./src/database/database";
import { fetchBookFromGoogle } from "./src/services/googleBooks";
import ErrorBoundary from "./src/components/ErrorBoundary/ErrorBoundary";
import Results from "./src/components/Results/Results";
import AddBook from "./src/components/AddBook/AddBook";
import BookList from "./src/components/BookList/BookList";

export default function App() {
  const [input, setInput] = useState<string>("");
  const [books, setBooks] = useState<ReturnType<typeof getBooks>>([]);

  useEffect(() => {
    initializeDatabase();

    const booksFromDatabase = getBooks();
    setBooks(booksFromDatabase);

    console.log("Books loaded:", booksFromDatabase);

    const book = getBookByISBN("9781234567890");

    console.log("Book found by ISBN:", book);

    console.log("deleteBook function:", deleteBook);

    const testGoogleBooks = async (): Promise<void> => {
      try {
        const book = await fetchBookFromGoogle("9780140328721");

        console.log("Google Books:", book);
      } catch (error: unknown) {
        console.error("Kunde inte hämta boken:", error);
      }
    };

    void testGoogleBooks();
  }, []);

  return (
    <ErrorBoundary>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Välkomstmeddelande här!</Text>

        <TextInput
          style={styles.input}
          onChangeText={setInput}
          value={input}
          placeholder="Sök efter bok eller författare..."
        />
        <StatusBar style="auto" />
        <Results input={input} />
        <AddBook setBooks={setBooks} />
        <BookList books={books} />
      </ScrollView>
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
  input: {
    marginTop: 25,
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 10,
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
  },
});
