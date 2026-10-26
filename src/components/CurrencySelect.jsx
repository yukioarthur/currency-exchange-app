// As props são os dados recebidos do componente pai.
export default function CurrencySelect({ label, currencies, selected }) {
  return (
    <label>
      {label}
      <select value={selected} disabled>
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} — {currency.name}
          </option>
        ))}
      </select>
    </label>
  );
}
