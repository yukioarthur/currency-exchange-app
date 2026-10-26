export default function CurrencySelect({ label, currencies, selected, onChange, ui }) {
  return (
    <label>{label}
      <select value={selected} onChange={(event) => onChange(event.target.value)}>
        {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code} — {ui.t('currency.' + currency.code)}</option>)}
      </select>
    </label>
  );
}
