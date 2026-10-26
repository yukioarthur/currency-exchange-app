import styles from './HistoryChart.module.css';

export default function HistoryChart() {
  return (
      <svg className={styles.chart} viewBox="0 0 800 250" role="img" aria-labelledby="chart-description">
        <title id="chart-description">Exemplo fictício: EUR/BRL sobe de 6,10 em 16/10/2026 para 6,20 em 22/10/2026. Os cinco valores estão na tabela abaixo.</title>
        <path className={styles.grid} d="M60 30H760 M60 115H760 M60 200H760" />
        <text x="0" y="35">6,20</text><text x="0" y="120">6,15</text><text x="0" y="205">6,10</text>
        <path className={styles.area} d="M60 200L410 132L527 64L643 47L760 30V200Z" />
        <path className={styles.series} d="M60 200L410 132L527 64L643 47L760 30" />
        <circle className={styles.point} cx="60" cy="200" r="5" /><circle className={styles.point} cx="410" cy="132" r="5" /><circle className={styles.point} cx="527" cy="64" r="5" /><circle className={styles.point} cx="643" cy="47" r="5" /><circle className={styles.point} cx="760" cy="30" r="5" />
        <text x="60" y="235">16/10</text><text x="410" y="235" textAnchor="middle">19/10</text><text x="760" y="235" textAnchor="end">22/10</text>
      </svg>
  );
}
