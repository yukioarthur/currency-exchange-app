import styles from './AppHeader.module.css';
export default function AppHeader({ ui, locale, theme, onLocaleChange, onThemeChange }) {
  return (
    <header className={styles.header}>
      <div><p className={styles.brand}>CURRENCY EXCHANGE</p><h1>{ui.t('app.title')}</h1><p>{ui.t('app.subtitle')}</p></div>
      <div className={styles.preferences}>
        <label>{ui.t('settings.language')}<select value={locale} onChange={(event) => onLocaleChange(event.target.value)}><option value="pt-BR">Português</option><option value="en-US">English</option></select></label>
        <label>{ui.t('settings.theme')}<select value={theme} onChange={(event) => onThemeChange(event.target.value)}><option value="light">{ui.t('settings.light')}</option><option value="dark">{ui.t('settings.dark')}</option></select></label>
        <small>{ui.t('settings.session')}</small>
      </div>
    </header>
  );
}
