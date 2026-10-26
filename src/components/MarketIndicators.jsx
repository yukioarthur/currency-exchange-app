import messages from '../i18n/pt-BR.json';
import styles from './MarketIndicators.module.css';
import shared from './Shared.module.css';

export default function MarketIndicators() {
  return (
    <section className={shared.card} aria-labelledby="market-title">
      <h2 id="market-title">{messages['market.title']}</h2>
      <div className={styles.indicators}>
        <article><h3>Ibovespa</h3><strong>128.000 pontos</strong><p className={shared.positive}>+0,80% no dia · Exemplo fictício</p><p className={shared.muted}>Provedor a validar</p><span className={styles.badge}>Integração pendente</span></article>
        <article><h3>Meta Selic</h3><strong>10,00% ao ano</strong><p>Taxa-alvo definida pelo Copom · Exemplo fictício</p><p className={shared.muted}>Fonte planejada: Banco Central · SGS 432</p><span className={styles.badge}>Integração pendente</span></article>
      </div>
      <p className={shared.muted}>{messages['market.selicNote']}</p>
    </section>
  );
}
