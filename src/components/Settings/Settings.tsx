import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../../i18n/LanguageContext";

type SettingsProps = {
  readonly onClose: () => void;
};

export default function Settings({ onClose }: SettingsProps) {
  const { language, setLanguage, t } = useLanguage();
  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.modal}
          onPress={(event) => event.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.heading}>{t.settings.title}</Text>

            <Pressable
              style={styles.closeButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={t.settings.close}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>{t.settings.language}</Text>

          <View style={styles.languageContainer}>
            <Pressable
              style={[
                styles.languageButton,
                language === "sv" && styles.selectedLanguageButton,
              ]}
              onPress={() => setLanguage("sv")}
            >
              <Text style={styles.flag}>🇸🇪</Text>

              <Text style={styles.languageText}>{t.settings.swedish}</Text>

              {language === "sv" && <View style={styles.selectedIndicator} />}
            </Pressable>

            <Pressable
              style={[
                styles.languageButton,
                language === "en" && styles.selectedLanguageButton,
              ]}
              onPress={() => setLanguage("en")}
            >
              <Text style={styles.flag}>🇬🇧</Text>

              <Text style={styles.languageText}>{t.settings.english}</Text>

              {language === "en" && <View style={styles.selectedIndicator} />}
            </Pressable>
          </View>
        </Pressable>
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

  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
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

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },

  languageContainer: {
    gap: 8,
  },

  languageButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
  },

  flag: {
    fontSize: 22,
    marginRight: 12,
  },

  languageText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },

  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },

  selectedLanguageButton: {
    backgroundColor: "#EFEFEF",
  },
});
