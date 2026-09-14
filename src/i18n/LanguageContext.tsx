import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translations, type Language } from "./translations";

const LANGUAGE_STORAGE_KEY = "@bokkoll/language";

type TranslationTree = (typeof translations)[Language];

type LanguageContextValue = {
  readonly language: Language;
  readonly setLanguage: (language: Language) => void;
  readonly t: TranslationTree;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

type LanguageProviderProps = {
  readonly children: ReactNode;
};

function languageReducer(
  _currentLanguage: Language,
  newLanguage: Language,
): Language {
  return newLanguage;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useReducer(languageReducer, "sv");

  useEffect(() => {
    const loadLanguage = async (): Promise<void> => {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (savedLanguage === "sv" || savedLanguage === "en") {
        setLanguageState(savedLanguage);
      }
    };

    void loadLanguage();
  }, []);

  const setLanguage = useCallback((newLanguage: Language): void => {
    setLanguageState(newLanguage);

    void AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
  }, []);

  const contextValue = useMemo(
    (): LanguageContextValue => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
