import styles from './HistoryChart.module.css';

// SVG de demonstração; a biblioteca de gráficos será introduzida na etapa 12.
export default function HistoryChart({ rows, base, quote, indexed, ui }) {
  if (rows.length === 0) return <p>{ui.t('chart.noData')}</p>;

  const displayed = rows.map((row) => ({ ...row, rate: indexed ? (row.rate / rows[0].rate - 1) * 100 : row.rate }));
  const rates = displayed.map((row) => row.rate);
  const minimum = Math.min(...rates);
  const maximum = Math.max(...rates);
  const range = maximum - minimum;
  const firstDay = Date.parse(rows[0].date);
  const duration = Date.parse(rows[rows.length - 1].date) - firstDay;
  const points = displayed.map((row) => ({
    ...row,
    x: duration ? 60 + ((Date.parse(row.date) - firstDay) / duration) * 700 : 410,
    y: range ? 200 - ((row.rate - minimum) / range) * 170 : 115,
  }));
  const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
  const ticks = range ? [maximum, (minimum + maximum) / 2, minimum] : [minimum];

  return (
    <svg className={styles.chart} viewBox="0 0 800 250" role="img" aria-labelledby="chart-description">
      <title id="chart-description">{ui.t('chart.title')} {base}/{quote} · {ui.t('chart.observations', { count: rows.length })} · {indexed ? ui.t('chart.percent') : ui.t('chart.nominal')}</title>
      <path className={styles.grid} d="M60 30H760 M60 115H760 M60 200H760" />
      {ticks.map((rate, index) => (
        <text key={index} x="0" y={range ? 35 + index * 85 : 120}>{ui.number(rate, 2)}</text>
      ))}
      <path className={styles.area} d={`${line} L${points[points.length - 1].x} 200 L${points[0].x} 200 Z`} />
      <path className={styles.series} d={line} />
      {points.map((point) => <circle key={point.date} className={styles.point} cx={point.x} cy={point.y} r="5" />)}
      <text x="60" y="235">{ui.date(rows[0].date)}</text>
      <text x="760" y="235" textAnchor="end">{ui.date(rows[rows.length - 1].date)}</text>
    </svg>
  );
}
