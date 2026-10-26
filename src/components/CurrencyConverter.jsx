import { parseAmount, convertAmount } from '../utils/currency.js';
import { useState } from 'react';
import { getRate } from '../services/frankfurter.js';
import CurrencySelect from './CurrencySelect.jsx';
import styles from './CurrencyConverter.module.css';
import shared from './Shared.module.css';

export default function CurrencyConverter({ currencies, ui }) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('100');
  const [pair, setPair] = useState({ base: 'EUR', quote: 'BRL' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  function editAmount(value) { setAmount(value); setResult(null); setError(''); }
  function editPair(field, value) { setPair((previous) => ({ ...previous, [field]: value })); setResult(null); setError(''); }
  function swap() { setPair((previous) => ({ base: previous.quote, quote: previous.base })); setResult(null); setError(''); }
  async function convert(event) {
    event.preventDefault();
    if (loading || !currencies.length) return;
    setResult(null);
    let parsedAmount;
    try { parsedAmount = parseAmount(amount); } catch (error) { setError(error.message); return; }
    if (pair.base === pair.quote) { setError('validation.currencies'); return; }
    setError(''); setLoading(true);
    try {
      const { rate, date } = await getRate(pair.base, pair.quote);
      const converted = convertAmount(parsedAmount, rate);
      setResult({ amount: parsedAmount, ...pair, rate, date, converted });
    } catch (error) { setError(error.message); }
    finally { setLoading(false); }

  }
  return (
    <section className={shared.card} aria-labelledby="converter-title">
      <h2 id="converter-title">{ui.t('converter.title')}</h2>
      <form onSubmit={convert} noValidate aria-busy={loading}>
        <fieldset disabled={loading || !currencies.length}>
        <div className={shared.fields}>
          <label>{ui.t('converter.amount')}<input type="number" min="0" step="any" value={amount} onChange={(event) => editAmount(event.target.value)} aria-invalid={error === 'validation.amount'} aria-describedby={error ? 'conversion-error' : undefined} /></label>
          <CurrencySelect label={ui.t('converter.from')} currencies={currencies} selected={pair.base} onChange={(value) => editPair('base', value)} ui={ui} />
          <CurrencySelect label={ui.t('converter.to')} currencies={currencies} selected={pair.quote} onChange={(value) => editPair('quote', value)} ui={ui} />
        </div>
        <div className={shared.actions}><button type="submit">{ui.t(loading ? 'status.loading' : 'converter.convert')}</button><button type="button" onClick={swap}>{ui.t('converter.swap')}</button></div>
      </fieldset>
      </form>
      {error && <p id="conversion-error" role="alert">{ui.t(error)}</p>}
      <div className={styles.result} aria-live="polite">
        {result ? <><span>{ui.number(result.amount, 2)} {result.base} =</span><strong>{ui.money(result.converted, result.quote)}</strong><span>1 {result.base} = {ui.number(result.rate)} {result.quote} · {ui.t('converter.date')}: {ui.date(result.date)}</span></> : <span>{ui.t('converter.prompt')}</span>}
      </div>
      <p className={shared.muted}>{ui.t('api.source')}</p>
    </section>
  );
}
