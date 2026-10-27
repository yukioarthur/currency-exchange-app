import { useEffect, useState } from 'react';
import { readPreference, savePreference } from '../utils/preferences.js';
function storage() { try { return window.localStorage; } catch { return null; } }
export function usePreferences() {
  const [locale, setLocale] = useState(() => readPreference('currency-app.locale', ['pt-BR', 'en-US'], 'pt-BR', storage()));
  const [theme, setTheme] = useState(() => readPreference('currency-app.theme', ['light', 'dark'], 'light', storage()));
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    document.documentElement.lang = locale;
    const localeSaved = savePreference('currency-app.locale', locale, storage());
    const themeSaved = savePreference('currency-app.theme', theme, storage());
    setSaved(localeSaved && themeSaved);
  }, [locale, theme]);
  return { locale, setLocale, theme, setTheme, saved };
}
