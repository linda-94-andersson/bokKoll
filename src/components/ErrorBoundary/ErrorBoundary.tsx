import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { View, Text, Image, StyleSheet, Button } from "react-native";

type ErrorFallbackProps = {
  readonly error: unknown;
  readonly resetErrorBoundary: () => void;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Ett oväntat fel inträffade.";
}

function ErrorPage({ error, resetErrorBoundary }: ErrorFallbackProps) {
  console.log("Error:", error);
  console.log("Error message:", getErrorMessage(error));

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Oops! Seems like something went a bit potato..
        </Text>

        <Image
          source={{
            uri: "https://i.ibb.co/7bTnLj0/Error.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          But it is not your potato fault it is our...
        </Text>

        <Image
          source={{
            uri: "https://i.ibb.co/s1Qbt5T/Error-orange-face.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Button title="Försök igen" onPress={resetErrorBoundary} />

      {__DEV__ && (
        <Text style={styles.debugText}>{getErrorMessage(error)}</Text>
      )}
    </View>
  );
}

export default function ErrorBoundary({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error, errorInfo) => {
        console.error("Unhandled error:", error);
        console.error("Error info:", errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cce3c8",
    paddingTop: 50,
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingRight: 40,
    paddingBottom: 10,
    paddingLeft: 40,
  },

  text: {
    textAlign: "center",
    fontSize: 16,
  },

  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },

  debugText: {
    margin: 20,
    fontSize: 12,
  },
});
