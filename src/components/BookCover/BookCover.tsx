import { Image, StyleSheet, Text, View } from "react-native";

type BookCoverProps = {
  readonly coverUrl: string | null;
  readonly size: "small" | "large";
};

export default function BookCover({ coverUrl, size }: BookCoverProps) {
  const imageStyle = size === "small" ? styles.small : styles.large;

  if (coverUrl !== null) {
    return (
      <Image
        source={{ uri: coverUrl }}
        style={[styles.cover, imageStyle]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={[styles.cover, imageStyle, styles.placeholder]}>
      <Text style={styles.placeholderIcon}>📖</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    overflow: "hidden",
  },

  small: {
    width: 64,
    height: 92,
  },

  large: {
    width: 120,
    height: 175,
  },

  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderIcon: {
    fontSize: 28,
  },
});
