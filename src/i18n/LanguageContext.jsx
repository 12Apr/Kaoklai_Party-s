import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, LANGUAGES } from './translations';

const STORAGE_KEY = 'kaoklai_lang';
const DEFAULT_LANG = 'th';

const LanguageContext = createContext(null);

function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES.includes(saved)) return saved;
  } catch {}

  try {
    const browser = (navigator.language || '').toLowerCase();
    if (browser.startsWith('th')) return 'th';
    if (browser.startsWith('zh')) return 'zh';
    if (browser.startsWith('en')) return 'en';
  } catch {}

  return DEFAULT_LANG;
}

function resolve(path, lang) {
  const node = path.split('.').reduce(
    (acc, part) => (acc && typeof acc === 'object' ? acc[part] : undefined),
    translations
  );

  if (node && typeof node === 'object') {
    return node[lang] ?? node[DEFAULT_LANG] ?? path;
  }
  if (typeof node === 'string') return node;
  return path;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (!LANGUAGES.includes(lang)) return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, []);

  const t = useCallback((path) => resolve(path, language), [language]);
  const pick = useCallback(
    (obj) => {
      if (!obj || typeof obj !== 'object') return obj;
      const val = obj[language];
      if (val) return val;
      return obj[DEFAULT_LANG] ?? '';
    },
    [language]
  );

  const value = { language, setLanguage, t, pick };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
}
