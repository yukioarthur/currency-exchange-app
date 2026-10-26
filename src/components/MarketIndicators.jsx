import styles from './MarketIndicators.module.css';
import shared from './Shared.module.css';
export default function MarketIndicators({ ui }) {
  return (
    <section className={shared.card} aria-labelledby="market-title">
      <h2 id="market-title">{ui.t('market.title')}</h2>
      <div className={styles.indicators}>
        <article><h3>{ui.t('market.ibov')}</h3><strong>{ui.number(128000, 0)} {ui.t('market.points')}</strong><p className={shared.positive}>+{ui.number(.8, 2)}% · {ui.t('market.change')}</p><p>{ui.t('common.sample')}</p><p className={shared.muted}>{ui.t('market.ibovSource')}</p><span className={styles.badge}>{ui.t('market.pending')}</span></article>
        <article><h3>{ui.t('market.selic')}</h3><strong>{ui.number(10, 2)}{ui.t('market.annual')}</strong><p>{ui.t('market.target')} · {ui.t('common.sample')}</p><p className={shared.muted}>{ui.t('market.bcb')}</p><span className={styles.badge}>{ui.t('market.pending')}</span></article>
      </div>
      <p className={shared.muted}>{ui.t('market.selicNote')}</p>
    </section>
  );
}
