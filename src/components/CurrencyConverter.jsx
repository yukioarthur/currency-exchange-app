import { parseAmount, convertAmount } from '../utils/currency.js';
import { useState } from 'react';
import { demoRate, demoDate } from '../data/interactiveDemo.js';
import CurrencySelect from './CurrencySelect.jsx';
import styles from './CurrencyConverter.module.css';
import shared from './Shared.module.css';

export default function CurrencyConverter({ currencies, ui }) {
  const [amount, setAmount] = useState('100');
  const [pair, setPair] = useState({ base: 'EUR', quote: 'BRL' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  function editAmount(value) { setAmount(value); setResult(null); setError(''); }
  function editPair(field, value) { setPair((previous) => ({ ...previous, [field]: value })); setResult(null); setError(''); }
  function swap() { setPair((previous) => ({ base: previous.quote, quote: previous.base })); setResult(null); setError(''); }
  function convert(event) {
    event.preventDefault();
    setResult(null);
    let parsedAmount;
    try { parsedAmount = parseAmount(amount); } catch (error) { setError(error.message); return; }
    if (pair.base === pair.quote) { setError('validation.currencies'); return; }
    const rate = demoRate(pair.base) / demoRate(pair.quote);
    const converted = Number(amount) * rate;
    if (!Number.isFinite(converted)) { setError('validation.result'); return; }
    setError('');
    setResult({ amount: parsedAmount, ...pair, rate, converted });
  }
  return (
    <section className={shared.card} aria-labelledby="converter-title">
      <h2 id="converter-title">{ui.t('converter.title')}</h2>
      <form onSubmit={convert} noValidate>
        <div className={shared.fields}>
          <label>{ui.t('converter.amount')}<input type="number" min="0" step="any" value={amount} onChange={(event) => editAmount(event.target.value)} aria-invalid={error === 'validation.amount'} aria-describedby={error ? 'conversion-error' : undefined} /></label>
          <CurrencySelect label={ui.t('converter.from')} currencies={currencies} selected={pair.base} onChange={(value) => editPair('base', value)} ui={ui} />
          <CurrencySelect label={ui.t('converter.to')} currencies={currencies} selected={pair.quote} onChange={(value) => editPair('quote', value)} ui={ui} />
        </div>
        <div className={shared.actions}><button type="submit">{ui.t('converter.convert')}</button><button type="button" onClick={swap}>{ui.t('converter.swap')}</button></div>
      </form>
      {error && <p id="conversion-error" role="alert">{ui.t(error)}</p>}
      <div className={styles.result} aria-live="polite">
        {result ? <><span>{ui.number(result.amount, 2)} {result.base} =</span><strong>{ui.money(result.converted, result.quote)}</strong><span>1 {result.base} = {ui.number(result.rate)} {result.quote} · {ui.t('converter.date')}: {ui.date(demoDate)}</span></> : <span>{ui.t('converter.prompt')}</span>}
      </div>
      <p className={shared.muted}>{ui.t('converter.demo')}</p>
    </section>
  );
}
