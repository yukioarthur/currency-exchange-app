import { useState } from 'react';
import { currencies, periods } from './data/demo.js';
import { demoHistory, demoRate, periodStarts } from './data/interactiveDemo.js';
import ptBR from './i18n/pt-BR.json';
import enUS from './i18n/en-US.json';
import AppHeader from './components/AppHeader.jsx';
import CurrencyConverter from './components/CurrencyConverter.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import MarketIndicators from './components/MarketIndicators.jsx';
import HistoryExplorer from './components/HistoryExplorer.jsx';
import styles from './App.module.css';
import shared from './components/Shared.module.css';

export default function App() {
  const [locale, setLocale] = useState('pt-BR');
  const [theme, setTheme] = useState('light');
  // Estado elevado ao ancestral comum do gráfico e da tabela.
  const [analysis, setAnalysis] = useState({ base: 'EUR', quote: 'BRL', period: '7d', indexed: false });
  const messages = locale === 'pt-BR' ? ptBR : enUS;
  const ui = {
    t: (key, params = {}) => Object.entries(params).reduce((text, [name, value]) => text.replaceAll('{' + name + '}', value), messages[key] ?? key),
    number: (value, digits = 4) => new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value),
    money: (value, currency) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value),
    date: (value) => new Intl.DateTimeFormat(locale, { timeZone: 'UTC' }).format(new Date(value + 'T00:00:00Z')),
  };
  const rows = demoHistory.filter(([date]) => date >= periodStarts[analysis.period]).map(([date, factor]) => ({
    date, rate: demoRate(analysis.base, factor) / demoRate(analysis.quote, factor),
  }));
  function changeAnalysis(field, value) {
    setAnalysis((previous) => {
      const next = { ...previous, [field]: value };
      // Ao selecionar a moeda oposta, inverter o par evita base e destino iguais.
      if (field === 'base' && value === previous.quote) next.quote = previous.base;
      if (field === 'quote' && value === previous.base) next.base = previous.quote;
      return next;
    });
  }
  function changeLocale(value) {
    setLocale(value);
    document.documentElement.lang = value;
  }
  return (
    <div className="appShell" data-theme={theme} lang={locale}>
      <main className={styles.page}>
        <AppHeader ui={ui} locale={locale} theme={theme} onLocaleChange={changeLocale} onThemeChange={setTheme} />
        <p className={styles.notice}>{ui.t('app.stage')} · {ui.t('app.demoLive')}</p>
        <CurrencyConverter currencies={currencies} ui={ui} />
        <HistoryPanel currencies={currencies} periods={periods} rows={rows} analysis={analysis} onChange={changeAnalysis} ui={ui} />
        <MarketIndicators ui={ui} />
        <HistoryExplorer rows={rows} base={analysis.base} quote={analysis.quote} ui={ui} />
        <footer className={shared.muted}>{ui.t('app.stage')} · React + Vite</footer>
      </main>
    </div>
  );
}
