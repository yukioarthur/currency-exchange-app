import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import styles from './HistoryChart.module.css';

export default function HistoryChart({ rows, base, quote, indexed, ui }) {
  if (!rows.length) return <p>{ui.t('chart.noData')}</p>;
  const data = rows.map(row => ({ ...row, time: Date.parse(row.date), value: indexed ? (row.rate / rows[0].rate - 1) * 100 : row.rate }));
  const unit = indexed ? '%' : ui.t('chart.unit', { base, quote });
  const date = time => ui.date(new Date(time).toISOString().slice(0, 10));
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={320} minWidth={0}>
        <LineChart data={data} accessibilityLayer margin={{ top: 15, right: 25, bottom: 15, left: 10 }}>
          <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" />
          <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} tickFormatter={date} tick={{ fill: 'var(--muted)', fontSize: 12 }} minTickGap={45} />
          <YAxis domain={['auto', 'auto']} width={75} tickFormatter={value => ui.number(value, 3)} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
          <Tooltip labelFormatter={date} formatter={value => [ui.number(value, 6), unit]} contentStyle={{ background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--line)' }} />
          <Line type="linear" dataKey="value" name={unit} stroke="var(--accent)" strokeWidth={2} dot={rows.length <= 30} activeDot={{ r: 6 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
      <p>{ui.t('chart.help')}</p>
    </div>
  );
}
