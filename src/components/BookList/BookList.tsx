import { StyleSheet, Text, View } from "react-native";

import type { Book } from "../../types/Book";

type BookListProps = {
  readonly books: Book[];
};

export default function BookList({ books }: BookListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mina böcker</Text>

      {books.map((book) => (
        <View key={book.id} style={styles.book}>
          <Text style={styles.title}>{book.title}</Text>

          <Text>{book.author ?? "Okänd författare"}</Text>

          <Text>ISBN: {book.isbn}</Text>

          <Text>Status: {book.status}</Text>
        </View>
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
  },
});
