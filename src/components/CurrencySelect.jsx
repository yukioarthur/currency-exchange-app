export default function CurrencySelect({ label, currencies, selected, onChange, ui, disabled = false }) {
  return (
    <label>{label}
      <select disabled={disabled} value={selected} onChange={(event) => onChange(event.target.value)}>
        {currencies.map((currency) => <option key={currency.code} value={currency.code}>{currency.code} — {ui.currencyName(currency)}</option>)}
      </select>
    </label>
  );
}
