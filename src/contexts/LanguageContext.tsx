import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const availableLanguages: Language[] = ["English", "Spanish", "Portuguese", "French", "Arabic", "Hindi"];

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageState | null>(null);
const STORAGE_KEY = "stadiumflow.language";

function getInitialLanguage(): Language {
  try {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) as Language : null;
    if (stored && availableLanguages.includes(stored)) {
      return stored;
    }
  } catch {
    // ignore
  }
  return "English";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    if (user?.language) {
      setLanguageState(user.language);
    }
  }, [user]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
