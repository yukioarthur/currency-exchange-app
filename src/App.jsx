import { currencies, conversion, periods, history } from './data/demo.js';
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
      <p className={styles.notice}>Etapa 05 · Props e listas com map · Todos os valores são fictícios. Os controles serão ativados nas próximas etapas.</p>
      <CurrencyConverter currencies={currencies} conversion={conversion} />
      <HistoryPanel currencies={currencies} periods={periods} rows={history} base={conversion.base} quote={conversion.quote} />
      <MarketIndicators />
      <HistoryExplorer rows={history} base={conversion.base} quote={conversion.quote} />
      <footer className={shared.muted}>Projeto de aprendizagem · React + Vite · Etapa 05</footer>
    </main>
  );
}
