import CurrencySelect from './CurrencySelect.jsx';
import messages from '../i18n/pt-BR.json';
import styles from './CurrencyConverter.module.css';
import shared from './Shared.module.css';


export default function CurrencyConverter({ currencies, conversion }) {
  return (
    <section className={shared.card} aria-labelledby="converter-title">
      <h2 id="converter-title">{messages['converter.title']}</h2>
      <div className={shared.fields}>
        <label>Valor<input type="number" value={conversion.amount} readOnly /></label>
        <CurrencySelect label="De" currencies={currencies} selected={conversion.base} />
        <CurrencySelect label="Para" currencies={currencies} selected={conversion.quote} />
      </div>
      <div className={shared.actions}><button disabled>Converter</button><button disabled>Inverter moedas</button></div>
      <div className={styles.result}>
        <span>{conversion.amount} {conversion.base} =</span>
        <strong>{(conversion.amount * conversion.rate).toLocaleString('pt-BR', { style: 'currency', currency: conversion.quote })}</strong>
        <span>1 {conversion.base} = {conversion.rate.toFixed(4).replace('.', ',')} {conversion.quote} · Cotação ilustrativa de {conversion.date.split('-').reverse().join('/')}</span>
      </div>
      <p className={shared.muted}>{messages['converter.preview']}</p>
    </section>
  );
}
