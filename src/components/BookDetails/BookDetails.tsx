import { Button, StyleSheet, Text, View } from "react-native";
import type { Book } from "../../types/Book";

type BookDetailsProps = {
  readonly book: Book;
  readonly onBack: () => void;
  readonly onDelete: (book: Book) => void;
  readonly onToggleRead: (book: Book) => void;
};

export default function BookDetails({
  book,
  onBack,
  onDelete,
  onToggleRead,
}: BookDetailsProps) {
  return (
    <View style={styles.container}>
      <Button title="← Tillbaka" onPress={onBack} />

      <Text style={styles.title}>{book.title}</Text>

      <Text style={styles.author}>{book.author ?? "Okänd författare"}</Text>

      <View style={styles.info}>
        <Text>ISBN: {book.isbn}</Text>

        <Text>Status: {book.status === "owned" ? "Äger" : "Önskelista"}</Text>

        <Text>{book.isRead ? "✓ Lästa" : "○ Oläst"}</Text>

        {book.publishedYear !== null && (
          <Text>Utgiven: {book.publishedYear}</Text>
        )}
      </View>

      {book.description !== null && (
        <Text style={styles.description}>{book.description}</Text>
      )}

      <Button
        title={book.isRead ? "Markera som oläst" : "Markera som läst"}
        onPress={() => onToggleRead(book)}
      />

      <Button title="Ta bort bok" onPress={() => onDelete(book)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 8,
  },

  author: {
    fontSize: 18,
    marginBottom: 20,
  },

  info: {
    gap: 8,
    marginBottom: 20,
  },

  description: {
    lineHeight: 22,
    marginBottom: 20,
  },
});
