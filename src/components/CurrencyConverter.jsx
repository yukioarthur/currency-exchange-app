import messages from '../i18n/pt-BR.json';
import styles from './CurrencyConverter.module.css';
import shared from './Shared.module.css';

// Exemplo local: dados compartilhados serão estudados nas próximas etapas.
const example = { amount: 100, base: 'EUR', quote: 'BRL', rate: 6.2 };

export default function CurrencyConverter() {
  return (
    <section className={shared.card} aria-labelledby="converter-title">
      <h2 id="converter-title">{messages['converter.title']}</h2>
      <div className={shared.fields}>
        <label>Valor<input type="number" value={example.amount} readOnly /></label>
        <label>De<select disabled defaultValue="EUR"><option value="EUR">EUR — Euro</option></select></label>
        <label>Para<select disabled defaultValue="BRL"><option value="BRL">BRL — Real brasileiro</option></select></label>
      </div>
      <div className={shared.actions}><button disabled>Converter</button><button disabled>Inverter moedas</button></div>
      <div className={styles.result}>
        <span>{example.amount} {example.base} =</span>
        <strong>R$ {(example.amount * example.rate).toFixed(2).replace('.', ',')}</strong>
        <span>1 EUR = 6,2000 BRL · Cotação ilustrativa de 22/10/2026</span>
      </div>
      <p className={shared.muted}>{messages['converter.preview']}</p>
    </section>
  );
}
