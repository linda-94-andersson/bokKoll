import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../../i18n/LanguageContext";

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

  return "An unexpected error occurred.";
}

function ErrorPage({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const { t } = useLanguage();

  console.log("Error:", error);
  console.log("Error message:", getErrorMessage(error));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>!</Text>
        </View>

        <Text style={styles.title}>{t.error.title}</Text>

        <Text style={styles.message}>{t.error.message}</Text>

        <Pressable
          style={styles.button}
          onPress={resetErrorBoundary}
          accessibilityRole="button"
          accessibilityLabel={t.error.tryAgain}
        >
          <Text style={styles.buttonText}>{t.error.tryAgain}</Text>
        </Pressable>

        {__DEV__ && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugTitle}>{t.error.technicalDetails}</Text>

            <Text style={styles.debugText}>{getErrorMessage(error)}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

type ErrorBoundaryProps = {
  readonly children: React.ReactNode;
};

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 14,
    padding: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 2,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2E5E5",
    marginBottom: 18,
  },

  icon: {
    fontSize: 26,
    fontWeight: "700",
    color: "#9B3D3D",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#171717",
    textAlign: "center",
    marginBottom: 10,
  },

  message: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    width: "100%",
    height: 46,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  debugContainer: {
    width: "100%",
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  debugTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
    marginBottom: 6,
  },

  debugText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#999",
  },
});
