import messages from '../i18n/pt-BR.json';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.brand}>CURRENCY EXCHANGE</p>
        <h1>{messages['app.title']}</h1>
        <p>{messages['app.subtitle']}</p>
      </div>
      <div className={styles.preferences}>
        <label>Idioma<select disabled defaultValue="pt-BR"><option value="pt-BR">Português</option><option value="en-US">English</option></select></label>
        <label>Tema<select disabled defaultValue="light"><option value="light">Claro</option><option value="dark">Escuro</option></select></label>
      </div>
    </header>
  );
}
