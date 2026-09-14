import { Pressable, StyleSheet, Text, View } from "react-native";
import BookCover from "../BookCover/BookCover";
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
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Tillbaka</Text>
      </Pressable>

      <View style={styles.coverContainer}>
        <BookCover coverUrl={book.coverUrl} size="large" />
      </View>

      <View style={styles.header}>
        <View style={styles.statusBadge}>
          <View
            style={[
              styles.statusDot,
              book.isRead ? styles.statusDotRead : styles.statusDotUnread,
            ]}
          />

          <Text style={styles.statusText}>
            {book.isRead ? "Läst" : "Oläst"}
          </Text>
        </View>

        <Text style={styles.title}>{book.title}</Text>

        <Text style={styles.author}>{book.author ?? "Okänd författare"}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ISBN</Text>
          <Text style={styles.infoValue}>{book.isbn}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={styles.infoValue}>
            {book.status === "owned" ? "Äger" : "Önskelista"}
          </Text>
        </View>

        {book.publishedYear !== null && (
          <>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Utgiven</Text>

              <Text style={styles.infoValue}>{book.publishedYear}</Text>
            </View>
          </>
        )}
      </View>

      {book.description !== null && (
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Om boken</Text>

          <Text style={styles.description}>{book.description}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => onToggleRead(book)}
        >
          <Text style={styles.primaryButtonText}>
            {book.isRead ? "Markera som oläst" : "Markera som läst"}
          </Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={() => onDelete(book)}>
          <Text style={styles.deleteButtonText}>Ta bort bok</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingRight: 10,
    marginBottom: 24,
  },

  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },

  header: {
    marginBottom: 28,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#F3F3F3",
    marginBottom: 14,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 7,
  },

  statusDotRead: {
    backgroundColor: "#4A9B68",
  },

  statusDotUnread: {
    backgroundColor: "#B0B0B0",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 8,
  },

  author: {
    fontSize: 17,
    color: "#666",
  },

  infoCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 28,
  },

  infoRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },

  infoLabel: {
    fontSize: 14,
    color: "#777",
  },

  infoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },

  descriptionSection: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#555",
  },

  actions: {
    gap: 10,
  },

  primaryButton: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  deleteButton: {
    height: 46,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7EAEA",
  },

  deleteButtonText: {
    color: "#9B3D3D",
    fontSize: 15,
    fontWeight: "600",
  },

  coverContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
});
