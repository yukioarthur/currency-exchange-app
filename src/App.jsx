import AppHeader from './components/AppHeader.jsx';
import CurrencyConverter from './components/CurrencyConverter.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import MarketIndicators from './components/MarketIndicators.jsx';
import HistoryExplorer from './components/HistoryExplorer.jsx';
import styles from './App.module.css';
import shared from './components/Shared.module.css';

export default function App() {
  return (
    <main className={styles.page}>
      <AppHeader />
      <p className={styles.notice}>Etapa 04 · Interface organizada em componentes · Todos os valores são fictícios. Os controles serão ativados nas próximas etapas.</p>
      <CurrencyConverter />
      <HistoryPanel />
      <MarketIndicators />
      <HistoryExplorer />
      <footer className={shared.muted}>Projeto de aprendizagem · React + Vite · Etapa 04</footer>
    </main>
  );
}
