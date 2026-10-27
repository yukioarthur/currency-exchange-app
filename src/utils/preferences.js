export function readPreference(key, allowed, fallback, storage) {
  try { const value = storage.getItem(key); return allowed.includes(value) ? value : fallback; }
  catch { return fallback; }
}
export function savePreference(key, value, storage) {
  try { storage.setItem(key, value); return true; } catch { return false; }
}
