import { formatNumber, formatMoney, formatDate } from './utils/format.js';
import { useState } from 'react';
import { periods } from './data/demo.js';
import { useCurrencies } from './hooks/useCurrencies.js';
import { useHistory } from './hooks/useHistory.js';
import { usePreferences } from './hooks/usePreferences.js';
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
  const { currencies, status: currencyStatus, error: currencyError, retry: loadCurrencies } = useCurrencies();
  const { locale, setLocale, theme, setTheme, saved } = usePreferences();
  // Estado elevado ao ancestral comum do gráfico e da tabela.
  const [analysis, setAnalysis] = useState({ base: 'EUR', quote: 'BRL', period: '7d', indexed: false });
  const historyState = useHistory(analysis.base, analysis.quote, analysis.period, currencies.length > 0);
  const messages = locale === 'pt-BR' ? ptBR : enUS;
  const ui = {
    t: (key, params = {}) => Object.entries(params).reduce((text, [name, value]) => text.replaceAll('{' + name + '}', value), messages[key] ?? key),
    number: (value, digits = 4) => formatNumber(value, locale, digits),
    money: (value, currency) => formatMoney(value, currency, locale),
    currencyName: (currency) => {
      try { return messages['currency.' + currency.code] ?? new Intl.DisplayNames([locale], { type: 'currency' }).of(currency.code) ?? currency.name; } catch { return currency.name; }
    },
    date: (value) => formatDate(value, locale),
  };
  const rows = historyState.rows;
  function changeAnalysis(field, value) {
    setAnalysis((previous) => {
      const next = { ...previous, [field]: value };
      // Ao selecionar a moeda oposta, inverter o par evita base e destino iguais.
      if (field === 'base' && value === previous.quote) next.quote = previous.base;
      if (field === 'quote' && value === previous.base) next.base = previous.quote;
      return next;
    });
  }
  return (
    <div className="appShell" data-theme={theme} lang={locale}>
      <main className={styles.page}>
        <AppHeader ui={ui} locale={locale} theme={theme} onLocaleChange={setLocale} saved={saved} onThemeChange={setTheme} />
        <p className={styles.notice}>{ui.t('app.stage')} · {ui.t('app.live')}</p>
        <div className={shared.actions}>
          <button onClick={loadCurrencies} disabled={currencyStatus === 'loading'}>{ui.t(currencyStatus === 'loading' ? 'status.loading' : 'api.loadCurrencies')}</button>
          {currencyError && <p role="alert">{ui.t(currencyError)}</p>}
          {!currencies.length && <p>{ui.t('api.currenciesPrompt')}</p>}
        </div>
        <CurrencyConverter currencies={currencies} ui={ui} />
        <HistoryPanel currencies={currencies} periods={periods} rows={rows} analysis={analysis} onChange={changeAnalysis} onLoad={historyState.retry} requestState={historyState} ui={ui} />
        <MarketIndicators ui={ui} />
        <HistoryExplorer key={[analysis.base, analysis.quote, analysis.period].join("-")} rows={rows} base={analysis.base} quote={analysis.quote} status={historyState.status} ui={ui} />
        <footer className={shared.muted}>{ui.t('app.stage')} · React + Vite</footer>
      </main>
    </div>
  );
}
